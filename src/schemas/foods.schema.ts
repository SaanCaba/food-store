import Joi from "joi";

// const id = Joi.string()
const type = Joi.string().min(3).max(10).messages({
  "string.base": `The type must be a text`,
  "string.empty": `The type cannot be an empty field`,
});

const name = Joi.string().min(3).max(25).messages({
  "string.base": `The Name must be a text`,
  "string.empty": `The Name cannot be an empty field`,
  "string.min": `The Name should have a minimum length of 3 letters`,
  "any.required": `The name is a required field`,
});

const description = Joi.string().min(15).max(130).messages({
  "string.base": `The Description must be a text`,
  "string.empty": `The description cannot be an empty field`,
  "string.min": `The Description should have a minimum length of 15 letters`,
  "string.max": "The description should have a max of 130 letters not more.",
  "any.required": `The description is a required field`,
});
const image = Joi.string().messages({
  "string.empty": `The image cannot be an empty field`,
});
export const getTypeSchema = Joi.object({
  type: type.required(),
});

export const getFormSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  type: type.required(),
  image: image.required(),
});
