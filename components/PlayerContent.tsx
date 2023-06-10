"use client";

import { Song } from "@/types";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import {HiSpeakerXMark, HiSpeakerWave} from "react-icons/hi2"
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";
import useSound from "use-sound"
import { useEffect, useState } from "react";
interface PlayerContentProps {
    song: Song;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song: activeSong }) => {
    const {playList, setPlayList, setActiveSong} = usePlayer();
    const [volume, setVolume] = useState(1)
    const [isPlaying, setIsPlaying] = useState(false)
    const PlayIcon = isPlaying ? BsPauseFill : BsPlayFill;
    const VolumeIcon = volume === 0 ?  HiSpeakerXMark : HiSpeakerWave;
    const onPlayNext = () => {
        if (playList.length === 0) {
            return;
        }

        const currentIndex = playList.findIndex((song) => song.id === activeSong.id);

        const nextSong = playList[currentIndex + 1];

        if(!nextSong) {
            return setActiveSong(playList[0]);
        }

        setActiveSong(nextSong);
    }
    const onPlayPrevious = () => {
        if (playList.length === 0) {
            return;
        }

        const currentIndex = playList.findIndex((song) => song.id === activeSong.id);

        const previousSong = playList[currentIndex - 1];

        if(!previousSong) {
            return setActiveSong(playList[playList.length - 1]);
        }

        setActiveSong(previousSong);
    }

    const [play, {pause, sound}] = useSound(activeSong.songPath, 
        {volume: volume,
        onplay: () => setIsPlaying(true),
        onend: () => {
            setIsPlaying(false);
            onPlayNext();
        },
        onpause: () => setIsPlaying(false),
        format: ["mp3"]
    })

    useEffect(() => {
        sound?.play();
        return () => {
            sound?.unload();
        }
    }, [sound])

    const handlePlay = () => {
        if (isPlaying) {
            pause();
        }else{
            play();
        }
    }

    const toggleMute = () => {
        if (volume === 0) {
            setVolume(1);
        }else {
            setVolume(0);
        }
    }
    return (
        <div className=" grid grid-cols-2 md:grid-cols-3 h-full">
            <div className="flex w-full justify-start">
                <div className="flex item-center gap-x-4">
                    <MediaItem data={activeSong} />
                    <LikeButton songId={activeSong.id} />
                </div>
            </div>

            <div className="flex md:hidden col-auto w-full justify-end items-center">
                <div
                    onClick={handlePlay}
                    className="h-10 w-10 flex items-center
                justify-center rounded-full bg-white p-1 cursor-pointer"
                >
                    <PlayIcon size={30} className="text-black" />
                </div>
            </div>
            <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
                <AiFillStepBackward onClick={onPlayPrevious} size={30} className="text-neutral-400
                cursor-pointer hover:text-white transition"/>

                <div onClick={handlePlay} 
                className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer">
                    <PlayIcon size={30} className="text-black"/>
                </div>
                <AiFillStepForward onClick={onPlayNext} size={30} className="text-neutral-400
                cursor-pointer hover:text-white transition"/>
            </div>
            <div className="hidden md:flex w-full justify-end pr-2">
                <div className="flex items-center gap-x-2 w-[120px]">
                <VolumeIcon onClick={toggleMute} className="cursor-pointer" size={34}/>
                <Slider value={volume} onChange={(value) => setVolume(value)} />
                </div>      
            </div>
        </div>
    );
};

export default PlayerContent;
