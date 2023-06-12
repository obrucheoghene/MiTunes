"use client"

import { useRouter, useSearchParams } from "next/navigation"
import Modal from "./Modal"
import { useEffect, useState } from "react"
import Input from "./Input"
import Button from "./Button"
import { useForm, SubmitHandler } from "react-hook-form"

import { useUser } from "@/hooks/useUser"
import { Message } from "@/types"
import { appwriteWebClientAccount } from "@/libs/appwriteWeb"
import { toast } from "react-hot-toast"


const VerifyModal = () => {
    const router = useRouter();
    const searchParams = useSearchParams()
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState<Message | null>(null);
    const { user, setCurrentUser } = useUser()

    const userId = searchParams.get('userId');
    const secret = searchParams.get('secret');
    const { register, handleSubmit, reset, formState: { errors } } = useForm<VerifyFormValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    if (!userId || !secret) {
        return router.replace('/');
    }

    interface VerifyFormValues {
        email: string,
        password: string
    }

    const onSubmit: SubmitHandler<VerifyFormValues> = async (values) => {
        setIsLoading(true);
        setMessage(null);
        try {
            await appwriteWebClientAccount.createEmailSession(values.email, values.password);
            await appwriteWebClientAccount.updateVerification(userId, secret)
            setCurrentUser();
            toast.success("Account verified")
            router.push('/')
        } catch (error) {
            console.log(error);
            setMessage({ error: (error as Error)?.message })
        } finally {
            setIsLoading(false)
        }

    }


    return (
        <Modal title="Welcome back"
            description="Verify your account"
            isOpen={true}
            onChange={() => { }}>
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
                    Sign in and verify
                </Button>

            </form>

            {message?.error && <p className="text-red-600 text-center">{message.error}</p>}

        </Modal>
    )
}

export default VerifyModal