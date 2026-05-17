import { Provider } from '@nestjs/common';
import { ExampleTypeormRepository } from 'src/modules/module-example/infrastructure/persistence/typeorm/example-typeorm.repository';
import { EXAMPLE_REPOSITORY } from 'src/modules/module-example/domain/repositories/example.repository';

export const exampleProviders: Provider[] = [
  {
    provide: EXAMPLE_REPOSITORY,
    useClass: ExampleTypeormRepository,
  },
];
