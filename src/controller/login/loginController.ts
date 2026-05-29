import * as LoginServices from "../../services/login/loginServices.js";
import { PromiseReturn } from "../../model/class/promisseReturn";
import { User } from "../../model/class/User";
import { createLogger } from "../../utils/logger.js";

const logger = createLogger("LOGIN CONTROLLER");

export const login = async (login: {
  email: string;
  password: string;
}): Promise<PromiseReturn<User>> => {
  try {
    logger.info("Started in Controller");

    const result = await LoginServices.login(login);

    if (!result) throw new Error("Erro interno do Servidor");

    return new PromiseReturn(
      result.statusCode,
      result.messageSistem,
      result.body,
    );
  } catch (e) {
    logger.info("Error in Controller");
    logger.error(String(e));
    const user = new User("null", "null", "null", "ARBITRO");
    const message = e instanceof Error ? e.message : "Erro interno";
    return new PromiseReturn(401, message, user);
  } finally {
    logger.info("Exit in Controller");
  }
};
export const create = async (login: {
  nome:string;
  email: string;
  password: string;
  tipo:string
}): Promise<PromiseReturn<User>> => {
  try {
    logger.info("Started in Controller");

    const result = await LoginServices.create(login);

    if (!result) throw new Error("Erro interno do Servidor");

    return new PromiseReturn(
      result.statusCode,
      result.messageSistem,
      result.body,
    );
  } catch (e) {
    logger.info("Error in Controller");
    logger.error(String(e));
    const user = new User("null", "null", "null", "ARBITRO");
    const message = e instanceof Error ? e.message : "Erro interno";
    return new PromiseReturn(401, message, user);
  } finally {
    logger.info("Exit in Controller");
  }
};
