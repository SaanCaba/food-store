import foods from './data.json';
import boom from '@hapi/boom';

interface Foods{
    id: number | string,
    type: string,
    name: string,
    image: string
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
}


export default FoodService;