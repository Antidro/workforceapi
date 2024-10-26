import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { CreateEmployeeController } from "./Features/Employees/CreateEmployee/createemployee.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { EmployeesModule } from "./Features/Employees/employees.module";
import { CommandBus, CqrsModule } from "@nestjs/cqrs";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://veldfolds:1sIhlfo854dI2HZB@cluster0.abyauzc.mongodb.net/employees?retryWrites=true&w=majority"),
    EmployeesModule,
  ],
  providers: [AppService, CommandBus],
})
export class AppModule {}
