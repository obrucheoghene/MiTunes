"use client";

import { Song } from "@/types"
import Image from "next/image";
import PlayButton from "./PlayButton";

interface SongItemProps {
    song: Song
    onClick: (song: Song) => void
}
const SongItem: React.FC<SongItemProps> = ({song, onClick}) => {
  return (
    <div onClick={() => onClick(song)} className="relative
    group flex flex-col items-center justify-center rounded-md
    overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer
    hover:bg-neutral-400/10 transition p-3">
        <div className=" relative aspect-square w-full
        h-full rounded-md overflow-hidden">
            <Image className="object-cover" 
            src={song.imagePath || 'images/liked.png'} alt="Song image" fill/>
        </div>
        <div className=" flex flex-col items-start w-full pt-4 gap-y-1">
            <p className=" font-semibold truncate w-full">{song.title}</p>
            <p className="text-neutral-400 text-sm pb-4 w-full">By {song.author}</p>
        </div>
        
        <div className="absolute bottom-24 right-5">
            <PlayButton/></div>
    </div>

  )
}

export default SongItem