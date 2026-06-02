import { Router, Request, Response } from "express";
import { loggerEndpoint } from "../utils/logger.js";
import * as LoginController from "../controller/login/loginController.js";

export const loginRoute: Router = Router();

/**
 * @openapi
 * /api/login:
 *   post:
 *     summary: Libera acesso ao sistema
 *     tags:
 *       - Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "example@email.com"
 *               password:
 *                 type: string
 *                 example: "sua_senha_segura"
 *     responses:
 *       200:
 *         description: Acesso liberado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 messageSistem:
 *                   type: "string"
 *                   example: "Login realizado com sucesso"
 *                 body:
 *                   type: object
 *       422:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
loginRoute.post(
  "/api/login",
  loggerEndpoint,
  async (req: Request, res: Response) => {
    const body = req.body;
    const result = await LoginController.login(body);
    res.status(result.statusCode);
    res.send({ messageSistem: result.messageSistem, body: result.body });
  },
);
/**
 * @openapi
 * /api/create/user:
 *   post:
 *     summary: cria um usuario no sistema
 *     tags:
 *       - Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "João da Silva"
 *               email:
 *                 type: string
 *                 example: "example@email.com"
 *               password:
 *                 type: string
 *                 example: "sua_senha_segura"
 *               tipoUsuario:
 *                 type: string
 *                 example: "ORGANIZADOR"
 *     responses:
 *       201:
 *         description: Usuario criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 messageSistem:
 *                   type: "string"
 *                   example: "Usuario criado com sucesso"
 *                 body:
 *                   type: object
 *       422:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
loginRoute.post(
  "/api/create/user",
  loggerEndpoint,
  async (req: Request, res: Response) => {
    const { nome, email, password, tipoUsuario: tipo } = req.body;
    const result = await LoginController.create({ nome, email, password, tipo });
    res.status(result.statusCode);
    res.send({ messageSistem: result.messageSistem, body: result.body });
  },
);
