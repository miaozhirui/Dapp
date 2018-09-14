import React, { Component } from 'react';
import { message } from 'antd';
import { utils } from 'libs';
import classnames from 'classnames';
import storage from 'good-storage';

export default class Register extends Component{

    constructor(props) {

        super(props)

        this.state = {

            isShowEthHelp: false
        }


    }

    login() {
       
       let userName = this.refs.userName.value;
       let password = this.refs.password.value;
       let secondPassword = this.refs.secondPassword.value;
       let ethAddress = this.refs.ethAddress.value;
       console.log(typeof ethAddress)
       console.log(ethAddress)

       if(utils.isEmpty(userName)){

            message.error('请填写用户名')
            return;
       }
       if(utils.isEmpty(password)) {

            message.error('请填写密码');
            return;
       }

       if(password !== secondPassword) {

          message.error('两次输入的密码不正确');
          return;
       }

       if(utils.isEmpty(ethAddress)) {

            message.error('请填写钱包地址');
            return ;
       }

       if(!ethAddress.startsWith('0x')) {

            message.error('钱包地址格式不对');
            return;
       }

       if(ethAddress.length !== 42) {

            message.error('钱包地址格式不对');
            return;
       }

       try{

          ethAddress.toString(10);
       }catch(e) {
          message.error('钱包地址格式不对');
          return;
       }  


        
       let data = { userName, password, ethAddress }

       let promise = utils.fetch({

            url: '/api/user/register',
            data
       })

       promise.then(res => {

            message.success('注册成功，请下注');
            
            this.props.registerSuccessCb();
       })  
    }

    showEthHelp() {

        this.setState({

            isShowEthHelp: true
        })
    }

    hideEthHelp(){

        this.setState({

            isShowEthHelp: false
        })
    }
 
    render() {

        return (
                <div id="register" className="dialog">
                   <span className="close" onClick={this.props.closePop}></span>
                    <div className="logo"></div>
                    <div className="login-layout db">
                        <div className="left ">用户名</div>
                        <div className="right db1 bm">
                            <input ref="userName" type="text" placeholder="请输入用户名"/>
                        </div>
                    </div>
                    <div className="login-layout db">
                        <div className="left">密码</div>
                        <div className="right db1 bm">
                            <input ref="password" type="password" placeholder="请输入密码"/>
                        </div>
                    </div>

                    <div className="login-layout db">
                        <div className="left">确认密码</div>
                        <div className="right db1 bm">
                            <input ref="secondPassword" type="password" placeholder="请再次输入密码"/>
                        </div>
                    </div>

                    <div className="login-layout db">
                        <div className="left">钱包地址</div>
                        <div className="right db1 bm">
                            <input ref="ethAddress" type="type" placeholder="请输入钱包地址"/>
                        </div>
                        <div className="btn bm" onClick={this.showEthHelp.bind(this)}>如何获取<br/> 钱包地址？</div>
                    </div>
                    <button onClick={this.login.bind(this)}>注册</button>
                  
                  {
                    this.state.isShowEthHelp ? 
                        <div className="eth-help">
                          <span className="close" onClick={this.hideEthHelp.bind(this)}></span>
                          <h3>获取ETH钱包地址</h3>
                          <div className="guide"></div>
                          <h5>点击metamask首页昵称处<br/>可复制钱包地址</h5>
                        </div>
                    :""
                  }
                    
                </div>
            )
    }
}