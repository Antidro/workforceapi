// src/employee/employee.controller.ts

import { Controller, Get, Param, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ListEmployeesDto } from 'src/Contracts/Employees/listemployees.dto';
import { ListEmployeesCommand } from './listemployees.command';
import { Employee } from 'src/Domain/Employees/employee.schema';

@Controller('employees')
export class ListEmployeesController {
  constructor(private readonly commandBus: CommandBus) {}

  /**
   * List all employees in the workforce
   * @param page 
   * @param limit 
   * @returns 
   */
  @Get(':page/:limit')
  async findAll(
    @Param('page') page: number,
    @Param('limit') limit: number,
  ): Promise<{ data: Employee[]; total: number }> {
    try {
      const query = new ListEmployeesCommand({
        page,
        limit,
      });

      return await this.commandBus.execute(query);
    } catch (e) {}
  }
}