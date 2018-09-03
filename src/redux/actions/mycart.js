export const GET_MYCART_REQUEST = "mycart/GET_MYCART_REQUEST";
export const GET_MYCART_SUCCESS = "mycart/GET_MYCART_SUCCESS";
export const GET_MYCART_FAIL = "mycart/GET_MYCART_FAIL";
export const GET_MYCART_ORDER_REQUEST = "mycart/GET_MYCART_ORDER_REQUEST";
export const GET_MYCART_ORDER_SUCCESS = "mycart/GET_MYCART_ORDER_SUCCESS";
export const GET_MYCART_ORDER_FAIL = "mycart/GET_MYCART_ORDER_FAIL";
export const GET_MYCART_DEL_REQUEST = "mycart/GET_MYCART_DEL_REQUEST";
export const GET_MYCART_DEL_SUCCESS = "mycart/GET_MYCART_DEL_SUCCESS";
export const GET_MYCART_DEL_FAIL = "mycart/GET_MYCART_DEL_FAIL";

export const POST_MYCART_UPDATE_REQUEST = "mycart/POST_MYCART_UPDATE_REQUEST";
export const POST_MYCART_UPDATE_SUCCESS = "mycart/POST_MYCART_UPDATE_SUCCESS";
export const POST_MYCART_UPDATE_FAIL = "mycart/POST_MYCART_UPDATE_FAIL";


export function getshoppingcartlist(num) {
    return {
        types: [GET_MYCART_REQUEST, GET_MYCART_SUCCESS, GET_MYCART_FAIL],
        promise: client => client.get('/api/shoppingCart/list')
    }
}

export function payproduct(context, data) {

    console.log("testorder");
    return {
        types: [GET_MYCART_ORDER_REQUEST, GET_MYCART_ORDER_SUCCESS, GET_MYCART_ORDER_FAIL],
        promise: client => client.post('/api/order/create', data),
        
        afterSuccess(dispatch, getState, result) {

            let data = result.data;

            if (data.resCode != '0000') {

                alert(data.resMessage);
                return;
            }

            context.props.history.push('/myorder');
        }
    }
}


export function deleteItem(num) {

    console.log("testdeleteItem");
    return {
        types: [GET_MYCART_DEL_REQUEST, GET_MYCART_DEL_SUCCESS, GET_MYCART_DEL_FAIL],
        promise: client => client.delete('/api/shoppingCart/deleteItem?id=' + num),

        afterSuccess(dispatch, getState, result) {

            let data = result.data;

            if (data.resCode != '0000') {

                alert(data.resMessage);
                return;
            }

            location.reload();
        }
    }
}

export function updateItem(data) {

    return {
        types: [POST_MYCART_UPDATE_REQUEST, POST_MYCART_UPDATE_SUCCESS, POST_MYCART_UPDATE_FAIL],
        promise: client => client.post('/api/shoppingCart/updateItem', data),

        afterSuccess(dispatch, getState, result) {

            let data = result.data;

            if (data.resCode != '0000') {

                alert(data.resMessage);
                return;
            }

            location.reload();
        }
    }
}