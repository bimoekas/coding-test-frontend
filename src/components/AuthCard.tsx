import { PropsWithChildren } from 'react'
import Link from 'next/link'
import ApplicationLogo from './ApplicationLogo'

const AuthCard = ({ children }: PropsWithChildren) => (
    <div className="w-full">{children}</div>
)

export default AuthCard
