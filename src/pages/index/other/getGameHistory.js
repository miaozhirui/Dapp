import { utils } from 'libs'; 

export default function() {

    
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