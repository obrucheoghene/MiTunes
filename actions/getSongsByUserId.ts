
import { appwriteConfig } from "@/libs/configs";
import { Song } from "@/types";
import { useUser } from "@/hooks/useUser";
import { appwriteWebClient, appwriteWebClientAccount,  } from "@/libs/appwriteWeb";
const getSongsByUserId = async (): Promise<Song[]> => {
   

    try {
     
        const {databaseId, songsCollectionId} = appwriteConfig
        // const response = await appwriteServerClientDatabases.listDocuments(databaseId, songsCollectionId)
        // if (response.documents.length) {
        //     const data = response.documents.map((item) => ({...item, id: item.$id})) 
        //     return data as any
        // }
    } catch (error) {
        console.log(error)
    }
     return [];
}

export default getSongsByUserId;