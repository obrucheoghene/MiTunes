export const appwriteConfig = {
    endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string,
    project: process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string,
    apiKey: process.env.APPWRITE_API_KEYS as string,
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
    songsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_SONGS_COLLECTION_ID as string,
    likedSongsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_LIKEDSONGS_COLLECTION_ID as string,
    songsBucketId: process.env.NEXT_PUBLIC_APPWRITE_SONGS_BUCKET_ID as string,
    imagesBucketId: process.env.NEXT_PUBLIC_APPWRITE_IMAGES_BUCKET_ID as string,
}

export const APP_BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL as string;