"use client"

import { useRouter } from "next/navigation"
import Modal from "./Modal"
import { useEffect, useState } from "react"
import Input from "./Input"
import Button from "./Button"
import { useForm, SubmitHandler } from "react-hook-form"
import useSigninModal from "@/hooks/useSigninModal"
import { useUser } from "@/hooks/useUser"
import { Message } from "@/types"
import { appwriteWebClientAccount } from "@/libs/appwriteWeb"
import { ID } from "appwrite"
import useSendMagicLinkModal from "@/hooks/useSendMagicLinkModal"
import { APP_BASE_URL } from "@/libs/configs"

const SendMagicLinkModal = () => {
  const router = useRouter();
  const { onClose, isOpen } = useSendMagicLinkModal()
  const signinModal = useSigninModal()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<Message | null>(null);

  const { user, setCurrentUser} = useUser()

  interface MagicLinkFormValues {
    email: string,
  }

  const { register, handleSubmit, reset, formState: {errors} } = useForm<MagicLinkFormValues>({
    defaultValues: {
      email: '',
    }
  })

  const onSubmit: SubmitHandler<MagicLinkFormValues> = async (values) => {
    setIsLoading(true);
    setMessage(null);
   try {
    const magicLoginUrl = `${APP_BASE_URL}/magic-login`
    await appwriteWebClientAccount.createMagicURLSession(ID.unique(), values.email, magicLoginUrl );
    setMessage({ success: 'Check your email for the magic link'  })

   } catch (error) {
    console.log(error);
    setMessage({ error: (error as Error)?.message })
   }finally{
    setIsLoading(false)
   }
    
  }

  useEffect(() => {
    if (user) {
      router.refresh();
      reset()
      onClose();
    }
  }, [user, router, reset, onClose])

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  }

  const openSigninModal = () => {
    onClose()
    signinModal.onOpen()
}

  return (
    <Modal title="Welcome back"
      description="Sign in your account"
      isOpen={isOpen}
      onChange={onChange}>

      <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-y-4">

        <div>
          <div className="pb-1">
            Email address
          </div>
          <Input
            id="email"
            type="email"
            disabled={isLoading}
            placeholder="Your email address"
            {...register("email", {required: true})}
          />
          {errors?.email && <span className="text-red-600">Email is required</span>}
        </div>


        <Button disabled={isLoading} type="submit" className=" rounded-md text-white">
          {isLoading ? 'Sending Magic Link' : 'Send Magic Link'}
        </Button>



      </form>

      <div className="flex flex-col justify-content items-center mt-4 gap-y-2 text-sm pb-2">
        <p onClick={openSigninModal} className="text-neutral-500 underline hover:text-neutral-600 cursor-pointer">Already have an account? Sign in</p>
      </div>

      { message?.error && <p className="text-red-600 text-center">{message.error}</p>}
      {message?.success && <p className="text-center">{message.success}</p>}

    </Modal>
  )
}

export default SendMagicLinkModal