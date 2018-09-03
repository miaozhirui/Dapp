import { browserHistory } from 'react-router';

export const GET_REGISTER_REQUEST = "register/GET_REGISTER_REQUEST";
export const GET_REGISTER_SUCCESS = "register/GET_REGISTER_SUCCESS";
export const GET_REGISTER_FAIL = "register/GET_REGISTER_FAIL";

export function getregister(context, data) {
    return {
        types: [GET_REGISTER_REQUEST, GET_REGISTER_SUCCESS, GET_REGISTER_FAIL],
        promise: client => client.post('/api/customer/register',data),
        afterSuccess(dispatch, getState, result){
            
            let data = result.data;

            if(data.resCode != '0000') {

                alert(data.resMessage);
                return;
            } 


            context.props.history.push('/myAccount');
        }
    }
}