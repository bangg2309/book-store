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