
import { createClient } from 'redis';


const client = createClient();

client.on('connect', () => console.log('Redis Client connected'));


module.exports = client