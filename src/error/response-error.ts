export class ResponseError extends Error {
  public status: number;
  public errorDetails: Record<string, string[]> | null;

  constructor(status: number, message: string, errorDetails: Record<string, string[]> | null = null) {
    super(message);
    this.status = status;
    this.errorDetails = errorDetails;


    Object.setPrototypeOf(this, ResponseError.prototype);
  }
}
