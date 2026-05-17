import { Inject, Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { EXAMPLE_REPOSITORY } from 'src/modules/module-example/domain/repositories/example.repository';
import type { ExampleRepository } from 'src/modules/module-example/domain/repositories/example.repository';

@Injectable()
export class FindAllExampleUseCase {
  constructor(
    @Inject(EXAMPLE_REPOSITORY)
    private readonly repository: ExampleRepository,
  ) {}

  execute(pagination: PaginationDto) {
    return this.repository.findAll({
      limit: pagination.limit ?? 20,
      offset: pagination.offset ?? 0,
    });
  }
}
