import foods from "./data.json";
import boom from "@hapi/boom";
import FoodProduct from "../models/foodProduct";
import { v4 as uuidv4 } from "uuid";
const { cloudinary } = require("../routes/utils/cloudinary");
interface Foods {
  id?: number | string;
  _id?: string;
  type: string;
  name: string;
  image: string;
  description: string;
}

class FoodService {
  foods: Array<Foods>;
  detailArr: Array<Foods>;
  constructor() {
    this.foods = foods.foods;
    this.generateDB();
  }
  async getAllFoods() {
    console.log("comidas", this.foods);
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
    let dbFoods: Foods[] = await FoodProduct.find({});
    dbFoods.map(e => {
      return this.foods.push(e);
    });
  }

  async findOneFood(id: string) {
    if (id.length > 5) {
      if (this.detailArr === undefined) {
        let dbFoods: Foods[] = await FoodProduct.find({});
        this.detailArr = dbFoods;
      }
      let food = this.detailArr.find(food => food.id === id);
      if (!food) {
        throw boom.notFound("This food dont exist!");
      }
      return food;
    }
    let food = this.foods.find(food => food.id === Number(id));
    if (!food) {
      throw boom.notFound("This food dont exist!");
    }
    return food;
  }

  getTypeOfFood(type: string) {
    let foodType = this.foods.filter(food => food.type === type);
    if (foodType.length === 0) {
      throw boom.notFound("This type dont exist!");
    }
    return foodType;
  }

  async createFood(info: Foods) {
    console.log(this.foods.length);
    if (this.foods.length > 15) {
      throw boom.notFound(
        "The limit of created products is full! please wait for you opportunity to create your product!."
      );
    }
    const fileStr = info.image;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "dev_setups",
    });
    const newFood: FoodProduct = await new FoodProduct({
      id: uuidv4(),
      image: uploadedResponse.url,
      name: info.name,
      type: info.type,
      description: info.description,
    }).save();
    return newFood;
  }

  async findByName(value: string) {
    let filterProducts = this.foods.filter(e =>
      e.name.toLowerCase().includes(value.toLowerCase())
    );
    if (filterProducts.length === 0) {
      throw boom.badData("This product dont exist!");
    }
    return filterProducts;
  }
}

export default FoodService;
