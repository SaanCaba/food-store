import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/index.js'
import morgan from 'morgan';
const helmet = require('helmet');
import { errorHandler, logErrors } from './middlewares/error.handler.js';
import cors from 'cors'
dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet())
app.use(morgan('tiny'));
app.use('/', routes);

const whiteList = [process.env.URL];
const options = {
    origin: (origin, callback) => {
        if(whiteList.includes(origin)){
            callback(null, true);
        }else{
            callback(new Error('no permitido!'));
        }
    }
}

app.use(cors(options));


app.use(logErrors);
app.use(errorHandler);


app.listen(process.env.PORT, ()=> console.log('Server run on port ', process.env.PORT))



