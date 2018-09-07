import { utils } from 'libs';

export default function() {




    let getHistory = () => {

        let promise = utils.fetch({

            method: 'get',
            url: '/api/game/getHistoryList'
        })

        promise.then(res => {

            this.setState({

                gameHistoryList: res
            })
        })
    }


    setInterval(getHistory, 3000);

    getHistory();
}