export const INCREMENT = "withdrawal/INCREMENT";
export const DECREMENT = "withdrawal/DECREMENT";
export const RESET = "withdrawal/RESET";

export function getMoney(data) {

    let self = this;
    return {
        
        types: [INCREMENT,DECREMENT,RESET],
        promise: client => client.post('/api/account/withdrawAccount', data),
        afterSuccess(dispatch, getState, result) {

            let data = result.data;

            if (data.resCode !== '0000') {

                console.log(data.resMessage);
                return;
            } 

            alert('提现成功');

        }
    }
}

