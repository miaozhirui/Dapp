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
                isShowWithDraw:false
            }
        }

        if(!recharge) {

            this.state = {

                token: 0,
                isShowRecharge: false,
                isShowWithDraw: true
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
        console.log(this.props.context)
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
                            <p>余额 <span>{ this.state.token }</span></p>
                            <input type="text" ref="recharge" placeholder="请输入金额" />
                            <button onClick={e=>this.recharge()}>充值</button>
                        </div>
                  )
        }
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
            </div>
            )
    }
}


