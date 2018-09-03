
import { utils } from 'libs';

class JudgeUserIsLogin {

    constructor() {


    }

    init(context) {
        
        let promise = utils.fetch({
            
            method: 'get',
            url: '/api/user/isLogin',

        })

        promise.then(res => {

            if(res.isLogin === false) { //表示没有登录
                
                context.setState({

                    isLogin: false
                })
                return ;
            } else {

                context.setState({

                    isLogin: true
                })
                return;
            }
        })
    }
} 

export default new JudgeUserIsLogin();