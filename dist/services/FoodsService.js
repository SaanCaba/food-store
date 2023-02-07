"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_json_1 = __importDefault(require("./data.json"));
const boom_1 = __importDefault(require("@hapi/boom"));
const foodProduct_1 = __importDefault(require("../models/foodProduct"));
const uuid_1 = require("uuid");
const { cloudinary } = require('../routes/utils/cloudinary');
class FoodService {
    constructor() {
        this.foods = data_json_1.default.foods;
    }
    async getAllFoods() {
        let food = this.foods;
        let dbFoods = await foodProduct_1.default.find({});
        let newArr = [];
        food.map(e => {
            newArr.push(e);
        });
        dbFoods.map(e => {
            newArr.push(e);
        });
        this.detailArr = newArr;
        return newArr;
    }
    // async generateDB(){
    //     //añadimos los de la db
    //   return  this.foods.concat(dbFoods)
    // }
    async findOneFood(id) {
        console.log(this.detailArr);
        if (id.length > 5) {
            if (this.detailArr === undefined) {
                let dbFoods = await foodProduct_1.default.find({});
                this.detailArr = dbFoods;
            }
            console.log(this.detailArr);
            let food = this.detailArr.find(food => food.id === id);
            if (!food) {
                throw boom_1.default.notFound("This food dont exist!");
            }
            return food;
        }
        let food = this.foods.find(food => food.id === Number(id));
        if (!food) {
            throw boom_1.default.notFound("This food dont exist!");
        }
        return food;
    }
    getTypeOfFood(type) {
        let foodType = this.detailArr.filter(food => food.type === type);
        if (foodType.length === 0) {
            throw boom_1.default.notFound("This type dont exist!");
        }
        return foodType;
    }
    async createFood(info) {
        const fileStr = info.image;
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'dev_setups'
        });
        const newFood = await new foodProduct_1.default({
            id: (0, uuid_1.v4)(),
            image: uploadedResponse.url,
            name: info.name,
            type: info.type,
            description: info.description
        }).save();
        return newFood;
    }
}
exports.default = FoodService;
//# sourceMappingURL=FoodsService.js.map