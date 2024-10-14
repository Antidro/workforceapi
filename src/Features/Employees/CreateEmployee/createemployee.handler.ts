import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateEmployeeCommand } from "./createemployee.command";
import { Employee, EmployeeDocument } from "src/Domain/Employees/employee.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@CommandHandler(CreateEmployeeCommand)
export class CreateEmployeeHandler implements ICommandHandler<CreateEmployeeCommand> {

    constructor(@InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>){}
    async execute(command: CreateEmployeeCommand) : Promise<Employee> {

        const employee = new this.employeeModel(command.createEmployeeDto);
        return await employee.save();
    }
}