import * as publicRequest from '../utils/requestConfig';

export const getCart = async () => {
    return await publicRequest.get('carts');
}
export const addToCart = async (data) => {
    return await publicRequest.post('carts', data);
}