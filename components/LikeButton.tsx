"use client"

import useSigninModal from "@/hooks/useSigninModal";
import { useUser } from "@/hooks/useUser";
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

    

    const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

    const handleLike = async () => {
    
    }

  return (
    <button onClick={handleLike}><Icon color={isLiked ? '#22c55e' :  'white'} size={25}/></button>
  )
}

export default LikeButton