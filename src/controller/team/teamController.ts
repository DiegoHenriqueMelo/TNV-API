import * as TeamServices from "../../services/team/teamServices.js";
import { PromiseReturn } from "../../model/class/promisseReturn.js";
import { Team } from "../../model/class/Team.js";
import { createLogger } from "../../utils/logger.js";

const logger = createLogger("TEAM CONTROLLER");

export const create = async (input: {
  nome: string;
  cidade: string;
  corPrimaria: string;
  corSecundaria: string;
  fundacao: string;
}): Promise<PromiseReturn<Team>> => {
  try {
    logger.info("Started in Controller");

    const result = await TeamServices.create(input);
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

export const findAll = async (): Promise<PromiseReturn<Team[]>> => {
  try {
    logger.info("Started in Controller");

    const result = await TeamServices.findAll();
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

export const findById = async (id: number): Promise<PromiseReturn<Team>> => {
  try {
    logger.info("Started in Controller");

    const result = await TeamServices.findById(id);
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
    nome: string;
    cidade: string;
    corPrimaria: string;
    corSecundaria: string;
    fundacao: string;
  },
): Promise<PromiseReturn<Team>> => {
  try {
    logger.info("Started in Controller");

    const result = await TeamServices.update(id, input);
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

export const remove = async (id: number): Promise<PromiseReturn<Team>> => {
  try {
    logger.info("Started in Controller");

    const result = await TeamServices.remove(id);
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
