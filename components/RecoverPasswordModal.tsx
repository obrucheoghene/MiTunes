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


const RecoverPasswordModal = () => {
    const router = useRouter();
    const searchParams = useSearchParams()
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState<Message | null>(null);
    const { user, setCurrentUser } = useUser()

    const userId = searchParams.get('userId');
    const secret = searchParams.get('secret');

    interface RecoverPasswordFormValues {
        password: string
        confirmPassword: string,
    }
    const { register, handleSubmit, reset, formState: { errors } } = useForm<RecoverPasswordFormValues>({
        defaultValues: {
            password: '',
            confirmPassword: ''
        }
    })

    if (!userId || !secret) {
        router.replace('/');
    }

  

    const onSubmit: SubmitHandler<RecoverPasswordFormValues> = async (values) => {
        setIsLoading(true);
        setMessage(null);
        if (!userId || !secret) {
            return;
        }
        try {
            await appwriteWebClientAccount.updateRecovery(userId, secret, values.password, values.confirmPassword)
            toast.success("Successfully reset password")
            router.replace('/')
        } catch (error) {
            console.log(error);
            setMessage({ error: (error as Error)?.message })
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <Modal title="Recover Password"
            description="Reset your password"
            isOpen={true}
            onChange={() => { }}>
            <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-y-4">
                <div>
                    <div className="pb-1">
                        New Password
                    </div>
                    <Input
                        id="password"
                        type="password"
                        disabled={isLoading}
                        placeholder="Your new password"
                        {...register("password", { required: true })}
                    />
                    {errors?.password && <span className="text-red-600">New Password is required</span>}
                </div>

                <div>
                    <div className="pb-1">
                        Confirm Password
                    </div>
                    <Input
                        id="confirmPassword"
                        type="password"
                        disabled={isLoading}
                        placeholder="Your confirmPassword"
                        {...register("confirmPassword", { required: true })}
                    />
                    {errors?.confirmPassword && <span className="text-red-600">Confirm Password is required</span>}
                </div>


                <Button disabled={isLoading} type="submit" className=" rounded-md text-white">
                   {isLoading ? 'Reseting Password' : 'Reset Password' }
                </Button>

            </form>

            {message?.error && <p className="text-red-600 text-center">{message.error}</p>}

        </Modal>
    )
}

export default RecoverPasswordModal