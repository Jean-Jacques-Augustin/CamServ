// External Dependencies
import express, { Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { collections } from '../services/database.service'
import { Camera, CameraInterface } from '../models/camera'
import { startProbe } from 'node-onvif-ts'
import * as onvif from 'node-onvif-ts'


// Global Config
export const camRouter = express.Router()

camRouter.use(express.json())



// Get all streams links
camRouter.get('/', async (req: Request, res: Response) => {
    let cameras
    let camerasLink: string[] = []

    try {
        cameras = await collections.camera?.find().toArray()
        console.log(cameras)
        // Array of cameras
    } catch (error) {
        res.status(500).send(
            'An unexpected error occurred while retrieving the caméra.',
        )
    }

    cameras?.forEach((item) => {
        let device = new onvif.OnvifDevice({
            xaddr: item.xaddrs,
            user: 'admin',
            pass: 'admin',
        })
        device.init().then(() => {
            // Get the UDP stream URL
            let url = device.getUdpStreamUrl()
            camerasLink.push(url)
            console.log(url)
        }).catch((error) => {
            console.error(error)
        })
    })

     res.send(camerasLink)
})


// Detect cameras on the network and add them to the db
camRouter.get('/cameras', async (req: Request, res: Response) => {
    startProbe().then((deviceInfoList) => {
        console.log(deviceInfoList.length + ' devices were found.')
        // Show the device name and the URL of the end point.
        deviceInfoList.forEach((info) => {

            // find camera in the db by xaaddrs
            collections.camera?.findOne({ xaddrs: info.xaddrs[0] }).then((result) => {
                if (result) {
                    // camera already in the db
                    console.log('Camera already in the db')
                } else {
                    // camera not in the db
                    const camera = new Camera(
                        info.urn,
                        info.name,
                        info.hardware,
                        info.location,
                        info.types[0],
                        info.xaddrs[0],
                    )

                    collections.camera?.insertOne(camera).then((result) => {
                        console.log('Camera added to the db')
                    }).catch((error) => {
                        console.log(error)
                    })
                }
            }).catch((error) => {
                    console.log(error)
                },
            )
        })
    })
})


// PUT

// DELETE