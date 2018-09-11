import storage from 'good-storage';
import { utils } from 'libs';

function gameRecord(data) {

    let promise = utils.fetch({

        url: '/api/user/gameRecord',
        data
    })

    promise.then(res => {

        storage.set('gameOutCome', res);
        
    })
}
export default function() {

    let eth = +this.state.eth;

    let promise = utils.fetch({

        method: 'get',
        url: '/api/user/getAccount',
    })

    promise.then(res => {

        let userToken = +utils.strip(res.token);

        if (eth > userToken) { //用户代币不够

            this.setState({

                isShowAccount: true
            })
            return;
        }

        let data = this.groupDiceData();

        this.setState({

            isShowBetResult: true
        })

        storage.remove('gameOutCome');

        setTimeout(() => {

            gameRecord.call(this, data);
        }, 10000);

    })

}