import { Client, Databases } from 'node-appwrite'
import { appwriteConfig } from './configs';

const {endpoint, project, apiKey} = appwriteConfig;
const appwriteServerClient = new Client()
    .setEndpoint(endpoint)
    .setProject(project)
    .setKey(apiKey)

const appwriteServerClientDatabases = new Databases(appwriteServerClient);

export {appwriteServerClient, appwriteServerClientDatabases}