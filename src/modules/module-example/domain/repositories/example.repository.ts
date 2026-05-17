// DTOs
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateExampleDto } from 'src/modules/module-example/application/dto/create.dto';
import { UpdateExampleDto } from 'src/modules/module-example/application/dto/update.dto';

// Entities
import { ExampleEntity } from 'src/modules/module-example/domain/entities/example.entity';

export const EXAMPLE_REPOSITORY = Symbol('EXAMPLE_REPOSITORY');

export interface ExampleRepository {
  create(data: CreateExampleDto): Promise<ExampleEntity>;
  findById(id: number): Promise<ExampleEntity | null>;
  findAll(pagination: PaginationDto): Promise<ExampleEntity[]>;
  update(id: number, data: UpdateExampleDto): Promise<ExampleEntity | null>;
  delete(id: number): Promise<boolean>;
}
