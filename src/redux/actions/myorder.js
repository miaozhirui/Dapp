export const GET_ORDER_REQUEST = "myorder/GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "myorder/GET_ORDER_SUCCESS";
export const GET_ORDER_FAIL = "myorder/GET_ORDER_FAIL";
 
export function getorder(opt) {

    let orderStatus = opt.orderStatus || '';
    return {
        types: [GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAIL],
        promise: client => client.get('/api/order/list?pageNo=1&orderStatus='+orderStatus)
    }
}
