'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { AlertCircle, Eye, PenBox, Trash2, UserPlus, XIcon } from 'lucide-react'
import Link from 'next/link'
import { Label } from '@/components/ui/label'
import AdminLayout from '@/components/Layouts/AdminLayout'
import { Students } from '@/models/students/students'
import axios from 'axios'

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

type Repo = {
    name: string
    stargazers_count: number
    data: Students
}

export default function Index({
    repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [rowData, setRowData] = useState(repo.data)

    const columnDefs = [
        {
            headerName: 'No',
            field: 'id',
            width: 70,
        },
        {
            headerName: 'Nomor Induk Siswa',
            field: 'student_id',
            width: 170,
        },
        {
            headerName: 'Nama Siswa',
            field: 'name',
            width: 250,
        },
        {
            headerName: 'Jenis Kelamin',
            field: 'gender',
            width: 130,
        },
        {
            headerName: 'Tahun Masuk',
            field: 'entry_year',
            width: 130,
        },
        {
            headerName: 'Alamat',
            field: 'address',
            width: 300,
        },
        {
            headerName: 'Action',
            width: 156,
            cellRenderer: (params: Repo) => (
                <div className="flex text-white items-center justify-center space-x-2 h-full">
                    <Link
                        className="w-9 h-9 bg-[#26C0F1] hover:bg-[#335762] rounded-[4px] flex items-center justify-center"
                        href={`/siswa/${params.data.id}/show`}>
                        <Eye />
                    </Link>
                    <Link
                        className="w-9 h-9 bg-[#B568F1] hover:bg-[#7b46a2] rounded-[4px] flex items-center justify-center"
                        href={`/siswa/${params.data.id}/edit`}>
                        <PenBox />
                    </Link>
                    <AlertDialog>
                        <AlertDialogTrigger className="w-9 h-9 bg-[#D30000] hover:bg-[#652c2c] rounded-[4px] flex items-center justify-center">
                            <Trash2 />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    <div className="flex flex-col items-center justify-center space-y-2">
                                        <AlertCircle className="w-28 h-28 text-[#D30000]" />
                                        <Label>Anda akan menghapus</Label>
                                        <p>{params.data.name}</p>
                                        <p>NIS {params.data.student_id}</p>
                                    </div>
                                </AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="flex mx-auto">
                                <AlertDialogCancel className="rounded-3xl bg-[#0CBC8B] hover:bg-[#3d816e] border-0 text-white">
                                    <XIcon /> Batal
                                </AlertDialogCancel>
                                <AlertDialogAction
                                    className="rounded-3xl bg-[#D30000] hover:bg-[#6c3636] text-white"
                                    onClick={() =>
                                        handleDelete(params.data.id)
                                    }>
                                    <Trash2 />
                                    Hapus
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            ),
            visible: true,
        },
    ]

    const handleDelete = async (id: any) => {
        try {
            await axios.delete(`http://localhost:8000/api/student/${id}`)
            const response = await axios.get(
                'http://localhost:8000/api/student',
            )
            setRowData(response.data.data)
        } catch (error) {
            console.error('Error deleting student', error)
        }
    }

    const defaultColDef = useMemo(() => {
        return {
            width: 170,
            sortable: true,
            edtable: true,
            resizable: true,
            filter: true,
        }
    }, [])

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
                    <div>Siswa</div>
                </div>
            }>
            <div className="mx-8 py-4 bg-white h-full rounded-xl">
                <div className="mx-5">
                    <div className="flex justify-between items-center h-14">
                        <Label className="text-base font-medium">
                            Data Siswa
                        </Label>
                        <Link
                            href="/siswa/create"
                            className="flex rounded-2xl py-2 px-4 w-fit bg-[#0CBC8B] hover:bg-[#3f806c] text-white">
                            <UserPlus className="mr-3" />
                            Tambah Siswa
                        </Link>
                    </div>
                    <div className="ag-theme-alpine w-full h-[500px]">
                        <AgGridReact
                            rowData={rowData}
                            defaultColDef={defaultColDef}
                            rowHeight={50}
                            columnDefs={columnDefs}
                        />
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export const getServerSideProps: GetServerSideProps<{
    repo: Repo
}> = async () => {
    const res = await fetch('http://localhost:8000/api/student')
    const repo = await res.json()
    return { props: { repo } }
}
