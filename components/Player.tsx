"use client"

import usePlayer from "@/hooks/usePlayer"
import PlayerContent from "./PlayerContent"

const Player = () => {

    const {activeSong} = usePlayer()

    if(!activeSong){
        return null;
    }
  return (
    <div className=" fixed bottom-0 bg-black w-full 
    py-2 h-[80px] px-4">
      <PlayerContent     
      key={activeSong.id}
      song={activeSong}
      />
    </div>
  )
}

export default Player