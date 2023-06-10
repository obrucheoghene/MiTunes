"use client";

import SiginModal from "@/components/SigninModal";
import SignupModal from "@/components/SignupModal";
import UploadModal from "@/components/UploadModal";
import { useEffect, useState } from "react";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)
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
        </>
    )
}

export default ModalProvider;