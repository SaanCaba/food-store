import {Schema, model, connect} from 'mongoose';

interface FoodProduct{
    type: string,
    name:string,
    image:string,
    description: string
}

const foodProductSchema = new Schema<FoodProduct>({
    name: {type: String, required:true},
    type: {type: String, required:true},
    image:{type:String, required:true},
    description:{type:String, required:true}
})

const FoodProduct = model<FoodProduct>('FoodProduct', foodProductSchema)

export default FoodProduct