"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const foodProductSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true }
});
const FoodProduct = (0, mongoose_1.model)('FoodProduct', foodProductSchema);
exports.default = FoodProduct;
//# sourceMappingURL=foodProduct.js.map