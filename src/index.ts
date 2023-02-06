import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import routes from './routes/index.js'
import morgan from 'morgan';
const helmet = require('helmet');
import { errorHandler, logErrors } from './middlewares/error.handler.js';
import cors from 'cors'
import connection from './db/connect.js';

connection();
const app = express();

app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit:'50mb', extended: true}))

const localHost= 'http://localhost:3001'
const whiteList = [process.env.URL, localHost];
const options = {
    origin: (origin, callback) => {
        if(whiteList.includes(origin) || whiteList.includes(localHost)){
            callback(null, true);
        }else{
            callback(new Error('no permitido!'));
        }
    }
}

app.use(
    cors(options)
)

app.use(helmet())
app.use(morgan('tiny'));
app.use('/', routes);


app.use(logErrors);
app.use(errorHandler);


app.listen(process.env.PORT, ()=> console.log('Server run on port ', process.env.PORT))



