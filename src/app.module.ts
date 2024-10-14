import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { CreateEmployeeController } from "./Features/Employees/CreateEmployee/createemployee.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { EmployeesModule } from "./Features/Employees/employees.module";
import { CommandBus, CqrsModule } from "@nestjs/cqrs";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/employeesdb"),
    EmployeesModule,
  ],
  providers: [AppService, CommandBus],
})
export class AppModule {}
