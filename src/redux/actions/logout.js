/*action*/

export const INCREMENT = "counter/INCREMENT";
export const DECREMENT = "counter/DECREMENT";
export const RESET = "counter/RESET";

export function logout(context) {
    return {
        types: [INCREMENT,DECREMENT,RESET],
        promise: client=>client.get('/api/customer/logout'),
        afterSuccess(dispatch, getState, result){
            
            let data = result.data;

            if(data.resCode != '0000') {

                alert(data.resMessage);
                return;
            } 


            context.props.history.push('/login');
        }
    }
}

