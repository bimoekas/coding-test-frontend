import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import AdminLayout from '@/components/Layouts/AdminLayout'
import { BellIcon, UserIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

const Dashboard = () => {
    return (
        <AdminLayout
            routeLocation={
                <div className="inline-flex text-black font-medium space-x-2">
                    <div>Dashboard</div>
                </div>
            }>
            <div className="mx-8">
                <div className="grid grid-cols-4 items-center gap-4 h-28">
                    <div className="bg-[#068B92]/20 rounded-[10px] h-full">
                        <div className="flex items-center justify-between h-full mx-8">
                            <div className="flex flex-col justify-center items-center w-14 h-14 bg-[#079AA2]/50 rounded-xl">
                                <UserIcon />
                            </div>
                            <div className="text-right">
                                <Label className="font-medium text-2xl">
                                    360
                                </Label>
                                <p className="text-base text-[#068B92] font-normal">
                                    Siswa
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#D95F18]/20 bg-opacity-20 rounded-[10px] h-full">
                        <div className="flex items-center justify-between h-full mx-8">
                            <div className="flex flex-col justify-center items-center w-14 h-14 bg-[#F16A1B]/50 rounded-xl">
                                <UserIcon />
                            </div>
                            <div className="text-right">
                                <Label className="font-medium text-2xl">
                                    5
                                </Label>
                                <p className="text-base text-[#D95F18] font-normal">
                                    Jurusan
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#AD2D1E]/20 bg-opacity-20 rounded-[10px] h-full">
                        <div className="flex items-center justify-between h-full mx-8">
                            <div className="flex flex-col justify-center items-center w-14 h-14 bg-[#C03221]/50 rounded-xl">
                                <UserIcon />
                            </div>
                            <div className="text-right">
                                <Label className="font-medium text-2xl">
                                    12
                                </Label>
                                <p className="text-base text-[#AD2D1E] font-normal">
                                    Mata Pelajaran
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#344ED1]/20 bg-opacity-20 rounded-[10px] h-full">
                        <div className="flex items-center justify-between h-full mx-8">
                            <div className="flex flex-col justify-center items-center w-14 h-14 bg-[#3A57E8]/50 rounded-xl">
                                <UserIcon />
                            </div>
                            <div className="text-right">
                                <Label className="font-medium text-2xl">
                                    33
                                </Label>
                                <p className="text-base text-[#344ED1] font-normal">
                                    Guru Pengajar
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default Dashboard
