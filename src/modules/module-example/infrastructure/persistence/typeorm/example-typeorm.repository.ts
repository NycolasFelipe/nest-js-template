import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Repositories
import { ExampleRepository } from 'src/modules/module-example/domain/repositories/example.repository';

// DTOs
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateExampleDto } from 'src/modules/module-example/application/dto/create.dto';
import { UpdateExampleDto } from 'src/modules/module-example/application/dto/update.dto';

// Entities
import { ExampleEntity } from 'src/modules/module-example/domain/entities/example.entity';
import { ExampleOrmEntity } from 'src/modules/module-example/infrastructure/persistence/typeorm/example.orm-entity';

@Injectable()
export class ExampleTypeormRepository implements ExampleRepository {
  constructor(
    @InjectRepository(ExampleOrmEntity)
    private readonly repository: Repository<ExampleOrmEntity>,
  ) {}

  /** Cria um novo exemplo */
  async create(data: CreateExampleDto): Promise<ExampleEntity> {
    const entity = this.repository.create({
      name: data.name,
      description: data.description ?? null,
    });

    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  /** Encontra um exemplo pelo ID */
  async findById(id: number): Promise<ExampleEntity | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }

  /** Lista todos os exemplos */
  async findAll(pagination: PaginationDto): Promise<ExampleEntity[]> {
    const entities = await this.repository.find({
      take: pagination.limit,
      skip: pagination.offset,
      order: { createdAt: 'DESC' },
    });

    return entities.map((entity) => this.toDomain(entity));
  }

  /** Atualiza um exemplo existente */
  async update(
    id: number,
    data: UpdateExampleDto,
  ): Promise<ExampleEntity | null> {
    const current = await this.repository.findOne({ where: { id } });

    if (!current) {
      return null;
    }

    if (data.name !== undefined) {
      current.name = data.name;
    }

    if (data.description !== undefined) {
      current.description = data.description;
    }

    const updated = await this.repository.save(current);
    return this.toDomain(updated);
  }

  /** Exclui um exemplo */
  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return !!result.affected;
  }

  /** Converte uma entidade ORM para uma entidade de domínio */
  private toDomain(entity: ExampleOrmEntity): ExampleEntity {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
