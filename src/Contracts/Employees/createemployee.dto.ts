import { ApiProperty } from "@nestjs/swagger";

export class CreateEmployeeDto {
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    phone: string;
    @ApiProperty()
    department: string;
    @ApiProperty()
    address: string;
}
