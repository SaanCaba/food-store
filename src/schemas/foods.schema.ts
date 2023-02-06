import Joi from "joi";

// const id = Joi.string()
const type = Joi.string().min(3).max(10).message("Ese tipo no existe")
const name = Joi.string().min(3).max(30).message("Nombre incorrecto, debe ser mayor a 3 caracteres y menor a 30 caracteres")
const description = Joi.string().min(15).max(130).message("La descripcion debe ser mayor a 15 caracteres y menor a 130 caracteres!")
const image = Joi.string();
export const getTypeSchema = Joi.object({
    type: type.required()
})

export const getFormSchema = Joi.object({
    name : name.required(),
    description: description.required(),
    type: type.required(),
    image: image.required()
})