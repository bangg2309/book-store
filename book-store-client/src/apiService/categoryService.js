import * as publicRequest from '../utils/requestConfig';
export const getAllCategory = async () => {
    return await publicRequest.getUnauth('category');
}