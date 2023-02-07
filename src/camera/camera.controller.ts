import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { CameraService } from "./camera.service";
import { UpdateCameraDto } from "./dto/update-camera.dto";

@Controller("camera")
export class CameraController {
  constructor(private readonly cameraService: CameraService) {
  }

  @Get("/detect")
  detectCamera() {
    return this.cameraService.detect();
  }

  @Get()
  findAll() {
    return this.cameraService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.cameraService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCameraDto: UpdateCameraDto) {
    return this.cameraService.update(+id, updateCameraDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.cameraService.remove(+id);
  }
}
