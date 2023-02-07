import { Injectable } from "@nestjs/common";
import { UpdateCameraDto } from "./dto/update-camera.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Camera } from "./entities/camera.entity";
import mongoose from "mongoose";
import { startProbe } from "node-onvif-ts";
import * as onvif from "node-onvif-ts";
import * as Stream from "node-rtsp-stream";

@Injectable()
export class CameraService {
  constructor(
    @InjectModel(Camera.name) private cameraModel: mongoose.Model<Camera>
  ) {
  }

  /**
   * Fonction qui permet de detecter les cameras compatible sur le reseau
   */

  async detect() {
    startProbe().then((deviceInfoList) => {
      console.log("detecting camera ...");
      deviceInfoList.forEach((deviceInfo) => {
        this.cameraModel.findOne({ name: deviceInfo.name }, async (err, camera) => {
          if (err) {
            console.log("Erreur de detection de camera : " + err);
          }


          if (!camera) {
            let url;
            let streamUrl;

            let device = new onvif.OnvifDevice({
              xaddr: deviceInfo.xaddrs[0],
              user: "admin",
              pass: "admin"
            });

            await device.init().then((info) => {
              console.log("device info: ", info);
              url = device.getUdpStreamUrl();

              // const stream = new Stream({
              //   name: deviceInfo.name,
              //   streamUrl: url,
              //   wsPort: 9999,
              //   ffmpegOptions: {
              //     "-stats": "",
              //     "-r": 30
              //   }
              // });
              //
              // streamUrl = stream.url


              console.log("streamUrl : " + streamUrl);

            }).catch((error) => {
              console.log(error);
            }).then(() => {
              const camera = new this.cameraModel({
                urn: deviceInfo.urn,
                name: deviceInfo.name,
                hardware: deviceInfo.hardware,
                location: deviceInfo.location,
                ip: deviceInfo.xaddrs[0].split("/")[2].split(":")[0],
                typecam: deviceInfo.types[0],
                xaddrs: deviceInfo.xaddrs[0],
                username: "admin",
                password: "admin",
                url: url,
                streamUrl: streamUrl
              });
              camera.save();
            });
          }
        });
      });

      console.log("Ajout de la caméra detecté dans la base de donnée");

    });
    return `This action detect camera`;
  }

  async findAll() {
    return this.cameraModel.find();
  }

  findOne(id: string) {
    return `This action returns a #${id} camera`;
  }

  update(id: number, updateCameraDto: UpdateCameraDto) {
    return `This action updates a #${id} camera`;
  }

  remove(id: number) {
    return `This action removes a #${id} camera`;
  }
}
