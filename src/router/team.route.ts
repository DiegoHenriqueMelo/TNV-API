import { Router, Request, Response } from "express";
import * as TeamController from "../controller/team/teamController.js";
import { tokenIsValid, requireRole } from "../middleware/auth.js";
import { TipoUsuario } from "@prisma/client";

export const teamRoute: Router = Router();

/**
 * @openapi
 * /api/team:
 *   post:
 *     summary: Cria um time no sistema
 *     tags:
 *       - Team
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *             type: object
 *             required:
 *               - nome
 *               - cidade
 *               - corPrimaria
 *               - corSecundaria
 *               - fundacao
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Fio de Rabiola"
 *               cidade:
 *                 type: string
 *                 example: "Franca"
 *               corPrimaria:
 *                 type: string
 *                 example: "#ffffff"
 *               corSecundaria:
 *                 type: string
 *                 example: "#000000"
 *               fundacao:
 *                 type: string
 *                 example: "2020-09-20"
 *     responses:
 *       201:
 *         description: Time criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 messageSistem:
 *                   type: string
 *                   example: "Time criado com sucesso"
 *                 body:
 *                   type: object
 *       401:
 *         description: Token inválido ou não fornecido
 *       403:
 *         description: Acesso negado - papel insuficiente
 *       500:
 *         description: Erro interno do servidor
 */
teamRoute.post(
  "/api/team",
  tokenIsValid,
  requireRole(TipoUsuario.CAPITAO),
  async (req: Request, res: Response) => {
    const { nome, cidade, corPrimaria, corSecundaria, fundacao } = req.body;
    const result = await TeamController.create({ nome, cidade, corPrimaria, corSecundaria, fundacao });
    res.status(result.statusCode);
    res.send({ messageSistem: result.messageSistem, body: result.body });
  },
);

/**
 * @openapi
 * /api/teams:
 *   get:
 *     summary: Lista todos os times cadastrados
 *     tags:
 *       - Team
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Times encontrados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 messageSistem:
 *                   type: string
 *                   example: "Times encontrados com sucesso"
 *                 body:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       nome:
 *                         type: string
 *                         example: "Fio de Rabiola"
 *                       sigla:
 *                         type: string
 *                         example: "FIO"
 *                       cidade:
 *                         type: string
 *                         example: "Franca"
 *                       corPrimaria:
 *                         type: string
 *                         example: "#ffffff"
 *                       corSecundaria:
 *                         type: string
 *                         example: "#000000"
 *                       fundacao:
 *                         type: string
 *                         format: date-time
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Token inválido ou não fornecido
 *       500:
 *         description: Erro interno do servidor
 */
teamRoute.get(
  "/api/teams",
  tokenIsValid,
  async (_req: Request, res: Response) => {
    const result = await TeamController.findAll();
    res.status(result.statusCode);
    res.send({ messageSistem: result.messageSistem, body: result.body });
  },
);

/**
 * @openapi
 * /api/team/{id}:
 *   get:
 *     summary: Busca um time pelo ID
 *     tags:
 *       - Team
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do time
 *         example: 1
 *     responses:
 *       200:
 *         description: Time encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 messageSistem:
 *                   type: string
 *                   example: "Time encontrado com sucesso"
 *                 body:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     nome:
 *                       type: string
 *                       example: "Fio de Rabiola"
 *                     sigla:
 *                       type: string
 *                       example: "FIO"
 *                     cidade:
 *                       type: string
 *                       example: "Franca"
 *                     corPrimaria:
 *                       type: string
 *                       example: "#ffffff"
 *                     corSecundaria:
 *                       type: string
 *                       example: "#000000"
 *                     fundacao:
 *                       type: string
 *                       format: date-time
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: Token inválido ou não fornecido
 *       404:
 *         description: Time não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
teamRoute.get(
  "/api/team/:id",
  tokenIsValid,
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const result = await TeamController.findById(id);
    res.status(result.statusCode);
    res.send({ messageSistem: result.messageSistem, body: result.body });
  },
);

/**
 * @openapi
 * /api/team/{id}:
 *   put:
 *     summary: Atualiza os dados de um time
 *     tags:
 *       - Team
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do time
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - cidade
 *               - corPrimaria
 *               - corSecundaria
 *               - fundacao
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Fio de Rabiola FC"
 *               cidade:
 *                 type: string
 *                 example: "Franca"
 *               corPrimaria:
 *                 type: string
 *                 example: "#ffffff"
 *               corSecundaria:
 *                 type: string
 *                 example: "#000000"
 *               fundacao:
 *                 type: string
 *                 example: "2020-09-20"
 *     responses:
 *       200:
 *         description: Time atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 messageSistem:
 *                   type: string
 *                   example: "Time atualizado com sucesso"
 *                 body:
 *                   type: object
 *       401:
 *         description: Token inválido ou não fornecido
 *       403:
 *         description: Acesso negado - papel insuficiente
 *       404:
 *         description: Time não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
teamRoute.put(
  "/api/team/:id",
  tokenIsValid,
  requireRole(TipoUsuario.CAPITAO, TipoUsuario.ADMINISTRADOR),
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { nome, cidade, corPrimaria, corSecundaria, fundacao } = req.body;
    const result = await TeamController.update(id, { nome, cidade, corPrimaria, corSecundaria, fundacao });
    res.status(result.statusCode);
    res.send({ messageSistem: result.messageSistem, body: result.body });
  },
);

/**
 * @openapi
 * /api/team/{id}:
 *   delete:
 *     summary: Remove um time do sistema
 *     tags:
 *       - Team
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do time
 *         example: 1
 *     responses:
 *       200:
 *         description: Time deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 messageSistem:
 *                   type: string
 *                   example: "Time deletado com sucesso"
 *                 body:
 *                   type: object
 *       401:
 *         description: Token inválido ou não fornecido
 *       403:
 *         description: Acesso negado - somente ADMINISTRADOR
 *       404:
 *         description: Time não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
teamRoute.delete(
  "/api/team/:id",
  tokenIsValid,
  requireRole(TipoUsuario.ADMINISTRADOR),
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const result = await TeamController.remove(id);
    res.status(result.statusCode);
    res.send({ messageSistem: result.messageSistem, body: result.body });
  },
);
