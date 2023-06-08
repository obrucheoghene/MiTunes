"use client"

import { useRouter } from "next/navigation"
import Modal from "./Modal"
import useAuthModal from "@/hooks/useAuthModal"
import { useEffect, useState } from "react"
import Input from "./Input"
import Button from "./Button"
import { AiFillGoogleCircle } from "react-icons/ai"

const AuthModal = () => {
  const router = useRouter();
  const {session} = {session: ''};
  const { onClose, isOpen} = useAuthModal()
  const [isLoading, setIsLoading] = useState(false)



   useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
   }, [session, router, onClose],)
  const onChange = (open: boolean) => {
    if (!open)
    {
      onClose(); 
    }
  }

  return (
    <Modal title="Welcome back" 
    description="Login to your account"
    isOpen={isOpen}
    onChange={onChange}>

<div className=" flex flex-col gap-y-6 mb-6">
<Button disabled={isLoading} type="submit" className=" bg-neutral-700 rounded-md text-white
gap-x-2 flex flex-row justify-center items-center">
        <AiFillGoogleCircle size={26}/> Sign in with Google
        </Button>
      
      <hr className=" border-neutral-700" />
</div>

     <form className=" flex flex-col gap-y-4">
     <div>
          <div className="pb-1 ">
          Full name
          </div>
          <Input 
          id="song"
          type="text"
          disabled={isLoading}
          placeholder="Your full name"
         
          />
        </div>

        <div>
          <div className="pb-1">
          Email address
          </div>
          <Input 
          id="song"
          type="text"
          disabled={isLoading}
          placeholder="Your email address"
         
          />
        </div>

        <div>
          <div className="pb-1">
          Password
          </div>
          <Input 
          id="song"
          type="text"
          disabled={isLoading}
          placeholder="Your password"
         
          />
        </div>

        <Button disabled={isLoading} type="submit" className=" rounded-md text-white">
          Sign up
        </Button>


     </form>

    </Modal>
  )
}

export default AuthModal