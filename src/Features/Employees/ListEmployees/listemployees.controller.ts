// src/employee/employee.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ListEmployeesDto } from 'src/Contracts/Employees/listemployees.dto';
import { ListEmployeesCommand } from './listemployees.command';
import { Employee } from 'src/Domain/Employees/employee.schema';

@ApiTags('Employees')
@Controller('listemployees')
export class ListEmployeesController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get(':page/:limit')
  @ApiOperation({ summary: 'List all employees' }) // Summary of the operation
  @ApiResponse({ status: 200, description: 'Successfully retrieved list of employees', type: ListEmployeesDto }) // Successful response
  @ApiResponse({ status: 400, description: 'Bad Request.' }) // Error response
  async findAll(
    @Param('page') page: number,
    @Param('limit') limit: number,
  ): Promise<{ data: Employee[]; total: number }> {
    try {
      const query = new ListEmployeesCommand({
        page,
        limit,
      });

      const employees: Employee[] = await this.commandBus.execute(query);

      return { data: employees, total: employees.length };
    } catch (e) {
      console.log(e);
    }
  }
}