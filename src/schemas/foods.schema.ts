import Joi from "joi";

// const id = Joi.string()
const type = Joi.string().min(3).max(10).message("Ese tipo no existe")


export const getTypeSchema = Joi.object({
    type: type.required()
})