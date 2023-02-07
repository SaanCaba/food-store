"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.boomErrorHandler = exports.logErrors = void 0;
function logErrors(error, req, res, next) {
    // console.log(error);
    next(error);
}
exports.logErrors = logErrors;
function boomErrorHandler(error, req, res, next) {
    if (error.isBoom) {
        //output es de Boom y tiene la info del error
        const { output } = error;
        console.log("outputtt", output);
        return res.status(output.statusCode).json(output.payload);
    }
    next(error);
}
exports.boomErrorHandler = boomErrorHandler;
function errorHandler(error, req, res, next) {
    return res.status(500).json({
        message: error.message,
        stack: error.stack
    });
}
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.handler.js.map