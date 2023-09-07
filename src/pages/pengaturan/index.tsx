'use client'

import React from 'react'
import { PenSquare, User } from 'lucide-react'
import Link from 'next/link'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import AdminLayout from '@/components/Layouts/AdminLayout'
import { useAuth } from '@/hooks/auth'

export default function Index() {
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
                    <div>Pengaturan</div>
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
                                Ahmad Admin
                            </Label>
                        </div>
                        <Button className="rounded-2xl bg-[#B568F1] text-white hover:bg-[#804aa9]">
                            <PenSquare className="mr-3" />
                            Ubah Data
                        </Button>
                    </div>
                    <div className="flex mt-4 space-x-4">
                        <div className="flex w-64 h-80 bg-[#F4F4F4] border border-[#DCDCDC] rounded-[4px] items-center justify-center">
                            <User className="w-52 h-64 text-[#B568F1]" />
                        </div>
                        <div className="flex flex-col">
                            <Label className="text-base font-medium text-[#333333] opacity-50">
                                Email
                            </Label>
                            <Label className="text-lg font-medium mt-2">
                                ahmad@bukanadmin.po
                            </Label>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
