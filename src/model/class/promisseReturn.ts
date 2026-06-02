export class PromiseReturn<T> {
  public statusCode: number;
  public messageSistem: string;
  public body?: T;

  constructor(statusCode: number, messageSistem: string, body?: T) {
    this.statusCode = statusCode;
    this.messageSistem = messageSistem;
    this.body = body;
  }
}
