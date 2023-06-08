import { Song } from "@/types";

const useLoadSongUrl =  (song: Song) => {

    if (!song) {
        return '';
    }

    // const {data: songData} = supabaseClient
    // .storage
    // .from('songs')
    // .getPublicUrl(song.song_path);

    return '';

}

export default useLoadSongUrl;