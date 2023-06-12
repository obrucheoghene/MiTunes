"use client"

import { useRouter } from "next/navigation"
import Modal from "./Modal"
import { useEffect, useState } from "react"
import Input from "./Input"
import Button from "./Button"
import { AiFillGoogleCircle } from "react-icons/ai"
import { useForm, SubmitHandler } from "react-hook-form"
import useSignupModal from "@/hooks/useSignupModal"
import useSigninModal from "@/hooks/useSigninModal"
import { appwriteWebClientAccount } from "@/libs/appwriteWeb"
import { ID, } from "appwrite"
import { useUser } from "@/hooks/useUser"
import { Message } from "@/types"
import { APP_BASE_URL, appwriteConfig } from "@/libs/configs"

const SignupModal = () => {
  const router = useRouter();
  const { onClose, isOpen } = useSignupModal()
  const [isLoading, setIsLoading] = useState(false)
  const signinModal = useSigninModal()
  const { user } = useUser();
  const [message, setMessage] = useState<Message | null>(null);

  interface SignupFormValues {
    fullname: string,
    email: string,
    password: string
  }
  const { register, handleSubmit, reset, formState: { errors } } = useForm<SignupFormValues>({
    defaultValues: {
      fullname: '',
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<SignupFormValues> = async (values) => {
    setMessage(null);
    setIsLoading(true);
    try {
      await appwriteWebClientAccount.create(
        ID.unique(),
        values.email,
        values.password,
        values.fullname
      )
      await appwriteWebClientAccount.createEmailSession(values.email,
        values.password)
      const verificationURL = `${APP_BASE_URL}/verify`;
      await appwriteWebClientAccount.createVerification(verificationURL)
      appwriteWebClientAccount.deleteSession('current');
      setMessage({ success: 'Check your email for the confirmation link' })
      reset();
    } catch (error) {
      setMessage({ error: (error as Error)?.message })
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    if (user) {
      router.refresh();
      onClose();
    }
  }, [user, router, onClose],)
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  }

  const openSigninModal = () => {
    onClose()
    signinModal.onOpen()
  }

  const handleSignInWithGoogle = async () =>{
    console.log('Gorly')
      try {
        await appwriteWebClientAccount.createOAuth2Session('google', APP_BASE_URL, `${APP_BASE_URL}/failure`)
      } catch (error) {
        console.log(error)
      }
  }


  return (
    <Modal title="Welcome!"
      description="Sign up to your account"
      isOpen={isOpen}
      onChange={onChange}>

      <div className=" flex flex-col gap-y-6 mb-6">
        <Button onClick={handleSignInWithGoogle} disabled={isLoading} type="submit" className=" bg-neutral-700 rounded-md text-white
gap-x-2 flex flex-row justify-center items-center">
          <AiFillGoogleCircle size={26} /> Sign in with Google
        </Button>

        <hr className=" border-neutral-700" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-y-4">
        <div>
          <div className="pb-1 ">
            Full name
          </div>
          <Input
            id="fullname"
            type="text"
            disabled={isLoading}
            placeholder="Your full name"
            {...register("fullname", { required: true })}
          />
          {errors?.fullname && <span className="text-red-600">Fullname is required</span>}
        </div>

        <div>
          <div className="pb-1">
            Email address
          </div>
          <Input
            id="email"
            type="email"
            disabled={isLoading}
            placeholder="Your email address"
            {...register("email", { required: true })}
          />
          {errors?.email && <span className="text-red-600">Email is required</span>}
        </div>

        <div>
          <div className="pb-1">
            Password
          </div>
          <Input
            id="password"
            type="password"
            disabled={isLoading}
            placeholder="Your password"
            {...register("password", { required: true })}
          />
          {errors?.password && <span className="text-red-600">Password is required</span>}
        </div>

        <Button disabled={isLoading} type="submit" className=" rounded-md text-white">
          {isLoading ? 'Signing up...' : 'Sign up'}
        </Button>



      </form>

      <div className="flex flex-col justify-content items-center mt-4 gap-y-2 text-sm pb-2">
        <p onClick={openSigninModal} className="text-neutral-500 underline hover:text-neutral-600 cursor-pointer">Already have and account? Sign in</p>
      </div>

      {message?.error && <p className="text-red-600 text-center">{message.error}</p>}
      {message?.success && <p className="text-center">{message.success}</p>}

    </Modal>
  )
}

export default SignupModal