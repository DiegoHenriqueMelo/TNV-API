export class Player {
  public id: number = 0;
  public usuarioId: number;
  public nome: string | null;
  public numero: number | null;
  public posicao: string | null;
  public dataNasc: Date | null;
  public timeId: number | null;
  public createdAt: Date = new Date();

  constructor(
    usuarioId: number,
    nome: string | null = null,
    numero: number | null = null,
    posicao: string | null = null,
    dataNasc: Date | null = null,
    timeId: number | null = null,
  ) {
    this.usuarioId = usuarioId;
    this.nome = nome;
    this.numero = numero;
    this.posicao = posicao;
    this.dataNasc = dataNasc;
    this.timeId = timeId;
  }
}
