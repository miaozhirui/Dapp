import React, {Component} from 'react';
import { message } from 'antd';
import { utils } from 'libs';
import moment from 'moment';
import config from 'config';
import classnames from 'classnames';
import storage from 'good-storage';
import fillmoney from '../other/fillmoney';

export default class RechargeWithDraw extends Component {

    constructor(props) {

        super(props)
        

        let recharge = storage.get('recharge');

        if(recharge) {

            this.state = {

                token: 0,
                isShowRecharge:true,
                isShowWithDraw:false,
                isShowHelp:false
            }
        }

        if(!recharge) {

            this.state = {

                token: 0,
                isShowRecharge: false,
                isShowWithDraw: true,
                isShowHelp:false
            }
        }

        
        
    }

    componentDidMount() {

        let promise = utils.fetch({
            
            method:'get',
            url: '/api/user/getAccount',
        })

        promise.then(res => {

            this.setState({

                token: utils.strip(res.token)
            })
        })
    }

    withdraw() {

        let ethnum = this.refs.ethnum.value;

        if(ethnum <= 0) {

            message.error('金额需要大于0');
            return ;
        }

        if(ethnum > this.state.token) {

            message.error('余额不足');
            return;
        }

        let time = moment().format('YYYY/MM/DD h:mm:ss a');
        let token = ethnum;
        let from = config.officialEthAddress;

        let data = { time, token, from }

        let promise = utils.fetch({

            url: '/api/user/withdraw',
            data
        })

        promise.then(res => {

            message.success('提交成功,系统审核中,1-3个工作日到账1');
            this.setState({

                token: utils.strip(this.state.token-token)
            })
        })
    } 

    recharge() {
        
        let num = this.refs.recharge.value;

        fillmoney.call(this.props.context, { num }).then(data=>{

            this.setState({

                token:utils.strip(data.token)
            })

            this.props.updateToken(data.token);
        })
    }

    showRecharge() {
        
        this.setState({

            isShowWithDraw: false,
            isShowRecharge: true
        })
    }

    showWithDraw() {

        this.setState({

            isShowWithDraw: true,
            isShowRecharge: false
        })
    }

    showContent() {

        if(this.state.isShowWithDraw) {

            return (
                 <div className="withdraw">
                            <p>余额 <span>{ this.state.token }</span></p>
                            <input type="text" ref="ethnum" placeholder="请输入金额" />
                            <button onClick={e=>this.withdraw()}>提现</button>
                  </div>
                )
        }

        if(this.state.isShowRecharge) {

            return (
                        <div className="recharge">
                            <button className="recharge-help-btn" onClick={this.showHelp.bind(this)}>充值须知</button>
                            <p>余额 <span>{ this.state.token }</span></p>
                            <input type="text" ref="recharge" placeholder="请输入金额" />
                            <button onClick={e=>this.recharge()}>充值</button>
                        </div>
                  )
        }
    }

    showHelp() {

        this.setState({

            isShowHelp:true
        })
    }

    hideHelp() {

        this.setState({

            isShowHelp: false
        })
    }

    render() {

        return (
        
            <div className="recharge-withdraw dialog">
                <span className="close" onClick={this.props.closePop}></span>

                <div className="container">
                    <div className="tab">
                        <div 
                            className={classnames("left", {selected:this.state.isShowRecharge})}
                            onClick = {e=>this.showRecharge()}
                            >充值</div>
                        <div 
                            className={classnames("right", {selected: this.state.isShowWithDraw})}
                            onClick = {e=>this.showWithDraw()}
                            >提现</div>
                    </div>
                    
                    {this.showContent()}
                </div>
                
                {
                    this.state.isShowHelp ? 
                        <div className="recharge-help">
                            <span className="close" onClick={this.hideHelp.bind(this)}></span>
                            <h4 className="title">充值须知</h4>
                            <h4>什么是“钱包地址”？</h4>
                            <p>您的公开钱包地址（如0xaba935f589805095a892ecefdb6eb83eff45d67）是您钱包的独特标识符。它和名字一样。您可以将其与他人共享，它可被用于向您的钱包转移资产。</p>
                            <h4>什么是以太币(ETH)？我为什么需要以太币？</h4>
                            <p>
                                以太币是构建在的以太坊网络使用的数字货币。以太币和任何其他货币一样——其价值随市场波动。<br/> 
                                您需要将您的货币（美元、加元、英镑）兑换为以太币，以在以太坊网络上支付——如购买XXX。<br/>
                            </p>
                            <h4>多长时间后可以收到以太币？</h4>
                            <p>如果这是您第一次购买以太币，根据不同交易所，需要验证的时间长短也不懂，时间最长可能需要1-2天，您可以稍微休息一下。此外，您需要将在您的交易所绑定银行账户（而非信用卡），您的银行可能需要几天核验费用。</p>
                            <h4>什么是Etherscan？ </h4>
                            <p>Etherscan是一个以太坊网络上的只读界面。它告诉您区块链上发生的一切。它帮助您验证交易成功，并追踪其他关于交易和地址的有用细节。 </p>
                            <h4>我的交易失败？</h4>
                            <p>交易失败可能的原因包括：人为将gas限制设置得过低，或您钱包中的ETH不足以支付。</p>
                            <h4>我的交易失败了，但仍收取了我的gas。</h4>
                            <p>在区块链上处理请求时，便需要支付Gas。即使交易失败，仍需要运算能力确认交易是否能成功。以太坊网络收取执行的操作交易失败前的gas。这些交易费不支付给我们团队，而支付给以太坊网络和矿工。</p>
                            <h4>我的交易超时了。</h4>
                            <p>当交易“超时”时，这并不意味着交易失败了，只意味着以太坊网络非常繁忙。这可能在高gas价格或网络拥堵严重时发生。</p>
                        </div>
                    :""
                }
                
            </div>
            )
    }
}


