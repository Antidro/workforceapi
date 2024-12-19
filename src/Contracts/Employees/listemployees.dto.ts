import { ApiProperty } from "@nestjs/swagger";


export class ListEmployeesDto {
    @ApiProperty()
    page: number = 1; // default page number
    @ApiProperty()
    limit: number = 10; // default number of items per page
  }
  