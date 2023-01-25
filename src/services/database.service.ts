// External Dependencies
import * as mongoDB from 'mongodb'
import * as dotenv from 'dotenv'


// Global Variables
const DB_NAME: string = 'mongodb'
const CAM_COLLECTION_NAME: string = 'cameras'


export const collections: { camera?: mongoDB.Collection } = {}

// Initialize Connection
export async function connectToDatabase() {
    dotenv.config()

    const client: mongoDB.MongoClient = new mongoDB.MongoClient('mongodb://127.0.0.1:27017/camera')

    await client.connect()

    const db: mongoDB.Db = client.db(DB_NAME)

    const cameraCollection: mongoDB.Collection = db.collection(CAM_COLLECTION_NAME)

    collections.camera = cameraCollection

    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${cameraCollection.collectionName}`)
}