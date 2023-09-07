import AuthCard from '@/components/AuthCard'
import InputError from '@/components/InputError'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useState, FormEventHandler } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarImage } from '@/components/ui/avatar'

interface RegisterFormValues {
    name?: string[]
    email?: string[]
    password?: string[]
    photo?: File
    password_confirmation?: string[]
    length?: number
}

const Register = () => {
    const { register } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [photo, setPhoto] = useState(undefined)
    const [errors, setErrors] = useState<RegisterFormValues>([])
    const [status, setStatus] = useState<string | null>(null)

    const handlePhotoChange = (event: any) => {
        const file = event.target.files.item(0) ?? undefined

        if (file) {
            setPhoto(file)
        }
    }

    const imageUrl = photo
        ? URL.createObjectURL(photo)
        : '/icon/user-circle.svg'

    const submitForm: FormEventHandler = event => {
        event.preventDefault()

        register({
            name,
            email,
            photo,
            password,
            password_confirmation: passwordConfirmation,
            setErrors: newErrors => setErrors(newErrors as RegisterFormValues),
            setStatus: () => {},
        })
    }

    return (
        <div
            className="flex min-h-screen flex-col items-center justify-center"
            style={{ backgroundImage: 'url(/images/bg-login.jpg)' }}>
            <div className="flex flex-col items-center w-[25em] h-fit bg-white rounded-xl bg-opacity-50 py-4 px-12">
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
                <Label className="text-2xl font-sans mt-8 font-semibold">
                    LOGIN
                </Label>
                <AuthCard>
                    <form
                        onSubmit={submitForm}
                        className="flex flex-col w-full mt-5"
                        encType="multipart/form-data">
                        {/* Name */}
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label
                                htmlFor="name"
                                className="text-base font-medium">
                                Fullname
                            </Label>
                            <Input
                                type="text"
                                id="name"
                                value={name}
                                onChange={event => setName(event.target.value)}
                                placeholder="Your name"
                                className="rounded-xl h-14 pl-3 mt-2 text-black bg-white"
                                required
                            />
                            <InputError
                                messages={errors.name}
                                className="mt-2"
                            />
                        </div>

                        {/* Email */}
                        <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
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
                                className="rounded-xl h-14 pl-3 mt-2 text-black bg-white"
                                required
                            />
                            <InputError
                                messages={errors.email}
                                className="mt-2"
                            />
                        </div>

                        {/* Password */}
                        <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
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
                                className="rounded-xl h-14 pl-3 mt-2 text-black bg-white"
                                required
                            />
                            <InputError
                                messages={errors.password}
                                className="mt-2"
                            />
                        </div>

                        {/* Confirmation Password */}
                        <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
                            <Label
                                htmlFor="passwordConfirmation"
                                className="text-base font-medium">
                                Confirm Password
                            </Label>
                            <Input
                                type="password"
                                id="passwordConfirmation"
                                value={passwordConfirmation}
                                onChange={event =>
                                    setPasswordConfirmation(event.target.value)
                                }
                                placeholder="Re-type your password"
                                className="rounded-xl h-14 pl-3 mt-2 text-black bg-white"
                                required
                            />
                            <InputError
                                messages={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>

                        {/* Profile Picture */}
                        <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
                            <Label
                                htmlFor="passwordConfirmation"
                                className="text-base font-medium">
                                Photo
                            </Label>

                            <div className="flex justify-center">
                                <Label
                                    htmlFor="file-upload"
                                    className="cursor-pointer">
                                    <Avatar className="h-44 w-44 bg-white">
                                        <AvatarImage src={imageUrl} />
                                    </Avatar>
                                </Label>
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoChange}
                                    hidden
                                />
                                <InputError
                                    messages={errors.photo}
                                    className="mt-2"
                                />
                            </div>
                        </div>

                        <Button className="w-full h-14 rounded-xl bg-[#B568F1] hover:bg-[#6f4391] text-white text-lg mt-5">
                            Register
                        </Button>
                    </form>
                </AuthCard>
                <Label className="mt-5 flex">
                    Already have an account?{' '}
                    <Link
                        href="/login"
                        className="text-white font-semibold ml-1">
                        sign in here
                    </Link>
                </Label>
            </div>
        </div>
    )
}

export default Register
