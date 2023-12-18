export interface IRequestSignUp {
    email: string;
    name: string;
    password: string;
}

export interface IRequestSignIn {
    email: string;
    password: string;
}

export interface IRequestVerifyUser {
    email: string;
    token: string;
}

export interface IRequestForgotPassword extends IRequestVerifyUser {
    newPassword: string;
}