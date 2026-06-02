import { Request, Response, NextFunction } from "express";
import { createLogger } from "../utils/logger.js";
import JWT from "jsonwebtoken";
import { TipoUsuario } from "@prisma/client";

const logger = createLogger("JWT");

interface TokenPayload {
  idUser: string;
  roleUser: string;
  iat: number;
  exp: number;
}

export const createToken = async (
  role: string,
  id: number,
  ex: number,
): Promise<string> => {
  logger.debug(`Generating JWT token -- role: ${role}, expiresIn: ${ex}s`);
  const secret: string = String(process.env.JWT_SECRET);
  const token: string = JWT.sign({ idUser: id, roleUser: role }, secret, {
    expiresIn: ex,
  });
  logger.debug("JWT token generated successfully");
  return token;
};

export const tokenIsValid = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    logger.info("Validating incoming JWT token");

    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      logger.warn("Request rejected -- Authorization header is missing");
      res.status(401).json({ statusCode: 401, message: "Token não fornecido" });
      return;
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      logger.warn(
        "Request rejected -- Authorization header format is invalid (expected: Bearer <token>)",
      );
      res
        .status(401)
        .json({
          statusCode: 401,
          messageSistem: "Formato do token inválido. Use: Bearer <token>",
        });
      return;
    }

    const token = parts[1];
    const secret: string = String(process.env.JWT_SECRET);

    const decoded = (await JWT.verify(token, secret)) as TokenPayload;

    if (!decoded || !decoded.idUser) {
      logger.warn(
        "Request rejected -- JWT payload is invalid or missing required claims",
      );
      res
        .status(401)
        .json({
          statusCode: 401,
          messageSistem: "Não foi possivel decodificar",
        });
      return;
    }

    logger.info("JWT token validated successfully", { role: decoded.roleUser });
    (req as any).mmr = {
      email: decoded.idUser,
      role: decoded.roleUser,
      token: token,
    };

    next();
  } catch (error) {
    if (error instanceof JWT.TokenExpiredError) {
      logger.warn("Request rejected -- JWT token has expired");
      res
        .status(401)
        .json({
          statusCode: 401,
          messageSistem: "Token expirado. Faça login novamente",
          body: null,
        });
      return;
    }

    if (error instanceof JWT.JsonWebTokenError) {
      logger.warn("Request rejected -- JWT token signature is invalid");
      res
        .status(401)
        .json({ statusCode: 401, messageSistem: "Token inválido", body: null });
      return;
    }

    logger.error("Unexpected error during token validation", {
      error: String(error),
    });
    res
      .status(500)
      .json({
        statusCode: 500,
        messageSistem: "Erro interno na autenticação",
        body: null,
      });
  }
};

export const requireRole = (...roles: TipoUsuario[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const role = (req as any).mmr?.role as TipoUsuario;

    if (!role || !roles.includes(role)) {
      logger.warn("Request rejected -- insufficient role", { role, required: roles });
      res.status(403).json({ statusCode: 403, messageSistem: "Acesso negado" });
      return;
    }

    next();
  };
};
