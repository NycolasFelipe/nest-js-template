import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

// DTOs
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateExampleDto } from 'src/modules/module-example/presentation/http/dto/create.dto';
import { UpdateExampleDto } from 'src/modules/module-example/presentation/http/dto/update.dto';

// Use cases
import { CreateExampleUseCase } from 'src/modules/module-example/application/use-cases/create.use-case';
import { DeleteExampleUseCase } from 'src/modules/module-example/application/use-cases/delete.use-case';
import { FindAllExampleUseCase } from 'src/modules/module-example/application/use-cases/find-all.use-case';
import { FindExampleUseCase } from 'src/modules/module-example/application/use-cases/find.use-case';
import { UpdateExampleUseCase } from 'src/modules/module-example/application/use-cases/update.use-case';

@Controller('examples')
export class ExampleController {
  constructor(
    private readonly createExampleUseCase: CreateExampleUseCase,
    private readonly findExampleUseCase: FindExampleUseCase,
    private readonly findAllExampleUseCase: FindAllExampleUseCase,
    private readonly updateExampleUseCase: UpdateExampleUseCase,
    private readonly deleteExampleUseCase: DeleteExampleUseCase,
  ) {}

  /** Cria um novo exemplo */
  @Post()
  create(@Body() body: CreateExampleDto) {
    return this.createExampleUseCase.execute(body);
  }

  /** Retorna todos os exemplos */
  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return this.findAllExampleUseCase.execute(pagination);
  }

  /** Retorna um exemplo específico */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.findExampleUseCase.execute(id);
  }

  /** Atualiza um exemplo específico */
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateExampleDto,
  ) {
    return this.updateExampleUseCase.execute(id, body);
  }

  /** Exclui um exemplo específico */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.deleteExampleUseCase.execute(id);
  }
}
