import { prisma } from "../../config/prismaClient.js";
import { createLogger } from "../../utils/logger.js";
import { Player } from "../../model/class/Player.js";
import { PromiseReturn } from "../../model/class/promisseReturn.js";

const logger = createLogger("PLAYER REPOSITORY");

export const create = async (player: Player): Promise<PromiseReturn<Player>> => {
  try {
    logger.info("Started in Repository");
    logger.info("Verificando se usuário já possui jogador cadastrado...");
    const existing = await prisma.jogador.findUnique({ where: { usuarioId: player.usuarioId } });
    if (existing) {
      logger.warn("Usuário já possui um jogador cadastrado");
      return new PromiseReturn(409, "Usuário já possui um jogador cadastrado");
    }
    logger.info("Criando jogador...");
    const insertPlayer = await prisma.jogador.create({
      data: {
        usuarioId: player.usuarioId,
        nome: player.nome,
        numero: player.numero,
        posicao: player.posicao,
        dataNasc: player.dataNasc,
        timeId: player.timeId,
      },
      include: {
        time: true,
        usuario: { select: { nome: true, email: true, tipo: true } },
      },
    });
    return new PromiseReturn(201, "Jogador criado com sucesso", insertPlayer as unknown as Player);
  } catch (e) {
    logger.info("Error in Repository");
    logger.error(String(e));
    const message = e instanceof Error ? e.message : "Erro interno";
    return new PromiseReturn(500, message);
  } finally {
    logger.info("Exit in Repository");
  }
};

export const findAll = async (): Promise<PromiseReturn<Player[]>> => {
  try {
    logger.info("Started in Repository");
    logger.info("Buscando todos os jogadores...");
    const players = await prisma.jogador.findMany({
      include: {
        time: true,
        usuario: { select: { nome: true, email: true, tipo: true } },
      },
    });
    return new PromiseReturn(200, "Jogadores encontrados com sucesso", players as unknown as Player[]);
  } catch (e) {
    logger.info("Error in Repository");
    logger.error(String(e));
    const message = e instanceof Error ? e.message : "Erro interno";
    return new PromiseReturn(500, message);
  } finally {
    logger.info("Exit in Repository");
  }
};

export const findById = async (id: number): Promise<PromiseReturn<Player>> => {
  try {
    logger.info("Started in Repository");
    logger.info(`Buscando jogador ${id}...`);
    const player = await prisma.jogador.findUnique({
      where: { id },
      include: {
        time: true,
        usuario: { select: { nome: true, email: true, tipo: true } },
      },
    });
    if (!player) {
      logger.warn("Jogador não encontrado");
      return new PromiseReturn(404, "Jogador não encontrado");
    }
    return new PromiseReturn(200, "Jogador encontrado com sucesso", player as unknown as Player);
  } catch (e) {
    logger.info("Error in Repository");
    logger.error(String(e));
    const message = e instanceof Error ? e.message : "Erro interno";
    return new PromiseReturn(500, message);
  } finally {
    logger.info("Exit in Repository");
  }
};

export const update = async (id: number, player: Player): Promise<PromiseReturn<Player>> => {
  try {
    logger.info("Started in Repository");
    logger.info(`Verificando existência do jogador ${id}...`);
    const existing = await prisma.jogador.findUnique({ where: { id } });
    if (!existing) {
      logger.warn("Jogador não encontrado para atualização");
      return new PromiseReturn(404, "Jogador não encontrado");
    }
    logger.info(`Atualizando jogador ${id}...`);
    const updatedPlayer = await prisma.jogador.update({
      where: { id },
      data: {
        nome: player.nome,
        numero: player.numero,
        posicao: player.posicao,
        dataNasc: player.dataNasc,
        timeId: player.timeId,
      },
      include: {
        time: true,
        usuario: { select: { nome: true, email: true, tipo: true } },
      },
    });
    return new PromiseReturn(200, "Jogador atualizado com sucesso", updatedPlayer as unknown as Player);
  } catch (e) {
    logger.info("Error in Repository");
    logger.error(String(e));
    const message = e instanceof Error ? e.message : "Erro interno";
    return new PromiseReturn(500, message);
  } finally {
    logger.info("Exit in Repository");
  }
};

export const remove = async (id: number): Promise<PromiseReturn<Player>> => {
  try {
    logger.info("Started in Repository");
    logger.info(`Verificando existência do jogador ${id}...`);
    const existing = await prisma.jogador.findUnique({ where: { id } });
    if (!existing) {
      logger.warn("Jogador não encontrado para exclusão");
      return new PromiseReturn(404, "Jogador não encontrado");
    }
    logger.info(`Deletando jogador ${id}...`);
    const deletedPlayer = await prisma.jogador.delete({ where: { id } });
    return new PromiseReturn(200, "Jogador removido com sucesso", deletedPlayer as unknown as Player);
  } catch (e) {
    logger.info("Error in Repository");
    logger.error(String(e));
    const message = e instanceof Error ? e.message : "Erro interno";
    return new PromiseReturn(500, message);
  } finally {
    logger.info("Exit in Repository");
  }
};
