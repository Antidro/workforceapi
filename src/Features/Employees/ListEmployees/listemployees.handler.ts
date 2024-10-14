// src/employee/handlers/list-employees.handler.ts

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from 'src/Domain/Employees/employee.schema';
import { ListEmployeesDto } from 'src/Contracts/Employees/listemployees.dto';
import { ListEmployeesCommand } from './listemployees.command';

@QueryHandler(ListEmployeesCommand)
export class ListEmployeesHandler implements IQueryHandler<ListEmployeesCommand> {
  constructor(@InjectModel(Employee.name) private employeeModel: Model<Employee>) {}

  async execute(query: ListEmployeesCommand): Promise<{ data: Employee[]; total: number }> {
    const { page, limit } = query.listEmployeesDto;

    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.employeeModel.find().skip(skip).limit(limit).exec(),
      this.employeeModel.countDocuments(),
    ]);

    return { data, total };
  }
}
