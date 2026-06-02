import { prisma } from "../../config/prismaClient.js";
import { createLogger } from "../../utils/logger.js";
import { Team } from "../../model/class/Team.js";
import { PromiseReturn } from "../../model/class/promisseReturn.js";

const logger = createLogger("TEAM REPOSITORY");

export const create = async (team: Team): Promise<PromiseReturn<Team>> => {
  try {
    logger.info("Started in Repository");
    logger.info("Criando time...");
    const insertTeam = await prisma.time.create({
      data: {
        nome: team.nome,
        sigla: team.sigla,
        cidade: team.cidade,
        fundacao: team.fundacao,
        corPrimaria: team.corPrimaria,
        corSecundaria: team.corSecundaria,
      },
    });
    if (!insertTeam) {
      logger.warn("Erro ao criar time");
      throw new Error("Erro ao criar usuario");
    }
    return new PromiseReturn(201, "Time criado com sucesso", insertTeam as unknown as Team);
  } catch (e) {
    logger.info("Error in Repository");
    logger.error(String(e));
    const user = new Team("null", "null", "null", "null", new Date());
    const message = e instanceof Error ? e.message : "Erro interno";
    return new PromiseReturn(401, message, user);
  } finally {
    logger.info("Exit in Repository");
  }
};

export const findAll = async (): Promise<PromiseReturn<Team[]>> => {
  try {
    logger.info("Started in Repository");
    logger.info("Buscando todos os times...");
    const teams = await prisma.time.findMany();
    return new PromiseReturn(200, "Times encontrados com sucesso", teams as unknown as Team[]);
  } catch (e) {
    logger.info("Error in Repository");
    logger.error(String(e));
    const message = e instanceof Error ? e.message : "Erro interno";
    return new PromiseReturn(500, message);
  } finally {
    logger.info("Exit in Repository");
  }
};

export const findById = async (id: number): Promise<PromiseReturn<Team>> => {
  try {
    logger.info("Started in Repository");
    logger.info(`Buscando time ${id}...`);
    const team = await prisma.time.findUnique({ where: { id } });
    if (!team) {
      logger.warn("Time não encontrado");
      return new PromiseReturn(404, "Time não encontrado");
    }
    return new PromiseReturn(200, "Time encontrado com sucesso", team as unknown as Team);
  } catch (e) {
    logger.info("Error in Repository");
    logger.error(String(e));
    const message = e instanceof Error ? e.message : "Erro interno";
    return new PromiseReturn(500, message);
  } finally {
    logger.info("Exit in Repository");
  }
};

export const update = async (id: number, team: Team): Promise<PromiseReturn<Team>> => {
  try {
    logger.info("Started in Repository");
    logger.info(`Verificando existência do time ${id}...`);
    const existing = await prisma.time.findUnique({ where: { id } });
    if (!existing) {
      logger.warn("Time não encontrado para atualização");
      return new PromiseReturn(404, "Time não encontrado");
    }
    logger.info(`Atualizando time ${id}...`);
    const updatedTeam = await prisma.time.update({
      where: { id },
      data: {
        nome: team.nome,
        sigla: team.sigla,
        cidade: team.cidade,
        fundacao: team.fundacao,
        corPrimaria: team.corPrimaria,
        corSecundaria: team.corSecundaria,
      },
    });
    return new PromiseReturn(200, "Time atualizado com sucesso", updatedTeam as unknown as Team);
  } catch (e) {
    logger.info("Error in Repository");
    logger.error(String(e));
    const message = e instanceof Error ? e.message : "Erro interno";
    return new PromiseReturn(500, message);
  } finally {
    logger.info("Exit in Repository");
  }
};

export const remove = async (id: number): Promise<PromiseReturn<Team>> => {
  try {
    logger.info("Started in Repository");
    logger.info(`Verificando existência do time ${id}...`);
    const existing = await prisma.time.findUnique({ where: { id } });
    if (!existing) {
      logger.warn("Time não encontrado para exclusão");
      return new PromiseReturn(404, "Time não encontrado");
    }
    logger.info(`Deletando time ${id}...`);
    const deletedTeam = await prisma.time.delete({ where: { id } });
    return new PromiseReturn(200, "Time deletado com sucesso", deletedTeam as unknown as Team);
  } catch (e) {
    logger.info("Error in Repository");
    logger.error(String(e));
    const message = e instanceof Error ? e.message : "Erro interno";
    return new PromiseReturn(500, message);
  } finally {
    logger.info("Exit in Repository");
  }
};
