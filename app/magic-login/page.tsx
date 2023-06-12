"use client"
import Header from '@/components/Header';
import { useUser } from '@/hooks/useUser';
import { appwriteWebClientAccount } from '@/libs/appwriteWeb';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

export default async function MagicLogin() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const {user, setCurrentUser} = useUser();
    const userId = searchParams.get("userId");
    const secret = searchParams.get("secret");
    
    useEffect(() => {
        if (!userId || !secret) {
            return;
        }
        const updateMagingSession = async () => {
            try {
                console.log(userId, secret)
                await appwriteWebClientAccount.updateMagicURLSession(userId, secret);
                setCurrentUser();
                toast.success('Signed in')
                router.replace('/');
            } catch (error) {
                console.log(error);
            }
        }
        updateMagingSession()
    }, [router, secret, userId, setCurrentUser])

    if (!userId || !secret) {
        router.replace('/');
        return;
    }

  

    return (
        <div className=" bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
            <Header>
            </Header>
        </div>
    )
}

