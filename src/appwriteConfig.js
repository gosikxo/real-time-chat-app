import { Client, Databases } from 'appwrite';

export const PROJECT_ID = '65b1472679f86fffd08e'
export const DATABASE_ID = '65b156248d8cb81e8c48'
export const COLLECTION_ID = '65b1563e92d875c82b7e'

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65b1472679f86fffd08e')

export const databases = new Databases(client);

export default client