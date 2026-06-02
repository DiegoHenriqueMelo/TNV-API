import * as TeamRepository from "../../repository/team/teamRepository.js";
import { PromiseReturn } from "../../model/class/promisseReturn.js";
import { Team } from "../../model/class/Team.js";
import { createLogger } from "../../utils/logger.js";

const logger = createLogger("TEAM SERVICES");

export const create = async (input: {
  nome: string;
  cidade: string;
  corPrimaria: string;
  corSecundaria: string;
  fundacao: string;
}): Promise<PromiseReturn<Team>> => {
  try {
    logger.info("Started in Services");

    const team = new Team(
      input.nome,
      input.cidade,
      input.corPrimaria,
      input.corSecundaria,
      new Date(input.fundacao),
    );

    const result = await TeamRepository.create(team);
    if (!result) throw new Error("Erro interno do Servidor");
    if (result.statusCode > 400) {
      return new PromiseReturn(result.statusCode, result.messageSistem, result.body);
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

export const findAll = async (): Promise<PromiseReturn<Team[]>> => {
  try {
    logger.info("Started in Services");

    const result = await TeamRepository.findAll();
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

export const findById = async (id: number): Promise<PromiseReturn<Team>> => {
  try {
    logger.info("Started in Services");

    const result = await TeamRepository.findById(id);
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
    nome: string;
    cidade: string;
    corPrimaria: string;
    corSecundaria: string;
    fundacao: string;
  },
): Promise<PromiseReturn<Team>> => {
  try {
    logger.info("Started in Services");

    const team = new Team(
      input.nome,
      input.cidade,
      input.corPrimaria,
      input.corSecundaria,
      new Date(input.fundacao),
    );

    const result = await TeamRepository.update(id, team);
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

export const remove = async (id: number): Promise<PromiseReturn<Team>> => {
  try {
    logger.info("Started in Services");

    const result = await TeamRepository.remove(id);
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
