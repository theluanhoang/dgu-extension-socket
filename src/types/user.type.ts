export interface IUserModel {
    _id?: string;
    email: string;
    name: string;
    password: string;
    avatar: string;
    role: string;
    active: boolean;
    createdAt: string;
}

export interface IRequestGetAllUser {
    limit: number;
    pages: number;
}

export interface IRequestDeleteUser {
    userId: string;
}
