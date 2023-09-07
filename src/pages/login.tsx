import AuthCard from '@/components/AuthCard'
import AuthSessionStatus from '@/components/AuthSessionStatus'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useState, FormEventHandler, useEffect } from 'react'
import Head from 'next/head'
import Checkbox from '@/components/Checkbox'
import PrimaryButton from '@/components/PrimaryButton'
import Image from 'next/image'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import InputError from '@/components/InputError'
import { useRouter } from 'next/router'

interface LoginFormValues {
    email?: string[]
    password?: string[]
    length?: number
}

const Login = () => {
    const { query } = useRouter()

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [errors, setErrors] = useState<LoginFormValues>([])
    const [status, setStatus] = useState<string | null>(null)

    useEffect(() => {
        const reset = query && query.reset ? (query.reset as string) : ''
        if (reset.length > 0 && errors.length === 0) {
            setStatus(atob(reset))
        } else {
            setStatus(null)
        }
    })

    const submitForm: FormEventHandler = async event => {
        event.preventDefault()

        login({
            email,
            password,
            remember: shouldRemember,
            setErrors: newErrors => setErrors(newErrors as LoginFormValues),
            setStatus,
        })
    }

    return (
        <div
            className="flex min-h-screen flex-col items-center justify-center"
            style={{ backgroundImage: 'url(/images/bg-login.jpg)' }}>
            <div className="flex flex-col items-center w-[25em] h-fit bg-white rounded-xl bg-opacity-50 py-16 px-12">
                <div className="flex items-center">
                    <Image
                        src="/icon/app-icon-white.svg"
                        width={50}
                        height={50}
                        className=""
                        alt="Picture of the author"
                    />
                    <Label className="font-sans text-4xl text-white flex">
                        logoipsum{' '}
                        <span className="text-4xl mt-[-0.50rem]">•</span>
                    </Label>
                </div>
                <Label className="text-2xl font-sans mt-11 font-semibold">
                    LOGIN
                </Label>
                <AuthCard>
                    <form
                        onSubmit={submitForm}
                        className="flex flex-col w-full mt-5">
                        {/* Email */}
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label
                                htmlFor="email"
                                className="text-base font-medium">
                                Email
                            </Label>
                            <Input
                                type="email"
                                id="email"
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                                placeholder="Your email"
                                className="rounded-xl h-14 pl-3 mt-3 text-black bg-white"
                                required
                            />
                            <InputError
                                messages={errors.email}
                                className="mt-2"
                            />
                        </div>

                        {/* Password */}
                        <div className="grid w-full max-w-sm items-center gap-1.5 mt-5">
                            <Label
                                htmlFor="password"
                                className="text-base font-medium">
                                Password
                            </Label>
                            <Input
                                type="password"
                                id="password"
                                value={password}
                                onChange={event =>
                                    setPassword(event.target.value)
                                }
                                placeholder="Your password"
                                className="rounded-xl h-14 pl-3 mt-3 text-black bg-white"
                                required
                            />
                            <InputError
                                messages={errors.password}
                                className="mt-2"
                            />
                        </div>
                        <Button className="w-full h-14 rounded-xl bg-[#B568F1] hover:bg-[#6f4391] text-white text-lg mt-5">
                            Login <ArrowRightIcon />
                        </Button>
                    </form>
                </AuthCard>
                <Label className="mt-5 flex">
                    No have account?{' '}
                    <Link
                        href="/register"
                        className="text-white font-semibold ml-1">
                        sign up here
                    </Link>
                </Label>
            </div>
        </div>
    )
}

export default Login
