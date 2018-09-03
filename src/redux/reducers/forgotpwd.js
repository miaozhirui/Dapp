import {SENDSMS, CHANGEPASSWORD} from '../actions/forgotpwd';

/*
* 初始化state
 */

const initState = {
    count: 0
};
/*
* reducer
 */
export default function reducer(state = initState, action) {
    switch (action.type) {
        case SENDSMS:
            return {
                count: state.count + 1
            };
        case CHANGEPASSWORD:
            return {
                count: state.count - 1
            };
        
        default:
            return state
    }
}
