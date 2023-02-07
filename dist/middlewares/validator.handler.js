"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateHandler = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
function validateHandler(schema, property) {
    return (req, res, next) => {
        const data = req[property]; // de esta forma agarramos la data si viene por params o body.;
        const { error } = schema.validate(data, { abortEarly: false });
        console.log("errorVALIDATE", error);
        // abortEarly en false, manda todos los errores.
        if (error) {
            next(boom_1.default.badRequest(error));
        }
        next();
    };
}
exports.validateHandler = validateHandler;
//# sourceMappingURL=validator.handler.js.map