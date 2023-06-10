import { Song } from "@/types";
import useAuthModal from "./useAuthModal";
import usePlayer from "./usePlayer";
import { useUser } from "./useUser";

const useOnPlay = (songs: Song[]) => {
    const {setActiveSong, setPlayList} = usePlayer();
    const authModal = useAuthModal();
    const {user} = useUser();

    const onPlay = (song: Song) => {
        if (!user) {
            return authModal.onOpen();
        }
        setActiveSong(song);
        setPlayList(songs);
    }

    return onPlay;
}

export default useOnPlay