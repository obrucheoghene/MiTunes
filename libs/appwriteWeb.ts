import { Client, Databases, Account, Storage } from "appwrite";
import { appwriteConfig } from "./configs";

const {endpoint, project} = appwriteConfig;
const appwriteWebClient = new Client()
    .setEndpoint(endpoint)
    .setProject(project)

const appwriteWebClientAccount = new Account(appwriteWebClient);
const appwriteWebClientDatabases = new Databases(appwriteWebClient)
const appwriteWebClientStorage = new Storage(appwriteWebClient)


export  {
    appwriteWebClient, 
    appwriteWebClientAccount, 
    appwriteWebClientDatabases, 
    appwriteWebClientStorage
};