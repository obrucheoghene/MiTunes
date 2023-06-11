import { Song } from "@/types";
import getSongs from "./getSongs";
import { appwriteServerClientDatabases } from "@/libs/appwriteServer";
import { appwriteConfig } from "@/libs/configs";
import { Query } from "node-appwrite";
const getSongsByTitle = async (search: string):Promise<Song[]> => {
    const {databaseId, songsCollectionId} = appwriteConfig
    if (search.length == 0) {
        return getSongs()
    }
    try {
        const response = await appwriteServerClientDatabases.
        listDocuments(databaseId, songsCollectionId, [Query.search('title', search )]  )
        console.log(response.documents)
        if (response.documents.length) {
            const data = response.documents.map((item) => ({...item, id: item.$id})) 
            return data as any
        }
    } catch (error) {
        console.log(error)
    }
     return [];
}

export default getSongsByTitle;