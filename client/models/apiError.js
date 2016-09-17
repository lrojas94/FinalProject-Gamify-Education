export class APIError {
  message: string;
  code:number;
  data: object;

  constructor(message, code, data) {
    this.message = message || `There's been an error performing the requested action.`;
    this.code = code || `-1`;
    this.data = data || null;
  }
}
