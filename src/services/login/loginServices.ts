import bcrypt from "bcrypt";
import * as LoginRepository from "../../repository/login/loginRepository.js";
import { PromiseReturn } from "../../model/class/promisseReturn.js";
import { User } from "../../model/class/User";
import { createLogger } from "../../utils/logger.js";
import { TipoUsuario } from "@prisma/client";
import { createToken } from "../../middleware/auth.js";

const logger = createLogger("LOGIN SERVICES");

export const login = async (login: {
  email: string;
  password: string;
}): Promise<PromiseReturn<User>> => {
  try {
    logger.info("Started in Services");

    const result = await LoginRepository.login(login);

    if (!result) throw new Error("Erro interno do Servidor");
    if (result.statusCode > 400) {
      return new PromiseReturn(result.statusCode, result.messageSistem);
    }
    if (!result.body) throw new Error("Erro interno do Servidor");

    logger.info("Decrypt password");
    const passwordIsValid: boolean = await bcrypt.compare(
      login.password,
      result.body.senha,
    );
    if (!passwordIsValid) throw new Error("Credenciais Inválidas");

    const token = await createToken(result.body.tipo, result.body.id, 3600);

    const userFormatted = new User(
      result.body.nome,
      result.body.email,
      result.body.senha,
      result.body.tipo,
      token,
    );

    return new PromiseReturn(
      result.statusCode,
      result.messageSistem,
      userFormatted,
    );
  } catch (e) {
    logger.info("Error in Services");
    logger.error(String(e));
    const user = new User("null", "null", "null", "ARBITRO", "SEM TOKEN");
    const message = e instanceof Error ? e.message : "Erro interno";
    return new PromiseReturn(401, message, user);
  } finally {
    logger.info("Exit in Services");
  }
};
export const create = async (login: {
  nome: string;
  email: string;
  password: string;
  tipo: string;
}): Promise<PromiseReturn<User>> => {
  try {
    logger.info("Started in Services");

    logger.info("encrypting password");
    const passHased: string = await bcrypt.hash(login.password, 10);
    if (!passHased) throw new Error("Credenciais Inválidas");

    const tipo =
      TipoUsuario[login.tipo.toUpperCase() as keyof typeof TipoUsuario];
    if (!tipo)
      throw new Error(
        `Tipo de usuário inválido: ${login.tipo}. Valores aceitos: ${Object.keys(TipoUsuario).join(", ")}`,
      );

    const user = new User(
      login.nome,
      login.email,
      passHased,
      tipo,
      "SEM TOKEN",
    );

    const result = await LoginRepository.create(user);
    if (!result) throw new Error("Erro interno do Servidor");
    if (result.statusCode > 400) {
      return new PromiseReturn(
        result.statusCode,
        result.messageSistem,
        result.body,
      );
    }

    if (result.statusCode === 200) {
    }
    return new PromiseReturn(
      result.statusCode,
      result.messageSistem,
      result.body,
    );
  } catch (e) {
    logger.info("Error in Services");
    logger.error(String(e));
    const user = new User("null", "null", "null", "ARBITRO", "SEM TOKEN");
    const message = e instanceof Error ? e.message : "Erro interno";
    return new PromiseReturn(401, message, user);
  } finally {
    logger.info("Exit in Services");
  }
};
