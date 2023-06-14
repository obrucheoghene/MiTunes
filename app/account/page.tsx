import getLikedSongs from "@/actions/getLikeSongs";
import Header from "@/components/Header";
import Image from "next/image";
import AccountContent from "./components/AccountContent";

export const revalidate = 0;

export default async function Account () {
    return (
        <div className="bg-neutral-900
    rounded-lg h-full w-full overflow-hidden
    overflow-y-auto">
            <Header>
                <div className="mt-20">
                    <div className="flex flex-col
                md:flex-row
                items-center
                gap-x-5">

                        <div className=" relative h-32 w-32 lg:h-44 lg:w-44">
                            <Image fill alt="Playlist" className="object-cover" src={"/images/avatar.png"} />
                        </div>
                        <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
                           
                            <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold">
                                Account Settings
                            </h1>

                        </div>
                    </div>
                </div>
            </Header>

            <div>
                
            </div>

            <AccountContent />
        </div>
    )
}

