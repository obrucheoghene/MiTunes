import { Song } from "@/types";
import getSongs from "./getSongs";
import { appwriteServerClientDatabases } from "@/libs/appwriteServer";
import { appwriteConfig } from "@/libs/configs";
import { Query } from "node-appwrite";
const getSongsByTitle = async (searchText: string):Promise<Song[]> => {
    const {databaseId, songsCollectionId} = appwriteConfig
    if (!searchText) {
        return getSongs()
    }
    try {
        const response = await appwriteServerClientDatabases.
        listDocuments(databaseId, songsCollectionId )
        if (response.documents.length) {
            const regex = new RegExp(searchText, 'i')
            const searchResult = response.documents.filter((song: Record<string, any>) =>  regex.test(song.title) || regex.test(song.author));
            const data = searchResult.map((item) => ({...item, id: item.$id})) 
            return data as any
        }
    } catch (error) {
        console.log(error)
    }
     return [];
}

export default getSongsByTitle;