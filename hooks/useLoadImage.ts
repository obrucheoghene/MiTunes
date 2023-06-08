import {Song} from  "@/types"

const useLoadImage = (song: Song) => {

    if (!song) {
        return null;
    }
    // const {data: imageData} = supabaseClient
    // .storage
    // .from('images')
    // .getPublicUrl(song.image_path);
    return 'imageData.publicUrl'

}

export default useLoadImage;