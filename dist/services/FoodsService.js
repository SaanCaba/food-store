"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_json_1 = __importDefault(require("./data.json"));
const boom_1 = __importDefault(require("@hapi/boom"));
const foodProduct_1 = __importDefault(require("../models/foodProduct"));
const uuid_1 = require("uuid");
const { cloudinary } = require("../routes/utils/cloudinary");
class FoodService {
    constructor() {
        this.foods = data_json_1.default.foods;
        this.generateDB();
    }
    async getAllFoods() {
        // console.log("comidas", this.foods);
        // let food = this.foods;
        // let dbFoods: Foods[] = await FoodProduct.find({});
        // let newArr = [];
        // food.map(e => {
        //   newArr.push(e);
        // });
        // dbFoods.map(e => {
        //   newArr.push(e);
        // });
        // this.detailArr = newArr;
        return this.foods;
    }
    async generateDB() {
        //añadimos los de la db
        let dbFoods = await foodProduct_1.default.find({});
        dbFoods.map(e => {
            return this.foods.push(e);
        });
    }
    async findOneFood(id) {
        if (id.length > 5) {
            //   if (this.detailArr === undefined) {
            //     let dbFoods: Foods[] = await FoodProduct.find({});
            //     this.detailArr = dbFoods;
            //   }
            let food = this.foods.find(food => food.id === id);
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
        let foodType = this.foods.filter(food => food.type === type);
        if (foodType.length === 0) {
            throw boom_1.default.notFound("This type dont exist!");
        }
        return foodType;
    }
    async createFood(info) {
        if (this.foods.length > 15) {
            throw boom_1.default.notFound("The limit of created products is full! please wait for you opportunity to create your product!.");
        }
        const fileStr = info.image;
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: "dev_setups",
        });
        const newFood = await new foodProduct_1.default({
            id: (0, uuid_1.v4)(),
            image: uploadedResponse.url,
            name: info.name,
            type: info.type,
            description: info.description,
        }).save();
        this.foods.push(newFood);
        console.log(this.foods);
        return newFood;
    }
    async findByName(value) {
        let filterProducts = this.foods.filter(e => e.name.toLowerCase().includes(value.toLowerCase()));
        if (filterProducts.length === 0) {
            throw boom_1.default.badData("This product dont exist!");
        }
        return filterProducts;
    }
}
exports.default = FoodService;
//# sourceMappingURL=FoodsService.js.map