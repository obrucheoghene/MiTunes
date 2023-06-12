"use client";

import ForgotPasswordModal from "@/components/ForgotPasswordModal";
import RecoverPasswordModal from "@/components/RecoverPasswordModal";
import SendMagicLinkModal from "@/components/SendMagicLinkModal";
import SendMagicLink from "@/components/SendMagicLinkModal";
import SiginModal from "@/components/SigninModal";
import SignupModal from "@/components/SignupModal";
import UploadModal from "@/components/UploadModal";
import VerifyModal from "@/components/VerifyModal";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)
    const pathname = usePathname()
    useEffect(() => {
        setIsMounted(true);
    }, [])

    if(!isMounted) {
        return null;
    }

    return (
        <>
        <SiginModal/>
        <SignupModal/>
        <UploadModal/>
        <SendMagicLinkModal/>
        <ForgotPasswordModal/>
        {pathname.includes('/verify') && <VerifyModal/>}
        {pathname.includes('/recover-password') && <RecoverPasswordModal/>}
        
        </>
    )
}

export default ModalProvider;