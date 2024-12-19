import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {CreateEmployeeDto} from "../../../Contracts/Employees/createemployee.dto";
import { CommandBus } from '@nestjs/cqrs';
import { CreateEmployeeCommand } from './createemployee.command';
import { Employee } from 'src/Domain/Employees/employee.schema';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Employees')
@Controller('employees')
export class CreateEmployeeController {

    constructor(private commandBus: CommandBus){}
    
    @Post()
    @ApiOperation({ summary: 'Create a new employee' }) // Summary of the operation
    @ApiBody({ type: CreateEmployeeDto }) // Define the body of the request
    @ApiResponse({ status: 201, description: 'The employee has been successfully created.' }) // Successful response
    @ApiResponse({ status: 400, description: 'Bad Request.' }) // Error response

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