import * as publicRequest from '../utils/requestConfig';
export const addUser = async (data) => {
    return await publicRequest.post('user', data);
}
export const getAllUsers = async () => {
    return await publicRequest.get('user');
}
export const getUserById = async (id) => {
    return await publicRequest.get('user/' + id);
}
export const updateUserById = async (id, data) => {
    return await publicRequest.put('user/' + id, data);
}
export const deleteUserById = async (id) => {
    return await publicRequest.del('user/' + id);
}
export const getUserByToken = async () => {
    return await publicRequest.get('user/info');
}