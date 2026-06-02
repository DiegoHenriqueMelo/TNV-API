import * as PlayerRepository from "../../repository/player/playerRepository.js";
import { PromiseReturn } from "../../model/class/promisseReturn.js";
import { Player } from "../../model/class/Player.js";
import { createLogger } from "../../utils/logger.js";

const logger = createLogger("PLAYER SERVICES");

export const create = async (input: {
  usuarioId: number;
  nome: string | null;
  numero: number | null;
  posicao: string | null;
  dataNasc: string | null;
  timeId: number | null;
}): Promise<PromiseReturn<Player>> => {
  try {
    logger.info("Started in Services");

    const player = new Player(
      input.usuarioId,
      input.nome,
      input.numero,
      input.posicao,
      input.dataNasc ? new Date(input.dataNasc) : null,
      input.timeId,
    );

    const result = await PlayerRepository.create(player);
    if (!result) throw new Error("Erro interno do Servidor");
    if (result.statusCode >= 400) {
      return new PromiseReturn(result.statusCode, result.messageSistem);
    }
    return new PromiseReturn(result.statusCode, result.messageSistem, result.body);
  } catch (e) {
    logger.error(String(e));
    const message = e instanceof Error ? e.message : "Erro interno";
    return new PromiseReturn(500, message);
  } finally {
    logger.info("Exit in Services");
  }
};

export const findAll = async (): Promise<PromiseReturn<Player[]>> => {
  try {
    logger.info("Started in Services");

    const result = await PlayerRepository.findAll();
    if (!result) throw new Error("Erro interno do Servidor");
    if (result.statusCode >= 400) {
      return new PromiseReturn(result.statusCode, result.messageSistem);
    }
    return new PromiseReturn(result.statusCode, result.messageSistem, result.body);
  } catch (e) {
    logger.error(String(e));
    const message = e instanceof Error ? e.message : "Erro interno";
    return new PromiseReturn(500, message);
  } finally {
    logger.info("Exit in Services");
  }
};

export const findById = async (id: number): Promise<PromiseReturn<Player>> => {
  try {
    logger.info("Started in Services");

    const result = await PlayerRepository.findById(id);
    if (!result) throw new Error("Erro interno do Servidor");
    if (result.statusCode >= 400) {
      return new PromiseReturn(result.statusCode, result.messageSistem);
    }
    return new PromiseReturn(result.statusCode, result.messageSistem, result.body);
  } catch (e) {
    logger.error(String(e));
    const message = e instanceof Error ? e.message : "Erro interno";
    return new PromiseReturn(500, message);
  } finally {
    logger.info("Exit in Services");
  }
};

export const update = async (
  id: number,
  input: {
    nome: string | null;
    numero: number | null;
    posicao: string | null;
    dataNasc: string | null;
    timeId: number | null;
  },
): Promise<PromiseReturn<Player>> => {
  try {
    logger.info("Started in Services");

    const player = new Player(
      0,
      input.nome,
      input.numero,
      input.posicao,
      input.dataNasc ? new Date(input.dataNasc) : null,
      input.timeId,
    );

    const result = await PlayerRepository.update(id, player);
    if (!result) throw new Error("Erro interno do Servidor");
    if (result.statusCode >= 400) {
      return new PromiseReturn(result.statusCode, result.messageSistem);
    }
    return new PromiseReturn(result.statusCode, result.messageSistem, result.body);
  } catch (e) {
    logger.error(String(e));
    const message = e instanceof Error ? e.message : "Erro interno";
    return new PromiseReturn(500, message);
  } finally {
    logger.info("Exit in Services");
  }
};

export const remove = async (id: number): Promise<PromiseReturn<Player>> => {
  try {
    logger.info("Started in Services");

    const result = await PlayerRepository.remove(id);
    if (!result) throw new Error("Erro interno do Servidor");
    if (result.statusCode >= 400) {
      return new PromiseReturn(result.statusCode, result.messageSistem);
    }
    return new PromiseReturn(result.statusCode, result.messageSistem, result.body);
  } catch (e) {
    logger.error(String(e));
    const message = e instanceof Error ? e.message : "Erro interno";
    return new PromiseReturn(500, message);
  } finally {
    logger.info("Exit in Services");
  }
};
