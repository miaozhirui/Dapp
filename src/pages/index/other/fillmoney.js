import config from 'config';
import pageWeb3 from '../other/pageWeb3';
import { message } from 'antd';
import moment from 'moment';
import { utils } from 'libs';
import storage from 'good-storage';

export default function fillmoney(opt) {

    return new Promise((resolve, reject) => {

        pageWeb3.init(); //检查metaMask的网络情况

        let officialEthAddress = config.officialEthAddress;
        let accounts = pageWeb3.accounts;
        let web3 = pageWeb3.web3;
        let ethNum = opt.num;
        let self = this;

        web3.eth.sendTransaction({

            from: accounts[0],
            to: officialEthAddress,
            value: web3.toWei(ethNum, 'ether')

        }, function(err, receipt) {

            if (err) {
                message.error('您拒绝了充值请求:(');
                return;
            }

            const result = web3.eth.getTransaction(receipt, function(err, data) {

                if (err) return;

                let eth = web3.fromWei(data.value.toNumber(), 'ether'); //用户转的eth

                let gasPrice = web3.fromWei(data.gasPrice.toNumber(), 'ether');
                let time = moment().format('YYYY/MM/DD h:mm:ss a'); //转账成功的时间
                let from = accounts[0]; //用户eth的钱包地址
                let to = officialEthAddress;

                let params = { eth, gasPrice, from, to, time }

                let promise = utils.fetch({

                    url: '/api/user/saveTransferInfo',
                    data: params
                })

                promise.then(res => {

                    let token = utils.strip(res.token);

                    message.success('充值成功');
                    resolve(res);
                })
            })
        })

    })
}