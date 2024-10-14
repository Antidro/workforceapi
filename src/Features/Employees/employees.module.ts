import { Module } from "@nestjs/common";
import { CreateEmployeeController } from "./CreateEmployee/createemployee.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { CommandBus, CqrsModule } from "@nestjs/cqrs";
import { CreateEmployeeHandler } from "./CreateEmployee/createemployee.handler";
import { Employee, EmployeeSchema } from "src/Domain/Employees/employee.schema";
import { ListEmployeesHandler } from "./ListEmployees/listemployees.handler";
import { ListEmployeesController } from "./ListEmployees/listemployees.controller";

@Module({
    imports: [
      MongooseModule.forFeature([{ name: Employee.name, schema: EmployeeSchema }]),
      CqrsModule,
    ],
    providers: [CreateEmployeeHandler, ListEmployeesHandler],
    controllers: [CreateEmployeeController, ListEmployeesController],
  })

export class EmployeesModule { }