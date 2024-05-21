import * as publicRequest from '../utils/requestConfig';

export const addToCart = async (data) => {
    return await publicRequest.post('carts', data);
}