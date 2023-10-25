export interface IUser {
    id: string,
    email: string,
    username: string,
    token: string,
    profileImageUrl: string
}

export interface IUserLoginValues {
    emailOrUsername: string,
    password: string
}

export interface IUserRegisterValues {
    email: string,
    username: string,
    password: string
    passwordRepeat: string
}

export interface IUserPasswordChange {
    oldPassword: string,
    newPassword: string,
    newPasswordRepeat: string
}

export interface IUserUsernameChange {
    newUsername: string
}