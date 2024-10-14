import { ListEmployeesDto } from "src/Contracts/Employees/listemployees.dto";

export class ListEmployeesCommand {
    constructor(public readonly listEmployeesDto: ListEmployeesDto) {}
}