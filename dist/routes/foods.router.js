"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const FoodsService_1 = __importDefault(require("../services/FoodsService"));
const router = express_1.default.Router();
const service = new FoodsService_1.default();
router.get('/', (req, res) => {
    return res.status(200).json(service.getAllFoods());
});
router.get('/filter', 
// validateHandler(getTypeSchema, 'query'),
(req, res, next) => {
    try {
        const { type } = req.query;
        console.log(type);
        let foodsType = service.getTypeOfFood(type);
        return res.status(200).json(foodsType);
    }
    catch (error) {
        next(error);
    }
});
router.get('/:id', (req, res, next) => {
    try {
        const { id } = req.params;
        let food = service.findOneFood(id);
        return res.status(200).json(food);
    }
    catch (error) {
        next(error);
    }
});
router.post('/', async (req, res, next) => {
    try {
        console.log(req.body);
        let pepe = await service.createFood(req.body.info);
        console.log(pepe);
        res.json(pepe);
        //type
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=foods.router.js.map