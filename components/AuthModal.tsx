"use client"

import { useRouter } from "next/navigation"
import Modal from "./Modal"
import useAuthModal from "@/hooks/useAuthModal"
import { useEffect, useState } from "react"
import Input from "./Input"
import Button from "./Button"
import { AiFillGoogleCircle } from "react-icons/ai"
import { FieldValues, useForm, SubmitHandler } from "react-hook-form"

const AuthModal = () => {
  const router = useRouter();
  const { session } = { session: '' };
  const { onClose, isOpen } = useAuthModal()
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: {errors} } = useForm<FieldValues>({
    defaultValues: {
      fullname: '',
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (values) => console.log(values);


  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose],)
  const onChange = (open: boolean) => {
    if (!open) {
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
            {...register("fullname", {required: true})}
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
            {...register("email", {required: true})}
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
          {...register("password", {required: true})}
          />
          {errors?.password && <span className="text-red-600">Password is required</span>}
        </div>

        <Button disabled={isLoading} type="submit" className=" rounded-md text-white">
          Sign up
        </Button>



      </form>

      <div className=" flex flex-col justify-content items-center mt-4 gap-y-2 ">
        <p className="text-neutral-500 underline hover:text-neutral-600 cursor-pointer">Send magic link</p>
        <p className="text-neutral-500 underline hover:text-neutral-600 cursor-pointer">Forgot your password?</p>
        <p className="text-neutral-500 underline hover:text-neutral-600 cursor-pointer">Already have and account? Sign in</p>
      </div>

    </Modal>
  )
}

export default AuthModal