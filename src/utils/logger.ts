import winston from "winston";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
dotenv.config();

type LogMeta = Record<string, unknown>;

export const createLogger = (context?: string) => {
  const logFormat = winston.format.printf(
    ({ timestamp, level, message, stack, ...meta }) => {
      const contextStr = context ? `[${context}]` : "";
      const metaStr = Object.keys(meta).length
        ? ` | ${JSON.stringify(meta)}`
        : "";
      const stackStr = stack ? `\n${stack}` : "";

      return `${timestamp} ${level.toUpperCase()} ${contextStr} ${message}${metaStr}${stackStr}`;
    },
  );
  const logLevel = process.env.LOG_LEVEL || (process.env.NODE_ENV === "production" ? "info" : "debug");
  const winstonInstance = winston.createLogger({
    level: logLevel,
    format: winston.format.combine(
      winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      winston.format.errors({ stack: true }),
      winston.format.colorize({ all: true }),
      logFormat,
    ),
    transports: [
      new winston.transports.Console({}),
      new winston.transports.File({
        filename: "logs/error.log",
        level: "error",
      }),
      new winston.transports.File({
        filename: "logs/combined.log",
      }),
    ],
  });
  return {
    info: (message: string, meta?: LogMeta) =>
      winstonInstance.info(message, meta),
    error: (message: string, meta?: LogMeta) =>
      winstonInstance.error(message, meta),
    warn: (message: string, meta?: LogMeta) =>
      winstonInstance.warn(message, meta),
    debug: (message: string, meta?: LogMeta) =>
      winstonInstance.debug(message, meta),
  };
};

const logger = createLogger("LoggerEndpoint")

export const loggerEndpoint = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const startTime = Date.now();
  logger.info(`→ ${req.method} ${req.originalUrl}`, {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get("user-agent"),
  });
  if (req.body && Object.keys(req.body).length > 0) {
    logger.debug("Request body", { body: req.body });
  }

  res.on("finish", () => {
    const duration = Date.now() - startTime;
    const statusCode = res.statusCode;

    if (statusCode >= 500) {
      logger.error(`← ${req.method} ${req.originalUrl} ${statusCode}`, {
        statusCode,
        duration: `${duration}ms`,
      });
    } else if (statusCode >= 400) {
      logger.warn(`← ${req.method} ${req.originalUrl} ${statusCode}`, {
        statusCode,
        duration: `${duration}ms`,
      });
    } else {
      logger.info(`← ${req.method} ${req.originalUrl} ${statusCode}`, {
        statusCode,
        duration: `${duration}ms`,
      });
    }
  });
  next();
};
