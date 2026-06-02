export class Team {
  public id: number = 0;
  public nome: string;
  public sigla: string | null;
  public cidade: string | null;
  public corPrimaria: string | null;
  public corSecundaria: string | null;
  public fundacao: Date | null;
  public createdAt: Date = new Date();

  constructor(
    nome: string,
    cidade: string | null,
    corPrimaria: string | null,
    corSecundaria: string | null,
    fundacao: Date | null,
  ) {
    this.nome = nome;
    this.sigla = nome.substring(0, 3).toUpperCase();
    this.cidade = cidade;
    this.corPrimaria = corPrimaria;
    this.corSecundaria = corSecundaria;
    this.fundacao = fundacao ? new Date(fundacao) : null;
  }
}
