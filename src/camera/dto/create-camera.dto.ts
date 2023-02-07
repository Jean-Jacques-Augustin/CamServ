import { Prop } from "@nestjs/mongoose";

export class CreateCameraDto {
  readonly urn: string;
  readonly name: string;
  readonly hardware: string;
  readonly location: string;
  readonly typecam: string;
  readonly xaddrs: string;
  readonly addAt: Date;
  readonly updatedAt: Date;
}
