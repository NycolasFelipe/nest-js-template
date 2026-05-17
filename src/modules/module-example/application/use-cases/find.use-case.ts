import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EXAMPLE_REPOSITORY } from 'src/modules/module-example/domain/repositories/example.repository';
import type { ExampleRepository } from 'src/modules/module-example/domain/repositories/example.repository';
import { ExampleNotFoundError } from 'src/modules/module-example/domain/errors/example-not-found.error';

@Injectable()
export class FindExampleUseCase {
  constructor(
    @Inject(EXAMPLE_REPOSITORY)
    private readonly repository: ExampleRepository,
  ) {}

  async execute(id: number) {
    const entity = await this.repository.findById(id);

    if (!entity) {
      throw new NotFoundException(new ExampleNotFoundError(id).message);
    }

    return entity;
  }
}
