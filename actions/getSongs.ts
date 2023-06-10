import { appwriteServerClientDatabases } from "@/libs/appwriteServer";
import { appwriteConfig } from "@/libs/configs";
import { Song } from "@/types";
const getSongs = async (): Promise<Song[]> => {
    const {databaseId, songsCollectionId} = appwriteConfig

    try {
        const response = await appwriteServerClientDatabases.listDocuments(databaseId, songsCollectionId, )
        if (response.documents.length) {
            const data = response.documents.map((item) => ({...item, id: item.$id})) 
            return data as any
        }
    } catch (error) {
        console.log(error)
    }
     return [];
}

export default getSongs;