export const GET_MYACCOUNT_REQUEST = "myaccount/GET_MYACCOUNT_REQUEST";
export const GET_MYACCOUNT_SUCCESS = "myaccount/GET_MYACCOUNT_SUCCESS";
export const GET_MYACCOUNT_FAIL = "myaccount/GET_MYACCOUNT_FAIL";
export const GET_MYACCOUNT_MINER_REQUEST = "myaccount/GET_MYACCOUNT_MINER_REQUEST";
export const GET_MYACCOUNT_MINER_SUCCESS = "myaccount/GET_MYACCOUNT_MINER_SUCCESS";
export const GET_MYACCOUNT_MINER_FAIL = "myaccount/GET_MYACCOUNT_MINER_FAIL";

export function getaccount(num) {
    return {
        types: [GET_MYACCOUNT_REQUEST, GET_MYACCOUNT_SUCCESS, GET_MYACCOUNT_FAIL],
        promise: client => client.get('/api/account/getacount')
    }
}

export function getaccountminer(num) {
    return {
        types: [GET_MYACCOUNT_MINER_REQUEST, GET_MYACCOUNT_MINER_SUCCESS, GET_MYACCOUNT_MINER_FAIL],
        promise: client => client.get('/api/miner/list')
    }
}