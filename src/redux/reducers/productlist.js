import {GET_PRODUCTLIST_REQUEST, GET_PRODUCTLIST_SUCCESS, GET_PRODUCTLIST_FAIL, ADD_SHOPPINGCART_REQUEST, ADD_SHOPPINGCART_SUCCESS, ADD_SHOPPINGCART_FAIL} from 'actions/productlist';

const initState = {
    isLoading: false,
    products: {},
    errorMsg: ''
};

export default function reducer(state = initState, action) {

    // console.log(action,11111)
    switch (action.type) {
        case GET_PRODUCTLIST_REQUEST:
            return {
                ...state,
                isLoading: true,
                products: {},
                errorMsg: ''
            };
        case GET_PRODUCTLIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                products: action.result.data,
                errorMsg: ''
            };
        case GET_PRODUCTLIST_FAIL:
            return {
                ...state,
                isLoading: false,
                products: {},
                errorMsg: '请求错误'
            };
        case ADD_SHOPPINGCART_REQUEST:
            return {
                ...state,
                isLoading: true,
                // products: {},
                errorMsg: ''
            };
        case ADD_SHOPPINGCART_SUCCESS:
            return {
                ...state,
                isLoading: false,
                // products: action.result.data,
                errorMsg: ''
            };
        case ADD_SHOPPINGCART_FAIL:
            return {
                ...state,
                isLoading: false,
                // products: {},
                errorMsg: '请求错误'
            };
        default:
            return state;
    }
}