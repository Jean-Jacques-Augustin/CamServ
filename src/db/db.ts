import * as mongoose from 'mongoose';

export const databaseProviders = [
    {
        provide: 'DbConnectionToken',
        useFactory: async (): Promise<typeof mongoose> =>
            await mongoose.connect('mongodb://localhost/nest'),
        throwIfMissing: true,
    },
];


const connect = async () => {
    await mongoose.connect('mongodb://localhost/nest');
    console.log('connected to database');
}

export default connect;
