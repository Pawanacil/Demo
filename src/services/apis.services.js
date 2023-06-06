import fetchMain from "./apiservice";

export const getProducts = () => fetchMain("get", "/products");

export const getRelatedItems = () => fetchMain("get", "/products");

export const viewProduct = (productid) => fetchMain("get", `/products/${productid}`);