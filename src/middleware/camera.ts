

/*
* Generate camera stream
 */

import { Request, Response } from 'express';
import { spawn } from 'child_process';

export const camera = (req: Request, res: Response) => {
    const { ip, port, username, password, webSocketPort, rtsp } = req.body;

    const ffmpeg = spawn('ffmpeg', [
        '-i',
        `rtsp://${username}:${password}@${ip}:${port}/${rtsp}`,
        '-f',
        'mpegts',
        '-codec:v',
        'mpeg1video',
        '-s',
        '640x480',
        '-b:v',
        '800k',
        '-bf',
        '0',
        `http://localhost:${webSocketPort}/camerastream`,
    ]);
};

// Path: src\middleware\camera.ts