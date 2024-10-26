import { Test, TestingModule } from '@nestjs/testing';
import { ListEmployeesController } from 'src/Features/Employees/ListEmployees/listemployees.controller';
import { CommandBus } from '@nestjs/cqrs';
import { ListEmployeesCommand } from 'src/Features/Employees/ListEmployees/listemployees.command';
import { Employee } from 'src/Domain/Employees/employee.schema';

describe('ListEmployeesController', () => {
  let controller: ListEmployeesController;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListEmployeesController],
      providers: [
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn().mockResolvedValue({
              data: [{ name: 'John Doe', position: 'Developer' }],
              total: 1,
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<ListEmployeesController>(ListEmployeesController);
    commandBus = module.get<CommandBus>(CommandBus);
  });

  it('should return a list of employees with pagination', async () => {
    const page = 1;
    const limit = 10;

    const result = await controller.findAll(page, limit);

    expect(result).toBeDefined();
    expect(result.data).toEqual([{ name: 'John Doe', position: 'Developer' }]);
    expect(result.total).toBe(1);
    expect(commandBus.execute).toHaveBeenCalledWith(
      new ListEmployeesCommand({ page, limit })
    );
  });
});
