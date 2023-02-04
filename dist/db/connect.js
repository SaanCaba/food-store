"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// const connectionsParams = {
//     useNewUrlParser: true,
//     useUnifiedTopology:true,
// }
const connection = async () => {
    try {
        mongoose_1.default.set("strictQuery", false);
        mongoose_1.default.connect(process.env.DB);
        console.log('connected to database');
    }
    catch (error) {
        console.log(error);
        console.log('could not connect to database');
    }
};
exports.default = connection;
//# sourceMappingURL=connect.js.map