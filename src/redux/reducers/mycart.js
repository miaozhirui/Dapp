import {GET_MYCART_REQUEST, GET_MYCART_SUCCESS, GET_MYCART_FAIL,
        GET_MYCART_ORDER_REQUEST, GET_MYCART_ORDER_SUCCESS, GET_MYCART_ORDER_FAIL,
        GET_MYCART_DEL_REQUEST, GET_MYCART_DEL_SUCCESS, GET_MYCART_DEL_FAIL} from 'actions/mycart';


const initState = {
    isLoading: false,
    products: {

        cartItemList:[],
        cartTotal:0
    },
    order: {},
    del:{},
    errorMsg: ''
};

export default function reducer(state = initState, action) {

    switch (action.type) {
        case GET_MYCART_DEL_REQUEST:
            return {
                ...state,
                isLoading: true,
                del: {},
                errorMsg: ''
            };
        case GET_MYCART_DEL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                del: action.result.data,
                errorMsg: ''
            };
        case GET_MYCART_DEL_FAIL:
            return {
                ...state,
                isLoading: false,
                del: {},
                errorMsg: '请求错误'
            };

        case GET_MYCART_REQUEST:
            return {
                ...state,
                isLoading: true,
                // products: {},
                errorMsg: ''
            };
        case GET_MYCART_SUCCESS:
            return {
                ...state,
                isLoading: false,
                products: action.result.data.data,
                errorMsg: ''
            };
        case GET_MYCART_FAIL:
            return {
                ...state,
                isLoading: false,
                // products: {},
                errorMsg: '请求错误'
            };
        case GET_MYCART_ORDER_REQUEST:
            return {
                ...state,
                isLoading: true,
                order: {},
                errorMsg: ''
            };
        case GET_MYCART_ORDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                order: action.result.data,
                errorMsg: ''
            };
        case GET_MYCART_ORDER_FAIL:
            return {
                ...state,
                isLoading: false,
                order: {},
                errorMsg: '请求错误'
            };
        default:
            return state;
    }
}