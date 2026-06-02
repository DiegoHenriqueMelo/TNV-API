import { Router, Request, Response } from "express";
import * as PlayerController from "../controller/player/playerController.js";
import { tokenIsValid, requireRole } from "../middleware/auth.js";
import { TipoUsuario } from "@prisma/client";

export const playerRoute: Router = Router();

/**
 * @openapi
 * /api/player:
 *   post:
 *     summary: Cadastra um jogador no sistema
 *     description: Cria um perfil de jogador vinculado a um usuário existente. Cada usuário pode ter apenas um jogador cadastrado. O campo `timeId` é opcional e permite já inserir o jogador em um time no cadastro.
 *     tags:
 *       - Player
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuarioId
 *             properties:
 *               usuarioId:
 *                 type: integer
 *                 description: ID do usuário ao qual o jogador pertence
 *                 example: 1
 *               nome:
 *                 type: string
 *                 nullable: true
 *                 example: "João da Silva"
 *               numero:
 *                 type: integer
 *                 nullable: true
 *                 example: 10
 *               posicao:
 *                 type: string
 *                 nullable: true
 *                 example: "Atacante"
 *               dataNasc:
 *                 type: string
 *                 nullable: true
 *                 example: "2000-03-15"
 *               timeId:
 *                 type: integer
 *                 nullable: true
 *                 description: ID do time ao qual o jogador será vinculado
 *                 example: 2
 *     responses:
 *       201:
 *         description: Jogador criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 messageSistem:
 *                   type: string
 *                   example: "Jogador criado com sucesso"
 *                 body:
 *                   type: object
 *       401:
 *         description: Token inválido ou não fornecido
 *       403:
 *         description: Acesso negado - papel insuficiente
 *       409:
 *         description: Usuário já possui um jogador cadastrado
 *       500:
 *         description: Erro interno do servidor
 */
playerRoute.post(
  "/api/player",
  tokenIsValid,
  requireRole(TipoUsuario.CAPITAO, TipoUsuario.ADMINISTRADOR),
  async (req: Request, res: Response) => {
    const { usuarioId, nome = null, numero = null, posicao = null, dataNasc = null, timeId = null } = req.body;
    const result = await PlayerController.create({ usuarioId, nome, numero, posicao, dataNasc, timeId });
    res.status(result.statusCode);
    res.send({ messageSistem: result.messageSistem, body: result.body });
  },
);

/**
 * @openapi
 * /api/players:
 *   get:
 *     summary: Lista todos os jogadores cadastrados
 *     description: Retorna todos os jogadores com informações do time e do usuário vinculado.
 *     tags:
 *       - Player
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Jogadores encontrados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 messageSistem:
 *                   type: string
 *                   example: "Jogadores encontrados com sucesso"
 *                 body:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       usuarioId:
 *                         type: integer
 *                         example: 1
 *                       nome:
 *                         type: string
 *                         example: "João da Silva"
 *                       numero:
 *                         type: integer
 *                         example: 10
 *                       posicao:
 *                         type: string
 *                         example: "Atacante"
 *                       dataNasc:
 *                         type: string
 *                         format: date-time
 *                       timeId:
 *                         type: integer
 *                         example: 2
 *                       time:
 *                         type: object
 *                         nullable: true
 *                       usuario:
 *                         type: object
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Token inválido ou não fornecido
 *       500:
 *         description: Erro interno do servidor
 */
playerRoute.get(
  "/api/players",
  tokenIsValid,
  async (_req: Request, res: Response) => {
    const result = await PlayerController.findAll();
    res.status(result.statusCode);
    res.send({ messageSistem: result.messageSistem, body: result.body });
  },
);

/**
 * @openapi
 * /api/player/{id}:
 *   get:
 *     summary: Busca um jogador pelo ID
 *     description: Retorna os dados do jogador com informações do time e do usuário vinculado.
 *     tags:
 *       - Player
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do jogador
 *         example: 1
 *     responses:
 *       200:
 *         description: Jogador encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 messageSistem:
 *                   type: string
 *                   example: "Jogador encontrado com sucesso"
 *                 body:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     usuarioId:
 *                       type: integer
 *                       example: 1
 *                     nome:
 *                       type: string
 *                       example: "João da Silva"
 *                     numero:
 *                       type: integer
 *                       example: 10
 *                     posicao:
 *                       type: string
 *                       example: "Atacante"
 *                     dataNasc:
 *                       type: string
 *                       format: date-time
 *                     timeId:
 *                       type: integer
 *                       example: 2
 *                     time:
 *                       type: object
 *                       nullable: true
 *                     usuario:
 *                       type: object
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: Token inválido ou não fornecido
 *       404:
 *         description: Jogador não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
playerRoute.get(
  "/api/player/:id",
  tokenIsValid,
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const result = await PlayerController.findById(id);
    res.status(result.statusCode);
    res.send({ messageSistem: result.messageSistem, body: result.body });
  },
);

/**
 * @openapi
 * /api/player/{id}:
 *   put:
 *     summary: Atualiza os dados de um jogador
 *     description: Atualiza as informações do jogador. Utilize `timeId` para vincular ou desvincular o jogador de um time (passe `null` para desvincular).
 *     tags:
 *       - Player
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do jogador
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 nullable: true
 *                 example: "João da Silva"
 *               numero:
 *                 type: integer
 *                 nullable: true
 *                 example: 10
 *               posicao:
 *                 type: string
 *                 nullable: true
 *                 example: "Atacante"
 *               dataNasc:
 *                 type: string
 *                 nullable: true
 *                 example: "2000-03-15"
 *               timeId:
 *                 type: integer
 *                 nullable: true
 *                 description: ID do time. Passe null para desvincular o jogador do time atual.
 *                 example: 2
 *     responses:
 *       200:
 *         description: Jogador atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 messageSistem:
 *                   type: string
 *                   example: "Jogador atualizado com sucesso"
 *                 body:
 *                   type: object
 *       401:
 *         description: Token inválido ou não fornecido
 *       403:
 *         description: Acesso negado - papel insuficiente
 *       404:
 *         description: Jogador não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
playerRoute.put(
  "/api/player/:id",
  tokenIsValid,
  requireRole(TipoUsuario.CAPITAO, TipoUsuario.ADMINISTRADOR),
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { nome = null, numero = null, posicao = null, dataNasc = null, timeId = null } = req.body;
    const result = await PlayerController.update(id, { nome, numero, posicao, dataNasc, timeId });
    res.status(result.statusCode);
    res.send({ messageSistem: result.messageSistem, body: result.body });
  },
);

/**
 * @openapi
 * /api/player/{id}:
 *   delete:
 *     summary: Remove um jogador do sistema
 *     tags:
 *       - Player
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do jogador
 *         example: 1
 *     responses:
 *       200:
 *         description: Jogador removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 messageSistem:
 *                   type: string
 *                   example: "Jogador removido com sucesso"
 *                 body:
 *                   type: object
 *       401:
 *         description: Token inválido ou não fornecido
 *       403:
 *         description: Acesso negado - somente ADMINISTRADOR
 *       404:
 *         description: Jogador não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
playerRoute.delete(
  "/api/player/:id",
  tokenIsValid,
  requireRole(TipoUsuario.ADMINISTRADOR),
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const result = await PlayerController.remove(id);
    res.status(result.statusCode);
    res.send({ messageSistem: result.messageSistem, body: result.body });
  },
);
