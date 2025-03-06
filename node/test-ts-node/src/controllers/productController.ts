import { Request, Response } from 'express';
import axios from 'axios';

// Fetch products with pagination
export const getProducts = async (req: Request, res: Response): Promise<Response> => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    const products = response.data;

    // Apply pagination
    const paginatedProducts = products.slice((Number(page) - 1) * Number(limit), Number(page) * Number(limit));

    return res.json(paginatedProducts);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};
