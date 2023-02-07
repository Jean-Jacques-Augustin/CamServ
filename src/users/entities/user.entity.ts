import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum Role {
  ADMIN = "admin",
  PROPRIO = "proprio",
  USER = "user",
}

export enum Status {
  ACTIVE = "active",
  INACTIVE = "inactive",
  SUSPENDED = "suspended",
}

@Schema({
  timestamps: true
})
export class User {
  /**
   * name, email, adresse, phone, password,role, status, createdAt, updatedAt
   */

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  address: string;

  @Prop()
  phone: number;

  @Prop()
  password: string;

  @Prop({ enum: Role, default: Role.USER })
  role: Role;

  @Prop({ enum: Status, default: Status.INACTIVE })
  status: Status;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
