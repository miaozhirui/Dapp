// import web3 from 'web3';

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

            this.context.setState({

                metaMask: 4
            })

            return false;
        }

        return true;
    }

    getEthAccounts() {

        return new Promise((resolve, reject) => {
           
            this.accounts = this.web3.eth.accounts
            
            if (!this.accounts[0]) {

                this.context.setState({

                    metaMask: 1
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
            console.log(netId)
            switch (netId) {

                case "5777":
                case "1":

                    this.context.setState({

                        metaMask: 3
                    })
                    break;

                default:
                    this.context.setState({

                        metaMask: 2
                    })
            }
        })
    }


}
// 0x453a3b3eb050344e62565dce44b03ff9ff7af154
// 0xedd2b7d01f82c0575638aff8d48976dd153c5545


export default new pageWeb3;