import express, { Express } from 'express'
import * as onvif from 'onvif';


const App: Express = express()



// http: adresseip@port@username@password@webSocketPort@rtsp;


/**
 * @description: This is the main entry point of the application
 */
App.get('/', (req, res) => {

    onvif.Discovery.on('device', (camera: onvif.OnvifDevice) => {
        console.log(`Found camera: ${camera.hostname}`);
        camera.getStreamUri({protocol:'RTSP'}, (err, stream) => {
            console.log(stream.uri);
        });
    });
})


/**
 * @description: Listen to the port 3000
 */
App.listen(4000, () => {
    console.log('Server is running on port 3000')
})