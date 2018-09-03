import React, { Component } from 'react';
import { message } from 'antd';
import { utils } from 'libs';
import classnames from 'classnames';
import storage from 'good-storage';

export default class Login extends Component{

    login() {
       
       let userName = this.refs.userName.value;
       let password = this.refs.password.value; 

       if(utils.isEmpty(userName)){

            message.error('请填写用户名')
            return;
       }
       if(utils.isEmpty(password)) {

            message.error('请填写密码');
            return;
       }
        
       let data = { userName, password }

       let promise = utils.fetch({

            url: '/api/user/login',
            data
       })

       promise.then(res => {

            if(res.status === 1) {

                message.error('用户名或密码错误');
                return ;
            }
            
            storage.set('userInfo', res);
            message.success('登录成功，请下注');
  
            this.props.loginSuccessCb();
       }) 
    }


   
    render() {

        return (
                <div id="login" className="dialog">
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
                    <p className="register" onClick={this.props.showRegister}>注册</p>
                    <button onClick={this.login.bind(this)}>登录</button>
                </div>
            )
    }
}