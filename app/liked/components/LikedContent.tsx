"use client"

import { useRouter } from "next/navigation"

import { Song } from "@/types"
import { useEffect, useState } from "react"
import { useUser } from "@/hooks/useUser"
import MediaItem from "@/components/MediaItem"
import LikeButton from "@/components/LikeButton"
import useOnPlay from "@/hooks/useOnPlay"
import { appwriteWebClientDatabases } from "@/libs/appwriteWeb"
import { appwriteConfig } from "@/libs/configs"
import { Query } from "appwrite"


const LikedContent = () => {
    const  router = useRouter()
    const {user} = useUser();
    const [likeSongs, setLikeSongs] = useState<Song[]>([])
    const onPlay = useOnPlay(likeSongs)
    const {databaseId, songsCollectionId, likedSongsCollectionId} = appwriteConfig

    const handleSetLikeSongs  = (data: any[]) => {
            const songs = data.map((item) => ({...item, id: item.$id})) 
            setLikeSongs(songs)
    }   
    useEffect(() => {   
        if(!user) {
            router.replace('/');
            return;
        }

        const fetchData = async () => {
            try {
              const likedSongRelationshipResponse = await appwriteWebClientDatabases
              .listDocuments(databaseId, likedSongsCollectionId, [Query.equal('userId',user.id )])
    
                if (likedSongRelationshipResponse.documents.length) {
                    console.log(likedSongRelationshipResponse.documents)
                    const likeSongIds = likedSongRelationshipResponse.documents.map((item) => (item.songId));

                    const findLikedSong = await appwriteWebClientDatabases
                    .listDocuments(databaseId, songsCollectionId, [Query.equal('$id', likeSongIds )])
                    handleSetLikeSongs(findLikedSong.documents)
                }
          
            } catch (error) {
              console.log(error);
            }
           }
    
           fetchData();
    
    },
     [ user, router, databaseId, likedSongsCollectionId])

     if (likeSongs.length === 0 ) {
        return ( <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
            No liked songs
        </div>)
     }
  return (
    <div className=" flex flex-col gap-y-2 w-full p-6">
        {likeSongs.map((song)=> (
            <div key={song.id} className="flex items-center 
            gap-x-4 w-full">
                <div className="flex-1"> 
                    <MediaItem onClick={(song: Song) => onPlay(song)} data={song} />
                </div>
                <LikeButton songId={song.id} />
            </div>
        ))}
    </div>
  )
}

export default LikedContent