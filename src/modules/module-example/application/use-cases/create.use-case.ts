import { Inject, Injectable } from '@nestjs/common';
import { EXAMPLE_REPOSITORY } from 'src/modules/module-example/domain/repositories/example.repository';
import type { ExampleRepository } from 'src/modules/module-example/domain/repositories/example.repository';
import { CreateExampleDto } from 'src/modules/module-example/application/dto/create.dto';

@Injectable()
export class CreateExampleUseCase {
  constructor(
    @Inject(EXAMPLE_REPOSITORY)
    private readonly repository: ExampleRepository,
  ) {}

  execute(data: CreateExampleDto) {
    return this.repository.create(data);
  }
}
