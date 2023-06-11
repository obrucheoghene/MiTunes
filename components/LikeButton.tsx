"use client"

import useSigninModal from "@/hooks/useSigninModal";
import { useUser } from "@/hooks/useUser";
import { appwriteWebClientDatabases } from "@/libs/appwriteWeb";
import { appwriteConfig } from "@/libs/configs";
import { ID, Query } from "appwrite";
import { error } from "console";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";


interface LikeButtonProps {
    songId: string;
}
const LikeButton: React.FC<LikeButtonProps> = ({songId}) => {
    const router = useRouter();

    const signinModal = useSigninModal();

    const {user} = useUser();
    const [isLiked, setIsLiked] = useState(false);
    const [likedSongId, setLikedSongId] = useState<string | null>(null);
    const {databaseId, likedSongsCollectionId} = appwriteConfig
  
    const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

    useEffect(() => {
      if(!user){
        return;
      }
       const fetchData = async () => {
        try {
          const response = await appwriteWebClientDatabases
          .listDocuments(databaseId, likedSongsCollectionId, [Query.equal('userId',user.id ), 
          Query.equal('songId',songId )])

            if (response.documents.length === 1) {
                setLikedSongId(response.documents[0].$id)
                setIsLiked(true);
            }
      
        } catch (error) {
          console.log(error);
        }
       }

       fetchData();

    }, [user, databaseId, likedSongsCollectionId, songId])

    const handleLike = async () => {
      if (!user) {
        return signinModal.onOpen();
      }
      try {
       if(isLiked && likedSongId) {
        await appwriteWebClientDatabases.deleteDocument(databaseId, likedSongsCollectionId, likedSongId)
        setIsLiked(false)
        toast.success('Unliked song')
       }else {
        await appwriteWebClientDatabases
        .createDocument(databaseId, likedSongsCollectionId, ID.unique(), {
          userId: user.id,
          songId: songId
        });
        setIsLiked(true)
        toast.success('Liked song')
       }
      } catch (error) {
        console.log(error)
      }

    
    }

  return (
    <button onClick={handleLike}><Icon color={isLiked ? '#22c55e' :  'white'} size={25}/></button>
  )
}

export default LikeButton