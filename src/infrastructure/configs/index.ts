import { config } from 'dotenv';

config();

const mongoConnectionString: string = process.env.MONGO_CONNECTION_STRING;
const port: string = process.env.PORT;
const baseUrl: string = process.env.BASE_URL;

export { mongoConnectionString, baseUrl, port };
