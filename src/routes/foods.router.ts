import express, { Request, Response } from 'express';
import { type } from 'os';
import { nextTick } from 'process';
import { validateHandler } from '../middlewares/validator.handler';
import FoodProduct from '../models/foodProduct';
import { getFormSchema, getTypeSchema } from '../schemas/foods.schema';
import FoodService from '../services/FoodsService';
import foods from "../services/data.json";

const router = express.Router()

const service = new FoodService();


router.get('/', async (req,res)=>{
    let foods = await service.getAllFoods();
    return res.status(200).json(foods);
})

router.get('/filter', 
    // validateHandler(getTypeSchema, 'query'),
    (req : Request,res, next)=>{
    try {
        const {type} : any= req.query;
        console.log(type)
        let foodsType = service.getTypeOfFood(type)
        return res.status(200).json(foodsType)
    } catch (error) {
        next(error);
    }

})

router.get('/byname', async (req:Request, res: Response, next)=>{
    try {
    const {name} :any = req.query;
    const filteredProducts = await service.findByName(name);
    console.log("filteredProducts",filteredProducts)
    return res.status(200).json(filteredProducts)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req: Request,res, next)=>{
    try {
        const {id} = req.params;
        let food = await service.findOneFood(id)
        return res.status(200).json(food);
    } catch (error) {
        next(error)
    }

})

router.post('/', 
    validateHandler(getFormSchema, 'body'),
    async (req,res, next)=>{
    try {
    let response =  await service.createFood(req.body)
        res.json(response)
    } catch (error) {
        next(error)
    }   
})














export default router;