import {GET_REGISTER_REQUEST, GET_REGISTER_SUCCESS, GET_REGISTER_FAIL} from 'actions/register';


const initState = {
    isLoading: false,
    regback: {},
    errorMsg: ''
};

export default function reducer(state = initState, action) {
    switch (action.type) {
        case GET_REGISTER_REQUEST:
            return {
                ...state,
                isLoading: true,
                regback: {},
                errorMsg: ''
            };
        case GET_REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                regback: action.result.data,
                errorMsg: ''
            };
        case GET_REGISTER_FAIL:
            return {
                ...state,
                isLoading: false,
                regback: {},
                errorMsg: '请求错误'
            };
        default:
            return state;
    }
}