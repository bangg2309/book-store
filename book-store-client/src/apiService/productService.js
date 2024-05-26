import * as publicRequest from '../utils/requestConfig';

export const getNewArrivals = async () => {
    return await publicRequest.getUnauth('products/new-arrivals');
}
export const getBestSellers = async () => {
    return await publicRequest.getUnauth('products/bestsellers');
}
export const getAllProduct = async (page, size) => {
    return await publicRequest.getUnauth(`products?page=${page}&size=${size}`);
}
export const getAllProductAdmin = async (page, size) => {
    return await publicRequest.get(`products?page=${page}&size=${size}`);
}
export const getAll = async () => {
    return await publicRequest.getUnauth(`products/all`);
}
export const createProduct = async (data) => {
    return await publicRequest.post('products', data);
}
export const getProductById = async (id) => {
    return await publicRequest.getUnauth(`products/${id}`);
}
export const deleteProductById = async (id) => {
    return await publicRequest.del(`products/${id}`);
}
export const updateProductById = async (id, data) => {
    return await publicRequest.put(`products/${id}`, data);
}
export const searchProductByName = async (name) => {
    return await publicRequest.getUnauth(`products/search?name=${name}`);
}
export const filterProduct = async (publisher, author, minPrice, maxPrice) => {
    return await publicRequest.getUnauth(`products/filter?publisher=${publisher}&author=${author}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
}