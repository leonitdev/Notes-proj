import { config } from 'dotenv';

config();

const mongoConnectionString: string = process.env.MONGO_CONNECTION_STRING;
const port: string = process.env.PORT;

export { mongoConnectionString, port };
