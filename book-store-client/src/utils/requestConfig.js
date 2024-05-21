import axios from "axios";

export const baseURL = "http://localhost:8080/api/";

export const publicRequest = axios.create({
    baseURL: baseURL,
});

export const getUnauth = async (url) => {
    return await axios({
        url: `${baseURL}${url}`,
        method: "GET",

    });
}
export const get = async (url) => {
    return await axios({
        url: `${baseURL}${url}`,
        method: "GET",
        headers: { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("token")).access_token },
    });
}
export const postUnAuth = async (url, data, contentType) => {
    return await axios({
        url: `${baseURL}${url}`,
        method: "POST",
        data,
        headers: {
            'Content-Type': contentType,
        },
    });
}
export const post = async (url, data) => {
    return await axios({
        url: `${baseURL}${url}`,
        method: "POST",
        data,
        headers: { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("token")).access_token },
    });
}
export const put = async (url, data) => {
    return await axios({
        url: `${baseURL}${url}`,
        method: "PUT",
        data,
        headers: { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("token")).access_token },
    });
}
export const del = async (url, data) => {
    return await axios({
        url: `${baseURL}${url}`,
        method: "DELETE",
        data,
        headers: { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("token")).access_token },
    });
}
export const refreshToken = async (url) => {
    return await axios({
        url: `${baseURL}${url}`,
        method: "POST",
        headers: { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("token")).refresh_token },
    });
}
