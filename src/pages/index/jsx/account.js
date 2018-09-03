import React, { Component } from 'react';
import classnames from 'classnames';
import config from 'config';
import pageWeb3 from '../other/pageWeb3';
import { message } from 'antd';
import { utils } from 'libs';
import moment from 'moment';
import storage from 'good-storage';
import fillmoney from '../other/fillmoney';

export default class Account extends Component{

    constructor(props) {

        super(props)

        this.state = ({

            token: 0,
            isShowRecharge:true,
            isShowLeftMoney: false
        })
    }

    fillMoney() {
        

        let num = this.refs.ethNum.value;
       
        fillmoney({ num }).then(data=>{

            this.setState({

                token:utils.strip(data.token),
                isShowLeftMoney:true,
                isShowRecharge: false
            })

            this.props.updateToken(data.token);
            message.success('充值成功');
        })
  
    }

    render() {

        return (
            <div id="account" className="dialog">

                <span className="close" onClick={this.props.closePop}></span>
                <div className={classnames("money-not-enough",{show:this.state.isShowRecharge})}>

                    <h3>余额不足</h3>
                    <input ref="ethNum" type='text' placeholder="输入要充值的eth数量" />
                    <button onClick={e=>this.fillMoney()}>充值</button>
                </div>

                <div className={classnames("left-money", {show:this.state.isShowLeftMoney})}>
                    <h3>余额</h3>
                    <span className="icon"></span>
                    <h2>{this.state.token}</h2>
                </div>
            </div>
            )
    }
}













