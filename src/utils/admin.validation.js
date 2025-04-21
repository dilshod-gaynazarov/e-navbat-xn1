import Joi from "joi";

export const adminValidator = (data) => {
    try {
        const admin = Joi.object({
            username: Joi.string().min(4).max(20).required(),
            password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/).required(),
            role: Joi.string().valid('superadmin', 'admin').required()
        });
        return admin.validate(data);
    } catch (error) {
        console.log(`Error on validate admin: ${error.message}`);
    }
}
