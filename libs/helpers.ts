import { appwriteConfig } from "./configs"


const {endpoint, project, songsBucketId, imagesBucketId } = appwriteConfig

export const getSongURL = (songId: string) => {
    return `${endpoint}/storage/buckets/${songsBucketId}/files/${songId}/view?project=${project}`;
}
export const getImageURL = (imageId: string) => {
    return `${endpoint}/storage/buckets/${imagesBucketId}/files/${imageId}/view?project=${project}`;
}