"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormSchema = exports.getTypeSchema = void 0;
const joi_1 = __importDefault(require("joi"));
// const id = Joi.string()
const type = joi_1.default.string().min(3).max(10).message("Ese tipo no existe");
const name = joi_1.default.string().min(3).max(30).message("Nombre incorrecto, debe ser mayor a 3 caracteres y menor a 30 caracteres");
const description = joi_1.default.string().min(15).max(130).message("La descripcion debe ser mayor a 15 caracteres y menor a 130 caracteres!");
const image = joi_1.default.string();
exports.getTypeSchema = joi_1.default.object({
    type: type.required()
});
exports.getFormSchema = joi_1.default.object({
    name: name.required(),
    description: description.required(),
    type: type.required(),
    image: image.required()
});
//# sourceMappingURL=foods.schema.js.map