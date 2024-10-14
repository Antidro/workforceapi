import { CreateEmployeeDto } from "src/Contracts/Employees/createemployee.dto";

export class CreateEmployeeCommand {
    constructor(public readonly createEmployeeDto: CreateEmployeeDto) {}    
}