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
import { SubmitHandler, useForm } from "react-hook-form"
import Input from "@/components/Input"
import Button from "@/components/Button"


const AccountContent = () => {
    const  router = useRouter()
    const {user} = useUser();

    
    useEffect(() => {   
        if(!user) {
            router.replace('/');
            return;
        }
    },
     [ user, router])





  return (
    <div className=" flex flex-col gap-y-2 w-full p-6">
          <div>
          <div className="pb-1 ">
            Full name
          </div>
          <Input
            id="fullname"
            type="text"
            value={user?.fullname}
            readOnly
            placeholder="Your full name"
          />
        </div>
        <div>
          <div className="pb-1">
            Email address
          </div>
          <Input
            id="email"
            type="email"
            value={user?.email}
            readOnly
            placeholder="Your email address"
          />
        </div>
        
      
    </div>
  )
}

export default AccountContent