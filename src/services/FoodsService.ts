import foods from './data.json';
import boom from '@hapi/boom';
import FoodProduct from '../models/foodProduct';
const  {cloudinary} = require('../routes/utils/cloudinary')
interface Foods{
    id: number | string,
    type: string,
    name: string,
    image: string,
    description: string
}

class FoodService{
    foods: Array<Foods>;
    constructor(){
        this.foods = foods.foods;
        this.generateDB();
    }
    getAllFoods(){
        return this.foods
    }
    generateDB(){
        //añadimos los de la db
    }

    findOneFood(id:string){
        let food = this.foods.find(food => food.id === Number(id));
        if(!food){
            throw boom.notFound("This food dont exist!")
        }
        return food
    }

    getTypeOfFood(type:string){
        let foodType = this.foods.filter(food => food.type === type)
        if(foodType.length === 0){
            throw boom.notFound("This type dont exist!")
        }
        return foodType;
    }

  async createFood(info:Foods){
    const fileStr = info.image;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: 'dev_setups'
    })
       const newFood = await new FoodProduct({
        image:uploadedResponse.url,
        name:info.name,
        type: info.type,
        description: info.description
       }).save()
            return newFood
    }

}


export default FoodService;