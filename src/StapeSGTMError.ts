export class StapeSGTMError extends Error {
  public details: unknown;
  constructor(details: unknown) {
    super('Something went wrong while sending the event.');
    this.details = details;
  }
}
