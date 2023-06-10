import { Song } from "@/types";
import usePlayer from "./usePlayer";

const useOnPlay = (songs: Song[]) => {
    const {setActiveSong, setPlayList} = usePlayer();

    const onPlay = (song: Song) => {

        setActiveSong(song);
        setPlayList(songs);
    }

    return onPlay;
}

export default useOnPlay