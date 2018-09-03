import { utils } from 'libs';

export default function getAccount() {

    return new Promise((resolve, reject) => {

        let promise = utils.fetch({
            
            method: 'get',
            url: "/api/user/getAccount"
        })

        promise.then(res => {
            
            if(res.code === -1) {

                return;
            }
            
            resolve(res);
        })
    })
}