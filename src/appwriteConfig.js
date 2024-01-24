import { Client } from 'appwrite';

const client = new Client()

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65b1472679f86fffd08e')


export default client