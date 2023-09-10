export interface Users {
    id?: number
    name: string
    email: string
    password?: string
    newPassword?: string
    newPasswordConfirmation?: string
    photo?: File | undefined
}
