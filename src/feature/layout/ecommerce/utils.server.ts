"use server";
import { getProducts } from "@/src/query/product.query";

export const fetchProducts = async () => {
    return await getProducts()
};

