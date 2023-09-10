import AdminLayout from '@/components/Layouts/AdminLayout'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { PenBox, Trash2, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Students } from '@/models/students/students'
import { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import axios from 'axios'
import { useRouter } from 'next/router'

type Repo = {
    name: string
    stargazers_count: number
    data: Students
}

export default function Show({
    repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter()
    const handleDelete = async (id: any) => {
        try {
            await axios
                .delete(`http://localhost:8000/api/student/${id}`)
                .then(response => {
                    if (response.status === 200) {
                        router.push('/siswa')
                    }
                })
        } catch (error) {
            console.error('Error deleting student', error)
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
                        href="/siswa"
                        className=" text-blue-500 hover:text-blue-800">
                        Siswa
                    </Link>
                    <div>/</div>
                    <div>Detail</div>
                </div>
            }>
            <div className="mx-8 py-4 bg-white h-full rounded-xl">
                <div className="mx-5">
                    <div className="flex justify-between items-center h-14">
                        <div className="flex flex-col">
                            <Label className="text-base font-medium">
                                Data Siswa
                            </Label>
                            <Label className="text-lg font-medium mt-2">
                                {repo.data.name}
                            </Label>
                        </div>
                        <div className="space-x-2 flex items-center justify-center">
                            <Link
                                href={`/siswa/${repo.data.id}/edit`}
                                className="rounded-2xl bg-[#B568F1] text-white hover:bg-[#7b47a3] flex py-2 px-4">
                                <PenBox className="mr-3" />
                                Ubah Data
                            </Link>
                            <Button
                                onClick={() => handleDelete(repo.data.id)}
                                className="rounded-2xl bg-[#D30000] text-white hover:bg-[#642b2b] flex py-2 px-4">
                                <Trash2 className="mr-3" />
                                Hapus
                            </Button>
                        </div>
                    </div>
                    <div className="flex mt-4 space-x-4">
                        <img
                            className="flex flex-col w-64 h-80 object-cover bg-[#F4F4F4] border border-[#DCDCDC] rounded-[4px] items-center justify-center"
                            src={repo.data.photo?.toString()}
                        />
                        <div className="flex flex-col">
                            {/* Nomor Induk Siswa */}
                            <div className="flex flex-col">
                                <Label className="text-base font-normal">
                                    Nomor Induk Siswa
                                </Label>
                                <Label className="text-base font-medium">
                                    {repo.data.student_id}
                                </Label>
                            </div>

                            {/* Jenis Kelamin */}
                            <div className="flex flex-col mt-3">
                                <Label className="text-base font-normal">
                                    Jenis Kelamin
                                </Label>
                                <Label className="text-base font-medium">
                                    {repo.data.gender}
                                </Label>
                            </div>

                            {/* Alamat Lengkap */}
                            <div className="flex flex-col mt-3">
                                <Label className="text-base font-normal">
                                    Alamat Lengkap
                                </Label>
                                <Label className="text-base font-medium">
                                    {repo.data.address}
                                </Label>
                            </div>

                            {/* Tahun Masuk */}
                            <div className="flex flex-col mt-3">
                                <Label className="text-base font-normal">
                                    Tahun Masuk
                                </Label>
                                <Label className="text-base font-medium">
                                    {repo.data.entry_year}
                                </Label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export const getServerSideProps: GetServerSideProps<{
    repo: Repo
}> = async context => {
    const res = await fetch(
        `http://localhost:8000/api/student/${context.query.id}`,
    )
    const repo = await res.json()
    return { props: { repo } }
}
