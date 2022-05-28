export class ErrorResponse {
  name: string;
  message: string;
  status: number;
  stack?: any;
  /**
   *
   */
  constructor(name: string, message: string, status: number, stack?: any) {
    this.name = name;
    this.message = message;
    this.status = status;
    this.stack = stack;
  }
}
