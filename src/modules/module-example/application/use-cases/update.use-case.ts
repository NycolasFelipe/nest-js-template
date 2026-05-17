import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EXAMPLE_REPOSITORY } from 'src/modules/module-example/domain/repositories/example.repository';
import type { ExampleRepository } from 'src/modules/module-example/domain/repositories/example.repository';
import { ExampleNotFoundError } from 'src/modules/module-example/domain/errors/example-not-found.error';
import { UpdateExampleDto } from 'src/modules/module-example/application/dto/update.dto';

@Injectable()
export class UpdateExampleUseCase {
  constructor(
    @Inject(EXAMPLE_REPOSITORY)
    private readonly repository: ExampleRepository,
  ) {}

  async execute(id: number, data: UpdateExampleDto) {
    const updated = await this.repository.update(id, data);

    if (!updated) {
      throw new NotFoundException(new ExampleNotFoundError(id).message);
    }

    return updated;
  }
}
