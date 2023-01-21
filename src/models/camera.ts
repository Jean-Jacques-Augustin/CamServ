import mongoose from 'mongoose'

const cameraSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    ip: {
        type: String,
        required: true,
    },
    port: {
        type: Number,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

    webSocketPort: {
        type: Number,
        required: true,
    },
    rtsp: {
        type: String,
        required: true,
    },
})

export default mongoose.model('Camera', cameraSchema)