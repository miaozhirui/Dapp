import {GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAIL} from 'actions/myorder';

const initState = {
    isLoading: false,
    order: {},
    errorMsg: ''
};

export default function reducer(state = initState, action) {
    console.log(state,action)
    switch (action.type) {
        case GET_ORDER_REQUEST:
            return {
                ...state,
                isLoading: true,
                order: {},
                errorMsg: ''
            };
        case GET_ORDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                order: action.result.data.data,
                errorMsg: ''
            };
        case GET_ORDER_FAIL:
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