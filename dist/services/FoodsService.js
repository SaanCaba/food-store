"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_json_1 = __importDefault(require("./data.json"));
const boom_1 = __importDefault(require("@hapi/boom"));
const foodProduct_1 = __importDefault(require("../models/foodProduct"));
class FoodService {
    constructor() {
        this.foods = data_json_1.default.foods;
        this.generateDB();
    }
    getAllFoods() {
        return this.foods;
    }
    generateDB() {
        //añadimos los de la db
    }
    findOneFood(id) {
        let food = this.foods.find(food => food.id === Number(id));
        if (!food) {
            throw boom_1.default.notFound("This food dont exist!");
        }
        return food;
    }
    getTypeOfFood(type) {
        let foodType = this.foods.filter(food => food.type === type);
        if (foodType.length === 0) {
            throw boom_1.default.notFound("This type dont exist!");
        }
        return foodType;
    }
    async createFood(info) {
        const newFood = await new foodProduct_1.default(info).save();
        return newFood;
    }
}
exports.default = FoodService;
//# sourceMappingURL=FoodsService.js.map