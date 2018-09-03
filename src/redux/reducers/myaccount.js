import {GET_MYACCOUNT_REQUEST, GET_MYACCOUNT_SUCCESS, GET_MYACCOUNT_FAIL,GET_MYACCOUNT_MINER_REQUEST, GET_MYACCOUNT_MINER_SUCCESS, GET_MYACCOUNT_MINER_FAIL} from 'actions/myaccount';


const initState = {
    isLoading: false,
    accounts: {},
    miners: {},
    errorMsg: ''
};

export default function reducer(state = initState, action) {
    switch (action.type) {
        case GET_MYACCOUNT_REQUEST:
            return {
                ...state,
                isLoading: true,
                accounts: {},
                errorMsg: ''
            };
        case GET_MYACCOUNT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                accounts: action.result.data,
                errorMsg: ''
            };
        case GET_MYACCOUNT_FAIL:
            return {
                ...state,
                isLoading: false,
                accounts: {},
                errorMsg: '请求错误'
            };

        case GET_MYACCOUNT_MINER_REQUEST:
            return {
                ...state,
                isLoading: true,
                miners: {},
                errorMsg: ''
            };
        case GET_MYACCOUNT_MINER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                miners: action.result.data,
                errorMsg: ''
            };
        case GET_MYACCOUNT_MINER_FAIL:
            return {
                ...state,
                isLoading: false,
                miners: {},
                errorMsg: '请求错误'
            };
        default:
            return state;
    }
}