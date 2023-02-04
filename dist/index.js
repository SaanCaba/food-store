"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_js_1 = __importDefault(require("./routes/index.js"));
const morgan_1 = __importDefault(require("morgan"));
const helmet = require('helmet');
const error_handler_js_1 = require("./middlewares/error.handler.js");
const cors_1 = __importDefault(require("cors"));
const connect_js_1 = __importDefault(require("./db/connect.js"));
dotenv_1.default.config();
(0, connect_js_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const localHost = 'http://localhost:3001';
const whiteList = [process.env.URL, localHost];
const options = {
    origin: (origin, callback) => {
        if (whiteList.includes(origin) || whiteList.includes(localHost)) {
            callback(null, true);
        }
        else {
            callback(new Error('no permitido!'));
        }
    }
};
app.use((0, cors_1.default)(options));
app.use(helmet());
app.use((0, morgan_1.default)('tiny'));
app.use('/', index_js_1.default);
app.use(error_handler_js_1.logErrors);
app.use(error_handler_js_1.errorHandler);
app.listen(process.env.PORT, () => console.log('Server run on port ', process.env.PORT));
//# sourceMappingURL=index.js.map