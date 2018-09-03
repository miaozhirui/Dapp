import {GET_WORDS_REQUEST, GET_WORDS_SUCCESS, GET_WORDS_FAIL} from 'actions/login';


const initArt = {
    isLoading: false,
    words: {},
    errorMsg: ''
};

export default function reducer(state = initArt, action) {
    switch (action.type) {
        case GET_WORDS_REQUEST:
            return {
                ...state,
                isLoading: true,
                words: {},
                errorMsg: ''
            };
        case GET_WORDS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                words: action.result.data,
                errorMsg: ''
            };
        case GET_WORDS_FAIL:
            return {
                ...state,
                isLoading: false,
                words: [],
                errorMsg: '请求错误'
            };
        default:
            return state;
    }
}