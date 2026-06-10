import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { loggerEndpoint, createLogger } from "../utils/logger.js";
import { loginRoute } from "../router/login.route.js";
import { teamRoute } from "../router/team.route.js";
import { playerRoute } from "../router/player.route.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

export const StartServer = async (PORT: number) => {
  try {
    const logger = createLogger("Server");
    dotenv.config();
    const app = express();
    app.use(express.json());
    const corsOptions = {
      origin:"http://72.61.58.205",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
      credentials: true,
      preflightContinue: false,
      optionsSuccessStatus: 204,
    };

    app.use(cors(corsOptions));
    app.use(loggerEndpoint);
    const swaggerSpec = swaggerJsdoc({
      apis: [
        "./src/**/*.ts",
        "./dist/**/*.js"
      ],
      definition: {
        openapi: "3.0.0",
        info: {
          title: "TNV - Tech na Várzea",
          version: "1.0.0",
          description: ``,
          contact: {
            name: "Diego Melo - Desenvolvedor",
            url: "https://github.com/DiegoHenriqueMelo",
            email: "diegohenriquemelo14@gmail.com",
          },
          license: {
            name: "MIT",
            url: "https://opensource.org/licenses/MIT",
          },
        },
        components: {
          securitySchemes: {
            BearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
      },
    });

    app.use(
      "/docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerSpec, {
        customCss: ".swagger-ui .topbar { display: none }",
        customSiteTitle: "TNV - Documentação",
      }),
    );
    app.use(loginRoute);
    app.use(teamRoute);
    app.use(playerRoute);

    app.listen(PORT, () => {
      logger.info(`Servidor iniciado com sucesso`, {
        port: PORT,
        environment: process.env.NODE_ENV || "development",
        docsUrl: `http://localhost:${PORT}/docs`,
      });
    });
  } catch (e) {
    console.error("Erro ao iniciar servidor:", e);
    process.exit(1);
  }
};
