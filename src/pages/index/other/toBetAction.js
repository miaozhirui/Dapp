import storage from 'good-storage';
import { utils } from 'libs';

export default function() {

    let eth = this.state.eth;

    let promise = utils.fetch({

        method: 'get',
        url: '/api/user/getAccount',
    })

    promise.then(res => {

        let userToken = utils.strip(res.token);

        if (eth > userToken) { //用户代币不够

            this.setState({

                isShowAccount: true
            })
            return;
        }

        let data = this.groupDiceData();

        let promise = utils.fetch({

            url: '/api/user/gameRecord',
            data
        })

        promise.then(res => {

            storage.set('gameOutCome', res);

            this.setState({

                isShowBetResult: true
            })
        })
    })



}