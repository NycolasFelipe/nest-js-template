import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Use cases
import { CreateExampleUseCase } from 'src/modules/module-example/application/use-cases/create.use-case';
import { DeleteExampleUseCase } from 'src/modules/module-example/application/use-cases/delete.use-case';
import { FindAllExampleUseCase } from 'src/modules/module-example/application/use-cases/find-all.use-case';
import { FindExampleUseCase } from 'src/modules/module-example/application/use-cases/find.use-case';
import { UpdateExampleUseCase } from 'src/modules/module-example/application/use-cases/update.use-case';

// Infrastructure
import { exampleProviders } from 'src/modules/module-example/infrastructure/persistence/providers/example.providers';
import { ExampleOrmEntity } from 'src/modules/module-example/infrastructure/persistence/typeorm/example.orm-entity';
import { ExampleTypeormRepository } from 'src/modules/module-example/infrastructure/persistence/typeorm/example-typeorm.repository';

// Controllers
import { ExampleController } from 'src/modules/module-example/presentation/http/controllers/example.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ExampleOrmEntity])],
  controllers: [ExampleController],
  providers: [
    ExampleTypeormRepository,
    ...exampleProviders,
    CreateExampleUseCase,
    FindExampleUseCase,
    FindAllExampleUseCase,
    UpdateExampleUseCase,
    DeleteExampleUseCase,
  ],
})
export class ModuleExampleModule {}
