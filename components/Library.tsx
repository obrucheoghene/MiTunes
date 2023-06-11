"use client";
import {TbPlaylist} from 'react-icons/tb'
import {AiOutlinePlus} from 'react-icons/ai'
import { useUser } from '@/hooks/useUser';
import useUploadModal from '@/hooks/useUploadModal';
import { Song } from '@/types';
import MediaItem from './MediaItem';
import useOnPlay from '@/hooks/useOnPlay';
import useSigninModal from '@/hooks/useSigninModal';
import { useEffect, useState } from 'react';
import { appwriteWebClientDatabases } from '@/libs/appwriteWeb';
import { appwriteConfig } from '@/libs/configs';
import { Query } from 'appwrite';


const Library = () => {
    const {user} = useUser()
    const uploadModal = useUploadModal();
    const signinModal = useSigninModal()
    const {databaseId, songsCollectionId} = appwriteConfig
    const  [userSongs, setUserSongs] = useState<Song[]>([]);
    const  onPlay = useOnPlay(userSongs)

    const onClick = () => {
        if(!user) {
            return signinModal.onOpen();
        }
        return uploadModal.onOpen();
    }

    useEffect(() => {
        const getSongsByUserId = async () => {
            if (!user){
                setUserSongs([])
                return
            }
            const response = await appwriteWebClientDatabases
            .listDocuments(databaseId, songsCollectionId, [Query.equal('userId', [user.id]), Query.orderDesc('$createdAt')])
            if (response.documents.length) {
                const data = response.documents.map((item) => ({...item, id: item.$id})) 
                setUserSongs(data as any)
            }else{
                setUserSongs([])
            }
        }
        getSongsByUserId();
    }, [databaseId, songsCollectionId, user])



  return (
    <div className=" flex flex-col">
        <div className=" flex items-center justify-between px-5 pt-4">
            <div className=" inline-flex item-center gap-x-2">
                <TbPlaylist size={26} className=' text-neutral-400'/>
                <p className=' text-neutral-400 font-medium text-md'>Your libray</p>
            </div>

            <AiOutlinePlus onClick={onClick}
            size={20}
            className='text-neutral-400 cursor-pointer hover:text-white transition'/>
            
        </div>
        <div className=' flex flex-col gap-y-2 mt-4 px-3'>
                {
                    userSongs.map((song) => (
                       <MediaItem onClick={(song: Song) => onPlay(song)}
                       key={song.id}
                       data={song}
                       />
                    ))
                }
        </div>
    </div>
  )
}

export default Library