import { Song } from "@/types";
import { cookies} from "next/headers"
const getSongs = async ():Promise<Song[]> => {
    // const supabase = createServerComponentClient({
    //     cookies: cookies
    // })

    // const {data, error} = await supabase
    // .from('songs')
    // .select('*')
    // .order('created_at', {ascending: false});

    // if(error){
    //     console.log(error);
    // }

    // return (data as any) || [];
    return [];
}

export default getSongs;