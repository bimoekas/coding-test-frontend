import AdminLayout from '@/components/Layouts/AdminLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { PenSquare, Save, User } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { useFormik } from 'formik'
import { Students } from '@/models/students/students'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { updateStudent } from '@/hooks/students/update-student'
import { useRouter } from 'next/router'
import axios from 'axios'

type Repo = {
    name: string
    stargazers_count: number
    data: Students
}

export default function Edit({
    repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter()
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState('')
    const [photo, setPhoto] = useState(undefined)

    const formik = useFormik<Students>({
        initialValues: {
            student_id: repo.data.student_id,
            name: repo.data.name,
            address: repo.data.address,
            entry_year: repo.data.entry_year,
            gender: repo.data.gender,
            photo: repo.data.photo,
        },
        enableReinitialize: true,
        onSubmit: values => {
            const data = new FormData()
            data.append('student_id', values.student_id)
            data.append('name', values.name)
            data.append('address', values.address)
            data.append('entry_year', values.entry_year)
            data.append('gender', values.gender)
            if (values.photo instanceof File) {
                data.append('photo', values.photo)
            }

            const updatedStudent: Students = {
                student_id: data.get('student_id') as string,
                name: data.get('name') as string,
                address: data.get('address') as string,
                entry_year: data.get('entry_year') as string,
                gender: data.get('gender') as string,
            }

            const photo = data.get('photo') as File
            if (photo instanceof File) {
                updatedStudent.photo = photo
            }
            handleUpdateStudent(repo.data.id, updatedStudent)
        },
    })

    const handleUpdateStudent = (id: number | undefined, data: Students) => {
        axios
            .patch(`http://localhost:8000/api/student/${id}`, data)
            .then(response => {
                if (response.status === 200) {
                    router.push('/siswa')
                    console.log(response)
                }
            })
    }

    const years = Array.from(
        { length: 30 },
        (_, index) => new Date().getFullYear() - index,
    )

    const handlePhotoChange = (event: any) => {
        const file = event.target.files.item(0) ?? undefined

        if (file) {
            setPhoto(file)
            formik.setFieldValue('photo', event.currentTarget.files[0])
        }
    }

    const imageUrl = photo ? URL.createObjectURL(photo) : repo.data.photo

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
                    <div>Edit</div>
                </div>
            }>
            <div className="mx-8 py-4 bg-white h-full rounded-xl">
                <div className="mx-5">
                    <div className="flex justify-between items-center h-14">
                        <div className="flex flex-col">
                            <Label className="text-base font-medium">
                                Ubah Data Siswa
                            </Label>
                            <Label className="text-lg font-medium mt-2">
                                {repo.data.name}
                            </Label>
                        </div>
                        <Button
                            onClick={formik.submitForm}
                            type="submit"
                            className="rounded-2xl bg-[#0CBC8B] text-white hover:bg-[#235547]">
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
                        <div className="flex flex-col">
                            {/* Nomor Induk Siswa */}
                            <div>
                                <Label
                                    htmlFor="student_id"
                                    className="text-base font-medium">
                                    Nomor Induk Siswa
                                </Label>
                                <Input
                                    type="number"
                                    id="student_id"
                                    value={formik.values.student_id}
                                    onChange={formik.handleChange}
                                    placeholder="Nomor Induk Siswa"
                                    className="rounded-[4px] h-14 pl-3 mt-3 w-80 text-black bg-[#F4F4F4] border border-[#DCDCDC]"
                                    required
                                />
                            </div>

                            {/* Nama Siswa */}
                            <div className="mt-3">
                                <Label
                                    htmlFor="name"
                                    className="text-base font-medium">
                                    Nama Siswa
                                </Label>
                                <Input
                                    type="text"
                                    id="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    placeholder="Nama Lengkap"
                                    className="rounded-[4px] h-14 pl-3 mt-3 w-80 text-black bg-[#F4F4F4] border border-[#DCDCDC]"
                                    required
                                />
                            </div>

                            {/* Jenis Kelamin */}
                            <div className="mt-3 flex flex-col">
                                <Label
                                    htmlFor="jenis_kelamin"
                                    className="text-base font-medium">
                                    Jenis Kelamin
                                </Label>
                                <select
                                    id="gender"
                                    className="rounded-[4px] h-14 pl-3 mt-3 w-80 text-black bg-[#F4F4F4] border border-[#DCDCDC]"
                                    {...formik.getFieldProps('gender')}>
                                    <option value="" disabled>
                                        Pilih
                                    </option>
                                    <option value="male">Laki-laki</option>
                                    <option value="female">Perempuan</option>
                                </select>
                            </div>

                            {/* Tahun Masuk */}
                            <div className="mt-3 flex flex-col">
                                <Label
                                    htmlFor="entry_year"
                                    className="text-base font-medium">
                                    Tahun Masuk
                                </Label>

                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={open}
                                            className="rounded-[4px] h-14 pl-3 mt-3 w-80 text-black bg-[#F4F4F4] border border-[#DCDCDC] justify-between">
                                            {value
                                                ? years.find(
                                                      framework =>
                                                          framework.toString() ===
                                                          value,
                                                  )
                                                : formik.values.entry_year}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="bg-white w-80 p-0">
                                        <Command>
                                            <ScrollArea className="w-fit h-48">
                                                <CommandInput placeholder="Cari tahun..." />
                                                <CommandEmpty>
                                                    No framework found.
                                                </CommandEmpty>
                                                <CommandGroup>
                                                    {years.map(item => (
                                                        <CommandItem
                                                            key={item}
                                                            onSelect={currentValue => {
                                                                setValue(
                                                                    currentValue ===
                                                                        value
                                                                        ? ''
                                                                        : currentValue,
                                                                )
                                                                formik.setFieldValue(
                                                                    'entry_year',
                                                                    currentValue,
                                                                )
                                                                setOpen(false)
                                                            }}>
                                                            <Check
                                                                className={cn(
                                                                    'mr-2 h-4 w-4',
                                                                    value ===
                                                                        item.toString()
                                                                        ? 'opacity-100'
                                                                        : 'opacity-0',
                                                                )}
                                                            />
                                                            {item}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </ScrollArea>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {/* Alamat Lengkap */}
                            <div className="mt-3">
                                <Label
                                    htmlFor="address"
                                    className="text-base font-medium">
                                    Alamat Lengkap
                                </Label>
                                <Textarea
                                    id="address"
                                    placeholder="Alamat Lengkap"
                                    className="rounded-[4px] h-14 pl-3 mt-3 w-80 text-black bg-[#F4F4F4] border border-[#DCDCDC]"
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    required
                                />
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
