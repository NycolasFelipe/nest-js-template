// Entities
import { ExampleEntity } from 'src/modules/module-example/domain/entities/example.entity';

export const EXAMPLE_REPOSITORY = Symbol('EXAMPLE_REPOSITORY');

export interface CreateExampleInput {
  name: string;
  description?: string;
}

export interface FindAllExamplesInput {
  limit?: number;
  offset?: number;
}

export interface UpdateExampleInput {
  name?: string;
  description?: string | null;
}

export interface ExampleRepository {
  create(data: CreateExampleInput): Promise<ExampleEntity>;
  findById(id: number): Promise<ExampleEntity | null>;
  findAll(pagination: FindAllExamplesInput): Promise<ExampleEntity[]>;
  update(id: number, data: UpdateExampleInput): Promise<ExampleEntity | null>;
  delete(id: number): Promise<boolean>;
}
