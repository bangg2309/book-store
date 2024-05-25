import * as publicRequest from '../utils/requestConfig';
export const login = async (data) => {
    return await publicRequest.postUnAuth('auth/authenticate', data);
}
export const logout = async () => {
    return await publicRequest.post('auth/logout');
}
export const register = async (data) => {
    return await publicRequest.postUnAuth('auth/register', data);
}
export const checkUsername = async (username) => {
    return await publicRequest.postUnAuth('auth', username, 'text/plain');
}
export const refreshToken = async () => {
    return await publicRequest.refreshToken('auth/refresh-token');
}