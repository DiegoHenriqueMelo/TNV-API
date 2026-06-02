import { TipoUsuario } from "@prisma/client";

export class User {
  public id: number;
  public nome: string;
  public email: string;
  public senha: string;
  public tipo: TipoUsuario;
  public createdAt: Date;
  public updatedAt: Date;
  private token: string;

  constructor(
    nome: string,
    email: string,
    senha: string,
    tipo: TipoUsuario,
    token: string = "",
  ) {
    this.id = 0;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.tipo = tipo;
    this.createdAt = new Date();
    this.updatedAt = this.createdAt;
    this.token = token;
  }
}
