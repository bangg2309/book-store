

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
        case '':
            return {}
        default:
            return state;
    }
}
export { initialState}
export default reducer;