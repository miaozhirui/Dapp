export const GET_PRODUCT_REQUEST = "product/GET_PRODUCT_REQUEST";
export const GET_PRODUCT_SUCCESS = "product/GET_PRODUCT_SUCCESS";
export const GET_PRODUCT_FAIL = "product/GET_PRODUCT_FAIL";

export const POST_PRODUCT_REQUEST = "product/POST_PRODUCT_REQUEST";
export const POST_PRODUCT_SUCCESS = "product/POST_PRODUCT_SUCCESS";
export const POST_PRODUCT_FAIL = "product/POST_PRODUCT_FAIL";

export function getproduct(num) {
    return {
        types: [GET_PRODUCT_REQUEST, GET_PRODUCT_SUCCESS, GET_PRODUCT_FAIL],
        promise: client => client.get('/api/goods/detail?id=' + num)
    }

}
export function addcartItem(data) {
    
    self = this;
    return {

        types: [POST_PRODUCT_REQUEST, POST_PRODUCT_SUCCESS, POST_PRODUCT_FAIL],
        promise: client => client.post('/api/shoppingCart/addItem', data),
        afterSuccess(dispatch, getState, result) {

            let data = result.data;

            if (data.resCode !== '0000') {

                console.log(data.resMessage);
                return;
            }

            self.props.history.push('/myCart');

        }
    }
    console.log(this.props)
}