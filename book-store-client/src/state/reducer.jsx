

const initialState = {
    products: [],
    modal: false,
    modalEdit: false,
    active: 0,
    idEdit:null,
    quantityItem: 0,
    modalEditOrder: false,
    idEditOrder:null,
}

function reducer(state=initialState, action) {
    switch (action.type) {
        case 'SET_REFRESH_TOKEN' :
            return {
                ...state,
                quantityItem: action.payload
            }
        case 'SET_SHOW_MODAL' :
            return {
                ...state,
                modal: action.payload
            }
        case 'SET_SHOW_MODAL_EDIT' :
            return {
                ...state,
                modalEdit: action.payload.value,
                idEdit: action.payload.id

            }
        case 'SET_SHOW_MODAL_EDIT_ORDER' :
            return {
                ...state,
                modalEditOrder: action.payload.value,
                idEditOrder: action.payload.id

            }
        case 'SET_ACTIVE' :
            localStorage.setItem('active', action.payload)
            return {
                ...state,
                active: action.payload
            }
        case 'SET_QUANTITY_CART' :
            return {
                ...state,
                quantityItem: action.payload
            }
        case 'SET_PRODUCTS' :
            console.log("reducer product: ");
            console.log(action.payload);
            return {
                ...state,
                products: action.payload
            }
        default:
            return state;
    }
}
export { initialState}
export default reducer;