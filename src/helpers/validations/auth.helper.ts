import Joi from "joi";

const signUpSchema: Joi.Schema = Joi.object({
    name: Joi.string().min(4).max(50).trim().required(),
    email: Joi.string().email().min(1).max(150).trim().required(),
    password: Joi.string().min(6).max(100).trim().required(),
});

const signInSchema: Joi.Schema = Joi.object({
    email: Joi.string().email().min(1).max(150).trim().required(),
    password: Joi.string().min(6).max(100).trim().required(),
});

const verifyUserSchema: Joi.Schema = Joi.object({
    email: Joi.string().email().min(1).max(150).trim().required(),
    token: Joi.string().max(300).trim().required(),
});

const verifyForgotPasswordSchema: Joi.Schema = Joi.object({
    email: Joi.string().email().min(1).max(150).trim().required(),
    token: Joi.string().max(300).trim().required(),
    newPassword: Joi.string().min(6).max(100).trim().required(),
});

export const signUpValidation = (dataValidation: object): Joi.ValidationResult => {
    return signUpSchema.validate(dataValidation);
};

export const signInValidation = (dataValidation: object): Joi.ValidationResult => {
    return signInSchema.validate(dataValidation);
};

export const verifyAdminValidation = (dataValidation: object): Joi.ValidationResult => {
    return verifyUserSchema.validate(dataValidation);
};

export const verifyForgotPasswordValidation = (dataValidation: object): Joi.ValidationResult => {
    return verifyForgotPasswordSchema.validate(dataValidation);
};

export const forgotPasswordValidation = (dataValidation: object): Joi.ValidationResult => {
    return Joi.object({ email: Joi.string().trim().email().min(1).max(150).required() }).validate(dataValidation);
};

export const tokenValidation = (dataValidation: { token: string }): Joi.ValidationResult<{ token: string }> => {
    dataValidation.token = dataValidation.token.replace("Bearer ", "");
    return Joi.object({ token: Joi.string().trim().required() }).validate(dataValidation);
};

export const apiKeyValidation = (dataValidation: { apiKey: string }): Joi.ValidationResult<{ apiKey: string }> => {
    return Joi.object({ apiKey: Joi.string().trim().required() }).validate(dataValidation);
};
