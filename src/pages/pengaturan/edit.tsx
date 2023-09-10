'use client'

import React, { FormEventHandler, useState } from 'react'
import { PenSquare, Save, User } from 'lucide-react'
import Link from 'next/link'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import AdminLayout from '@/components/Layouts/AdminLayout'
import { useAuth } from '@/hooks/auth'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import { Students } from '@/models/students/students'
import { Users } from '@/models/users'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import axios from 'axios'

type Repo = {
    name: string
    stargazers_count: number
    data: Users
}

export default function Edit() {
    const { query } = useRouter()
    const router = useRouter()
    const [photo, setPhoto] = useState(undefined)

    const { resetPassword, user } = useAuth({ middleware: 'auth' })

    const formik = useFormik<Users>({
        initialValues: {
            name: user?.name ?? '',
            email: user?.email ?? '',
            password: '',
            newPassword: '',
            newPasswordConfirmation: '',
            photo: user?.photo,
        },
        onSubmit: values => {
            const dataUser = new FormData()
            dataUser.append('name', values.name)
            dataUser.append('email', values.email)
            if (values.photo instanceof File) {
                dataUser.append('photo', values.photo)
            }

            const dataPassword = new FormData()
            dataPassword.append('password', values.password ?? '')
            dataPassword.append('newPassword', values.newPassword ?? '')
            dataPassword.append(
                'newPasswordConfirmation',
                values.newPasswordConfirmation ?? '',
            )
            handleSubmit(values)
        },
    })

    const handleSubmit = async (data: Users) => {
        try {
            const response = await axios.put('/api/user', data).then(res => {
                if (res.status === 200) {
                    router.push('/pengaturan')
                }
            })
        } catch (error) {
            console.error(error)
        }
    }

    const imageUrl = photo ? URL.createObjectURL(photo) : user?.photo

    const handlePhotoChange = (event: any) => {
        const file = event.target.files.item(0) ?? undefined

        if (file) {
            setPhoto(file)
            formik.setFieldValue('photo', event.currentTarget.files[0])
        }
    }
    return (
        <AdminLayout
            routeLocation={
                <div className="inline-flex text-black font-medium space-x-2">
                    <Link
                        href="/dashboard"
                        className=" text-blue-500 hover:text-blue-800">
                        Dashboard
                    </Link>
                    <div>/</div>
                    <Link
                        href="/pengaturan"
                        className=" text-blue-500 hover:text-blue-800">
                        Pengaturan
                    </Link>
                    <div>/</div>
                    <div>Edit</div>
                </div>
            }>
            <div className="mx-8 py-4 bg-white h-full rounded-xl">
                <div className="mx-5">
                    <div className="flex justify-between items-center h-14">
                        <div className="flex flex-col">
                            <Label className="text-base font-medium">
                                Profil Guru
                            </Label>
                            <Label className="text-lg font-medium mt-2">
                                {user?.name}
                            </Label>
                        </div>
                        <Button className="rounded-2xl bg-[#0CBC8B] text-white hover:bg-[#3d6c5f]">
                            <Save className="mr-3" />
                            Simpan
                        </Button>
                    </div>
                    <div className="flex mt-4 space-x-4">
                        <div className="flex flex-col w-64 h-80 bg-[#F4F4F4] border border-[#DCDCDC] rounded-[4px] items-center justify-center">
                            <img
                                className=" w-full h-full mb-2"
                                src={imageUrl?.toString()}
                            />
                            <input
                                id="photo"
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}
                                hidden
                            />
                            <Label
                                htmlFor="photo"
                                className="flex w-fit px-4 py-2 items-center rounded-2xl bg-[#B568F1] text-white hover:bg-[#7944a1]">
                                <Save className="mr-3" />
                                Ganti Foto
                            </Label>
                        </div>
                        <div className="flex w-full space-x-4 justify-between">
                            <div className="flex flex-col w-full">
                                {/* Nama Guru */}
                                <div className="mt-3">
                                    <Label
                                        htmlFor="name"
                                        className="text-base font-medium">
                                        Nama Guru
                                    </Label>
                                    <Input
                                        type="text"
                                        id="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        placeholder="Nama Lengkap"
                                        className="rounded-[4px] h-14 pl-3 mt-3 text-black bg-[#F4F4F4] border border-[#DCDCDC]"
                                        required
                                    />
                                </div>

                                {/* Email */}
                                <div className="mt-3">
                                    <Label
                                        htmlFor="email"
                                        className="text-base font-medium">
                                        Email
                                    </Label>
                                    <Input
                                        type="email"
                                        id="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        placeholder="Email"
                                        className="rounded-[4px] h-14 pl-3 mt-3 text-black bg-[#F4F4F4] border border-[#DCDCDC]"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col w-full">
                                {/* Password saat ini */}
                                <div className="mt-3">
                                    <Label
                                        htmlFor="oldPassword"
                                        className="text-base font-medium">
                                        Password saat ini
                                    </Label>
                                    <Input
                                        type="password"
                                        id="oldPassword"
                                        // value={email}
                                        // onChange={event =>
                                        //     setEmail(event.target.value)
                                        // }
                                        placeholder="Password Saat Ini"
                                        className="rounded-[4px] h-14 pl-3 mt-3 text-black bg-[#F4F4F4] border border-[#DCDCDC]"
                                        required
                                    />
                                </div>

                                {/* Password baru */}
                                <div className="mt-3">
                                    <Label
                                        htmlFor="newPassword"
                                        className="text-base font-medium">
                                        Password Baru
                                    </Label>
                                    <Input
                                        type="password"
                                        id="newPassword"
                                        // value={email}
                                        // onChange={event =>
                                        //     setEmail(event.target.value)
                                        // }
                                        placeholder="Password Baru"
                                        className="rounded-[4px] h-14 pl-3 mt-3 text-black bg-[#F4F4F4] border border-[#DCDCDC]"
                                        required
                                    />
                                </div>

                                {/* Konfirmasi Password Baru */}
                                <div className="mt-3">
                                    <Label
                                        htmlFor="newPasswordConfirmation"
                                        className="text-base font-medium">
                                        Konfirmasi Password Baru
                                    </Label>
                                    <Input
                                        type="password"
                                        id="newPasswordConfirmation"
                                        // value={email}
                                        // onChange={event =>
                                        //     setEmail(event.target.value)
                                        // }
                                        placeholder="Konfirmasi Password Baru"
                                        className="rounded-[4px] h-14 pl-3 mt-3 text-black bg-[#F4F4F4] border border-[#DCDCDC]"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
