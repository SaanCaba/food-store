import express from 'express';
import foodRoute from './foods.router.js'
const app = express();


app.use('/foods', foodRoute);



export default app;




