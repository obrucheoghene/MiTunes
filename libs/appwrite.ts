import { Client, Databases, Account } from "appwrite";

const appwriteClient = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string)
const account = new Account(appwriteClient);
const database = new Databases(appwriteClient)


export  {appwriteClient , account, database};