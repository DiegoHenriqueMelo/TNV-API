import * as PlayerServices from "../../services/player/playerServices.js";
import { PromiseReturn } from "../../model/class/promisseReturn.js";
import { Player } from "../../model/class/Player.js";
import { createLogger } from "../../utils/logger.js";

const logger = createLogger("PLAYER CONTROLLER");

export const create = async (input: {
  usuarioId: number;
  nome: string | null;
  numero: number | null;
  posicao: string | null;
  dataNasc: string | null;
  timeId: number | null;
}): Promise<PromiseReturn<Player>> => {
  try {
    logger.info("Started in Controller");

    const result = await PlayerServices.create(input);
    if (!result) throw new Error("Erro interno do Servidor");

    return new PromiseReturn(result.statusCode, result.messageSistem, result.body);
  } catch (e) {
    logger.error(String(e));
    const message = e instanceof Error ? e.message : "Erro interno";
    return new PromiseReturn(500, message);
  } finally {
    logger.info("Exit in Controller");
  }
};

export const findAll = async (): Promise<PromiseReturn<Player[]>> => {
  try {
    logger.info("Started in Controller");

    const result = await PlayerServices.findAll();
    if (!result) throw new Error("Erro interno do Servidor");

    return new PromiseReturn(result.statusCode, result.messageSistem, result.body);
  } catch (e) {
    logger.error(String(e));
    const message = e instanceof Error ? e.message : "Erro interno";
    return new PromiseReturn(500, message);
  } finally {
    logger.info("Exit in Controller");
  }
};

export const findById = async (id: number): Promise<PromiseReturn<Player>> => {
  try {
    logger.info("Started in Controller");

    const result = await PlayerServices.findById(id);
    if (!result) throw new Error("Erro interno do Servidor");

    return new PromiseReturn(result.statusCode, result.messageSistem, result.body);
  } catch (e) {
    logger.error(String(e));
    const message = e instanceof Error ? e.message : "Erro interno";
    return new PromiseReturn(500, message);
  } finally {
    logger.info("Exit in Controller");
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
    logger.info("Started in Controller");

    const result = await PlayerServices.update(id, input);
    if (!result) throw new Error("Erro interno do Servidor");

    return new PromiseReturn(result.statusCode, result.messageSistem, result.body);
  } catch (e) {
    logger.error(String(e));
    const message = e instanceof Error ? e.message : "Erro interno";
    return new PromiseReturn(500, message);
  } finally {
    logger.info("Exit in Controller");
  }
};

export const remove = async (id: number): Promise<PromiseReturn<Player>> => {
  try {
    logger.info("Started in Controller");

    const result = await PlayerServices.remove(id);
    if (!result) throw new Error("Erro interno do Servidor");

    return new PromiseReturn(result.statusCode, result.messageSistem, result.body);
  } catch (e) {
    logger.error(String(e));
    const message = e instanceof Error ? e.message : "Erro interno";
    return new PromiseReturn(500, message);
  } finally {
    logger.info("Exit in Controller");
  }
};
