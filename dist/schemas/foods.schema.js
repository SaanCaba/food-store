"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormSchema = exports.getTypeSchema = void 0;
const joi_1 = __importDefault(require("joi"));
// const id = Joi.string()
const type = joi_1.default.string().min(3).max(10).messages({
    "string.base": `The type must be a text`,
    "string.empty": `The type cannot be an empty field`,
});
const name = joi_1.default.string().min(3).max(25).messages({
    "string.base": `The Name must be a text`,
    "string.empty": `The Name cannot be an empty field`,
    "string.min": `The Name should have a minimum length of 3 letters`,
    "any.required": `The name is a required field`,
});
const description = joi_1.default.string().min(15).max(130).messages({
    "string.base": `The Description must be a text`,
    "string.empty": `The description cannot be an empty field`,
    "string.min": `The Description should have a minimum length of 15 letters`,
    "string.max": "The description should have a max of 130 letters not more.",
    "any.required": `The description is a required field`,
});
const image = joi_1.default.string().messages({
    "string.empty": `The image cannot be an empty field`,
});
exports.getTypeSchema = joi_1.default.object({
    type: type.required(),
});
exports.getFormSchema = joi_1.default.object({
    name: name.required(),
    description: description.required(),
    type: type.required(),
    image: image.required(),
});
//# sourceMappingURL=foods.schema.js.map