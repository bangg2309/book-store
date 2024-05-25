import { SET_ACTIVE, SET_QUANTITY_CART, SET_SHOW_MODAL, SET_PRODUCTS, SET_SHOW_MODAL_EDIT, SET_REFRESH_TOKEN, SET_SHOW_MODAL_EDIT_ORDER } from "./constants";
export const setRreshToken = (value) => {
    return {
        type: SET_REFRESH_TOKEN,
        payload: value,
    };
}
export const setShowModal = (value) => {
    return {
        type: SET_SHOW_MODAL,
        payload: value,
    };
}
export const setShowModalEdit = (value, id) => {
    return {
        type: SET_SHOW_MODAL_EDIT,
        payload: {value, id},
    };
}
export const setShowModalEditOrder = (value, id) => {
    return {
        type: SET_SHOW_MODAL_EDIT_ORDER,
        payload: {value, id},
    };
}
export const setActive = (value) => {
    return {
        type: SET_ACTIVE,
        payload: value,
    };
}
export const setProducts = (value) => {

    return {
        type: SET_PRODUCTS,
        payload: value,
    };

}
export const setQuantityCart = (value) => {
    return {
        type: SET_QUANTITY_CART,
        payload: value,
    };
}