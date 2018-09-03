import { Modal } from 'antd';

class pageWeb3 {

    constructor() {

    }

    init(context) {

        this.context = context;

        if (!this.checkMetaMask()) return;
        this.getEthAccounts().then(() => {

            this.initWeb3NetWork();
        })

    }

    checkMetaMask() {

        if (typeof window.web3 !== 'undefined') {

            let provider = window.web3.currentProvider
            this.web3 = new Web3(provider);

        } else {

            Modal.warning({
                title:"安装MetaMask",
                content: '<p>您需要一个兼容Web3的钱包来玩我们的游戏</p><a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en">获取MetaMask</a>'
            })

            return false;
        }

        return true;
    }

    getEthAccounts() {

        return new Promise((resolve, reject) => {
           
            this.accounts = this.web3.eth.accounts
            
            if (!this.accounts[0]) {

                Modal.warning({

                    title: '登录MetaMask',
                    content: '请登录MetaMask以继续'
                })
          
                let timer = setInterval(() => {

                    this.accounts = this.web3.eth.accounts;

                    if (this.accounts[0]) {
                        
                        resolve();
                        clearInterval(timer);
                        return;
                    }

                    console.info('=====  invalid eth address =====');

                }, 1000)

            } else {

                resolve()
            }
        })
    }

    initWeb3NetWork() {

        this.web3.version.getNetwork((err, netId) => {

            switch (netId) {

                case "5777":
                case "1":

                    // this.context.setState({

                    //     metaMask: 3
                    // })
                    break;

                default:
                    Modal.warning({
                        title: '切换到主网',
                        content: '我们的游戏仅在主网上提供 - 请通过Metamask进行切换'
                    })
            }
        })
    }


}


export default new pageWeb3;