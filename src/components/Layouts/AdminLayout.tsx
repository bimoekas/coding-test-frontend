'use client'

import { PropsWithChildren, ReactNode } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

import { WrenchIcon, GaugeCircleIcon, UsersIcon, BellIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'

import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
} from '../ui/dropdown-menu'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { useAuth } from '@/hooks/auth'

interface LayoutProps {
    routeLocation: ReactNode
}

export const AdminLayout = ({
    children,
    routeLocation,
}: PropsWithChildren<LayoutProps>) => {
    const router = useRouter()
    const { logout } = useAuth({ middleware: 'auth' })

    const navigation = [
        {
            name: 'Dashboard',
            href: '/dashboard',
            icon: GaugeCircleIcon,
            current: router.pathname === '/dashboard',
        },
        {
            name: 'Siswa',
            href: '/siswa',
            icon: UsersIcon,
            current: router.pathname === '/siswa',
        },
        {
            name: 'Pengaturan',
            href: '/pengaturan',
            icon: WrenchIcon,
            current: router.pathname === '/pengaturan',
        },
    ]

    return (
        <div>
            {/* Static sidebar for desktop */}
            <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white  px-6 ring-1 ring-white rounded-r-2xl">
                    <div className="flex h-20 shrink-0 items-center">
                        <Image
                            src="/icon/app-icon-purple.svg"
                            alt="icon"
                            width={50}
                            height={50}
                            className="fill-green-500"
                        />
                        <Label className="font-sans text-4xl text-purple-500 flex">
                            logoipsum{' '}
                            <span className="text-4xl mt-[-0.50rem]">•</span>
                        </Label>
                    </div>
                    <nav className="flex flex-1 flex-col">
                        <ul
                            role="list"
                            className="flex flex-1 flex-col gap-y-7">
                            <li className="mt-5">
                                <ul role="list" className="-mx-2 space-y-3">
                                    {navigation.map(item => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    item.current
                                                        ? 'bg-purple-500 text-white'
                                                        : 'bg-[#E3E3E3] text-gray-500',
                                                    'flex w-full items-center p-4 rounded-full',
                                                )}>
                                                <item.icon
                                                    className="h-6 w-6 shrink-0 mr-4"
                                                    aria-hidden="true"
                                                />
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div className="xl:pl-72 ">
                <header>
                    <div dir="rtl">
                        <div className="relative h-20 w-[98%] my-8 bg-white rounded-l-full">
                            <div
                                className="h-full w-full flex text-center items-center justify-between px-8"
                                dir="ltr">
                                <nav className="flex" aria-label="Breadcrumb">
                                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                                        <li className="inline-flex items-center">
                                            {routeLocation}
                                        </li>
                                    </ol>
                                </nav>
                                <div className="flex items-center">
                                    <BellIcon />{' '}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Avatar className="ml-4">
                                                <AvatarImage
                                                    src="https://github.com/shadcn.png"
                                                    alt="@shadcn"
                                                />
                                                <AvatarFallback>
                                                    CN
                                                </AvatarFallback>
                                            </Avatar>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="bg-white">
                                            <DropdownMenuItem onClick={logout}>
                                                Logout
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <main>{children}</main>

                <Toaster />
            </div>
        </div>
    )
}

export default AdminLayout
