import { Test, TestingModule } from '@nestjs/testing';
import { CreateEmployeeController } from 'src/Features/Employees/CreateEmployee/createemployee.controller';

describe('EmployeeController', () => {
  let controller: CreateEmployeeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateEmployeeController],
    }).compile();

    controller = module.get<CreateEmployeeController>(CreateEmployeeController);
  });

  it('should create a new employee', async () => {
    const createEmployeeDto = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      department: 'Sales',
      address: '123 Main St',
    };

    const result = await controller.create(createEmployeeDto);
    expect(result).toBeDefined();
    expect(result.firstName).toBe(createEmployeeDto.firstName);
    expect(result.lastName).toBe(createEmployeeDto.lastName);
    expect(result.email).toBe(createEmployeeDto.email);
    expect(result.phone).toBe(createEmployeeDto.phone);
    expect(result.department).toBe(createEmployeeDto.department);
    expect(result.address).toBe(createEmployeeDto.address);
  });
});
