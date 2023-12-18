import { Schema, model } from "mongoose";
import { IUserModel } from "@/types";
import { AVATAR_ADMIN, NORMAL_ADMIN_ROLE } from "@/utils";

const COLLECTION_NAME = "Users";
const DOCUMENT_NAME = "User";

const userSchema = new Schema<IUserModel>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            default: AVATAR_ADMIN,
        },
        role: {
            type: String,
            default: NORMAL_ADMIN_ROLE,
            required: true,
        },
        active: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
        versionKey: false,
    },
);

export const UserModel = model<IUserModel>(DOCUMENT_NAME, userSchema);
