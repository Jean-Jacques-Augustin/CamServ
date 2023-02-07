import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema(
  { timestamps: true }
)

export class Camera {
  @Prop()
  urn: string;
  @Prop()
  name: string;
  @Prop()
  hardware: string;
  @Prop()
  location: string;
  @Prop()
  ip: string;
  @Prop()
  typecam: string;
  @Prop()
  xaddrs: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  url: string;


  @Prop({ type: Date, default: Date.now })
  addAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const CameraSchema = SchemaFactory.createForClass(Camera);
// Compare this snippet from src\camera\camera.service.ts:
