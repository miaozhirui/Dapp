import {GET_PRODUCT_REQUEST, GET_PRODUCT_SUCCESS, GET_PRODUCT_FAIL} from 'actions/product';


const initState = {
    isLoading: false,
    product: {},
    errorMsg: ''
};

export default function reducer(state = initState, action) {
    switch (action.type) {
        case GET_PRODUCT_REQUEST:
            return {
                ...state,
                isLoading: true,
                product: {},
                errorMsg: ''
            };
        case GET_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                product: action.result.data,
                errorMsg: ''
            };
        case GET_PRODUCT_FAIL:
            return {
                ...state,
                isLoading: false,
                product: {},
                errorMsg: '请求错误'
            };
        default:
            return state;
    }
}