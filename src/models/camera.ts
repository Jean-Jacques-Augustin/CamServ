import { ObjectId } from 'mongodb'
import * as url from 'url'


export interface CameraInterface {
    urn: string;
    name: string;
    hardware: string;
    location: string;
    typecam: string;
    xaddrs: string;
}

export class Camera {
    constructor(
        public urn: string,
        public name: string,
        public hardware: string,
        public location: string,
        public typecam: string,
        public xaddrs: string,
    ) {

    }
}