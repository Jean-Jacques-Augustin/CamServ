import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { CameraModule } from './camera/camera.module';
import * as process from "process";

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env"
    }),
    MongooseModule.forRoot("mongodb://127.0.0.1:27017/camera"),
    CameraModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
