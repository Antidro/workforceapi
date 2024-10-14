import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type EmployeeDocument = HydratedDocument<Employee>;

@Schema()
export class Employee {
    @Prop()
    firstName: string;
    @Prop()
    lastName: string;
    @Prop()
    email: string;
    @Prop()
    phone: string;
    @Prop()
    department: string;
    @Prop()
    address: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);