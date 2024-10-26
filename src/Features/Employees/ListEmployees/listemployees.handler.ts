import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ListEmployeesCommand } from './listemployees.command';
import { Employee } from 'src/Domain/Employees/employee.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@CommandHandler(ListEmployeesCommand)
export class ListEmployeesHandler implements ICommandHandler<ListEmployeesCommand> {
  constructor(@InjectModel(Employee.name) private employeeModel: Model<Employee>) {}

  async execute(command: ListEmployeesCommand): Promise<{ data: Employee[]; total: number }> {
    const { page, limit } = command.listEmployeesDto;
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.employeeModel.find().skip(skip).limit(limit).exec(),
      this.employeeModel.countDocuments(),
    ]);
    return { data, total };
  }
}
