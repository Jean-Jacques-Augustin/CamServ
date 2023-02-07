import { Module } from "@nestjs/common";
import { CameraService } from "./camera.service";
import { CameraController } from "./camera.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { CameraSchema } from "./entities/camera.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Camera", schema: CameraSchema }
    ])
  ],
  controllers: [CameraController],
  providers: [CameraService]
})
export class CameraModule {
}
