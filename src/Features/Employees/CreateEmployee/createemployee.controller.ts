import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {CreateEmployeeDto} from "../../../Contracts/Employees/createemployee.dto";
import { CommandBus } from '@nestjs/cqrs';
import { CreateEmployeeCommand } from './createemployee.command';
import { Employee } from 'src/Domain/Employees/employee.schema';

@Controller('employees')
export class CreateEmployeeController {

    constructor(private commandBus: CommandBus){}
    
    @Post()
    async create(@Body() createEmployeeDto: CreateEmployeeDto) : Promise<Employee> {
        try
        {
           const employee : Employee = await this.commandBus.execute(new CreateEmployeeCommand(createEmployeeDto));
           return employee;
        }catch(e)
        {
        }
        
    }
}