
export interface Song {
    id: string;
    user_id: string;
    author: string;
    title: string;
    songPath: string;
    imagePath: string;
}
export interface UserDetails {
    id: string;
    email: string
    isVerified: boolean;
    fullname?: string;
    avatarUrl?: string;
}

export interface Message {
    error?: string | null,
    success?: string | null
}