import useSWR from 'swr'
import axios, { csrf } from '@/lib/axios'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Url } from 'url'

declare type AuthMiddleware = 'auth' | 'guest'

interface IUseAuth {
    middleware: AuthMiddleware
    redirectIfAuthenticated?: string | Url
}

interface IApiRequest {
    setErrors: React.Dispatch<React.SetStateAction<never[]>>
    setStatus: React.Dispatch<React.SetStateAction<any | null>>
    [key: string]: any
}

export interface User {
    id?: number
    name?: string
    email?: string
    email_verified_at?: string
    photo?: File
    must_verify_email?: boolean // this is custom attribute
    created_at?: string
    updated_at?: string
}

export const useAuth = ({ middleware, redirectIfAuthenticated }: IUseAuth) => {
    const router = useRouter()

    const {
        data: user,
        error,
        mutate,
    } = useSWR<User>('/api/user', () =>
        axios
            .get('/api/user')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error

                router.push('/verify-email')
            }),
    )

    const register = async (args: IApiRequest) => {
        const formData = new FormData()
        const { setErrors, ...props } = args
        for (const key in props) {
            formData.append(key, props[key])
        }

        await csrf()

        setErrors([])

        axios
            .post('/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const login = async (args: IApiRequest) => {
        const { setErrors, setStatus, ...props } = args

        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/login', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(error.response.data.errors)
            })
    }

    const forgotPassword = async (args: IApiRequest) => {
        const { setErrors, setStatus, email } = args
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resetPassword = async (args: IApiRequest) => {
        const { setErrors, setStatus, ...props } = args
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/reset-password', { token: router.query.token, ...props })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resendEmailVerification = (args: IApiRequest) => {
        const { setStatus } = args

        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }

    const logout = async () => {
        if (!error) {
            await axios.post('/logout').then(() => mutate())
        }

        window.location.pathname = '/login'
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated)
        if (
            window.location.pathname === '/verify-email' &&
            user?.email_verified_at
        )
            router.push(redirectIfAuthenticated)
        if (middleware === 'auth' && error) logout()
    }, [user, error])

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    }
}
