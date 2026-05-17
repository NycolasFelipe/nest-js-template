export class ExampleNotFoundError extends Error {
  constructor(id: number) {
    super(`Example with id ${id} was not found.`);
    this.name = 'ExampleNotFoundError';
  }
}
