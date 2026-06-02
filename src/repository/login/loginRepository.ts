import { prisma } from "../../config/prismaClient.js";
import { createLogger } from "../../utils/logger.js";
import { User } from "../../model/class/User.js";
import { PromiseReturn } from "../../model/class/promisseReturn.js";

const logger = createLogger("LOGIN REPOSITORY");

export const login = async (login: {
  email: string;
}): Promise<PromiseReturn<User>> => {
  try {
    logger.info("Started in Repository");
    logger.info("Buscando usuario...");
    const getUser = await prisma.usuario.findUnique({
      where: { email: login.email },
    });
    if (!getUser) {
      logger.warn("Erro ao buscar usuario");
      throw new Error("Credenciais Inválidas");
    }
    return new PromiseReturn(200, "Login realizado com sucesso", getUser as unknown as User);
  } catch (e) {
    logger.info("Error in Repository");
    logger.error(String(e));
    const user = new User("null", "null", "null", "ARBITRO");
    const message = e instanceof Error ? e.message : "Erro interno";
    return new PromiseReturn(401, message, user);
  } finally {
    logger.info("Exit in Repository");
  }
};
export const create = async (user: User): Promise<PromiseReturn<User>> => {
  try {
    logger.info("Started in Repository");
    logger.info("Criando usuario...");
    const insertUser = await prisma.usuario.create({
      data: {
        nome: user.nome,
        email: user.email,
        senha: user.senha,
        tipo: user.tipo,
      },
    })
    if (!insertUser) {
      logger.warn("Erro ao criar usuario");
      throw new Error("Erro ao criar usuario");
    }
    return new PromiseReturn(201, "Usuário criado com sucesso", insertUser as unknown as User);
  } catch (e) {
    logger.info("Error in Repository");
    logger.error(String(e));
    const user = new User("null", "null", "null", "ARBITRO");
    const message = e instanceof Error ? e.message : "Erro interno";
    return new PromiseReturn(401, message, user);
  } finally {
    logger.info("Exit in Repository");
  }
};
