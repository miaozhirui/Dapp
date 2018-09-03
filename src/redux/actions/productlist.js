export const GET_PRODUCTLIST_REQUEST = "productlist/GET_PRODUCTLIST_REQUEST";
export const GET_PRODUCTLIST_SUCCESS = "productlist/GET_PRODUCTLIST_SUCCESS";
export const GET_PRODUCTLIST_FAIL = "productlist/GET_PRODUCTLIST_FAIL";

export const ADD_SHOPPINGCART_REQUEST = "productlist/ADD_SHOPPINGCART_REQUEST";
export const ADD_SHOPPINGCART_SUCCESS = "productlist/ADD_SHOPPINGCART_SUCCESS";
export const ADD_SHOPPINGCART_FAIL = "productlist/ADD_SHOPPINGCART_FAIL";

export function getproductlist(num) {
    return {
        types: [GET_PRODUCTLIST_REQUEST, GET_PRODUCTLIST_SUCCESS, GET_PRODUCTLIST_FAIL],
        promise: client => client.get('/api/goods/list?pageNo=1')
    }
}

export function addcartItems(context, data)
{
    console.log("addcartItems");


    return {
        types: [ADD_SHOPPINGCART_REQUEST, ADD_SHOPPINGCART_SUCCESS, ADD_SHOPPINGCART_FAIL],
        promise: client => client.post('/api/shoppingCart/addItem',data),

        afterSuccess(dispatch, getState, result) {

            let data = result.data;

            if(data.resCode!=='0000'){

                console.log(data.resMessage);
                return;
            }   
        
          context.props.history.push('/myCart');
            
        }
    }
}