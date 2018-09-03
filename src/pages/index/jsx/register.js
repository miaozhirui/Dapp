import React, { Component } from 'react';
import { message } from 'antd';
import { utils } from 'libs';
import classnames from 'classnames';
import storage from 'good-storage';

export default class Register extends Component{

    login() {
       
       let userName = this.refs.userName.value;
       let password = this.refs.password.value;
       let ethAddress = this.refs.ethAddress.value;

       if(utils.isEmpty(userName)){

            message.error('请填写用户名')
            return;
       }
       if(utils.isEmpty(password)) {

            message.error('请填写密码');
            return;
       }

       if(utils.isEmpty(ethAddress)) {

            message.error('请填写钱包地址');
            return ;
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
                        <div className="left">钱包地址</div>
                        <div className="right db1 bm">
                            <input ref="ethAddress" type="type" placeholder="请输入钱包地址"/>
                        </div>
                    </div>
                    <button onClick={this.login.bind(this)}>注册</button>
                </div>
            )
    }
}