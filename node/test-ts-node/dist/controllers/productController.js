"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = void 0;
const axios_1 = __importDefault(require("axios"));
// Fetch products with pagination
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10 } = req.query;
    try {
        const response = yield axios_1.default.get('https://fakestoreapi.com/products');
        const products = response.data;
        // Apply pagination
        const paginatedProducts = products.slice((Number(page) - 1) * Number(limit), Number(page) * Number(limit));
        return res.json(paginatedProducts);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
});
exports.getProducts = getProducts;
