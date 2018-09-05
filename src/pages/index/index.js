import React, { Component } from 'react';
import classnames from 'classnames';
import './index.less';
import dice2Data from './other/dice';  
import eths from './other/eths'; 
import pageWeb3 from './other/pageWeb3';
import judgeUserIsLogin from './other/judgeUserIsLogin';
import moment from 'moment'; 
import { utils } from 'libs';     
import Login from './jsx/login';   
import Register from './jsx/register'; 
import toBetAction from './other/toBetAction';
import Account from './jsx/account';
import BetReult from './jsx/bet_result';
import RechargeWithDraw from './jsx/recharge_withdraw';
import storage from 'good-storage';
import getGameHistory from './other/getGameHistory';
import getAccount from './other/getAccount';
import {Spin} from 'antd';
      
moment.locale('zh-cn')   
  
export default class Index extends Component { 
    constructor(props) {
   
        super(props)     

        this.dice2Data = dice2Data; 
        this.selectedDice = [];
        this.currentSelected = {};
        this.previousSelected = {};  
 
        dice2Data.forEach(item => { 
 
            !!item.selected && this.selectedDice.push(item); 

        })    
        let winProb = this.getPercent(this.selectedDice.length, this.dice2Data.length);
        let odds = this.getOdds(this.selectedDice.length, this.dice2Data.length);
        let winEth = this.calculateEth(eths[0].value, odds);

        this.state = { 
            loading:false,
            token:0,
            winProb:winProb,
            odds:odds,  
            dice2: this.dice2Data, 
            eths,
            eth:eths[0].value,  
            winEth,
            metaMask: 0,//1: 用户未登录，2: 用户metaMask的所处的网络不对，3:用户当前账号正常
            gameHistoryList:[],
            isLogin: false,
            isShowLogin:false,
            isShowRegister: false,
            isShowAccount:false,//是否显示余额不足页面
            isShowBetResult: false,//是否显示下注结果页面
            isShowRechargeWithDraw:false,//是否显示充值页面
        } 
        
   
    }   

    updateBet() {
        
        let winProb = utils.strip(this.getPercent(this.selectedDice.length, this.dice2Data.length));//获取获胜率
        let odds = this.getOdds(this.selectedDice.length, this.dice2Data.length);//赔率
        this.maxBet = this.getMaxBet(odds);//最大下注

        let bet = utils.strip(+this.refs.bet.value);//设置下注量

        let dice2Data = this.dice2Data; //更新骰子的显示情况
        
        if(bet > this.maxBet) { //越界判断，当输入框的值大于最大值，就设置成最大值

            bet = utils.strip(this.maxBet);
        }
       
        let winEth = utils.strip(bet*odds);//用户可以赢得的钱

        eths.map(item => {

            if(item.value>this.maxBet && item.name!='最大'){

                item.disabled = true;
            } else {

                item.disabled = false;
            }
        })
        console.log(this.maxBet, eths)
        
        this.setState({

            winProb,//设置获胜率
            winEth,//设置可赢得钱
            dice2Data,//重置骰子的选择情况
            eths,//重置可选择的下注量
            eth: bet
        })
    }

    getMaxBet(odds) {
        
        let maxWin = 1;//最大的存赢钱
        return maxWin/(odds-1);
    }

    componentDidMount() { 
        
        this.updateBet();

        // pageWeb3.init(this);
         
        judgeUserIsLogin.init(this);
        getGameHistory.call(this);
        
        getAccount().then(data => {

            this.setState({

                token: utils.strip(data.token) 
            })
        })
    }

    updateToken(value){ 

        this.setState({

            token: utils.strip(value)
        })
    }

    selectDice(index, value) {
       

        if (this.previousSelected.value == value) {
            
            if (this.previousSelected.selected) {
                
                if(this.selectedDice.length == 1) return;

                this.dice2Data[index].selected = false;

                this.selectedDice = this.selectedDice.filter(item => {

                    return item.value != value;
                })
                
            } else {

                this.dice2Data[index].selected = true;

                this.selectedDice.push(this.dice2Data[index]);
            }

        } else {

            this.currentSelected = this.dice2Data[index];

            if (this.dice2Data[index].selected) {

                this.currentIndex = index;
                
                this.limitDiceMin(value);

            } else {

                this.dice2Data[index].selected = true;

                this.limitDiceMax();

            } 
        } 

        this.previousSelected = this.currentSelected;
        
        this.updateBet();
       
    } 

    changeEth(item) {
        
        if(item.disabled) return;

        if(item.name=='最大'){

            item.value = +this.maxBet;
        }

        this.refs.bet.value = item.value;
        

        this.updateBet();
    }  

    blurEthInput(e) {
        
        let bet = +e.target.value;

        if(bet>this.maxBet) {

            bet = this.maxBet
        }

        this.refs.bet.value = bet;

        this.updateBet();
        
    }
    changeEthInput(e) {

        this.setState({

            eth:e.target.value
        })
    }
    
    //增加eth
    increaseEth() {
        
        let eth = +this.state.eth + 0.01;

        if(eth >= this.maxBet) {

            eth = this.maxBet
        }
        
        this.refs.bet.value = eth;
        this.updateBet();
    }

    //减少eth
    decreaseEth() {

        let eth = this.state.eth - 0.01;

        if(eth < 0.01) {

            eth = 0.01;
        }

        this.refs.bet.value = eth;
        this.updateBet();
    }
    
    //计算用户得到多少eth
    calculateEth(eth, odds) {
        
        return ((+eth)*odds).toFixed(3)
    }

    limitDiceMax() {

        if (this.selectedDice.length >= 5) {


            let removeItem = this.selectedDice.shift();

            this.dice2Data.forEach(item => {

                if (item.value == removeItem.value) {

                    removeItem.selected = false;
                }
            })
        } 

        this.selectedDice.push(this.currentSelected);
    }
 
    limitDiceMin(value) { 
 
        if (this.selectedDice.length > 1) { 

            this.dice2Data[this.currentIndex].selected = false;
            this.selectedDice = this.selectedDice.filter(item => {
                return item.value != value;
            })
        }  
    }
    
    getPercent(a, b) { 

        return (a/b)*100;
    }

    getOdds(a, b) {

        return (b/a)*0.97;
    }
        
    //用户下注请求
    toBet() {
        
        toBetAction.call(this);

        return;
    } 

    toLogin() { 

        this.setState({

            isShowLogin: true
        })
    }

    loginSuccessCb(data) {
        
        console.log(data);


        this.setState({

            isLogin: true,
            isShowLogin: false,
            token:utils.strip(data.token)
        })
    }
 
    registerSuccessCb() {

        this.setState({

            isLogin: true,
            isShowRegister: false
        })
    }

    closePop() {

        this.setState({ 
            
            isShowRegister:false,
            isShowLogin: false,
            isShowAccount: false,
            isShowBetResult: false,
            isShowRechargeWithDraw:false
        })
    }
    
    showRegister() {
       
        this.setState({
            
            isShowLogin: false,
            isShowRegister: true
        })
    }

    groupDiceData() {

        let points = [];//用户选择的点数
        let betEth = this.state.eth;//用户下注的eth数量
        let winProb = this.state.winProb;//用户赢的概率
        let odds = this.state.odds;//用户赢得的赌注
        let winEth = this.state.winEth;//用户可能赢的eth
        
        this.state.dice2.forEach(item => {

            if(item.selected) {

                points.push(item.value);
            }
        })
 
        let data = {

            betEth, winProb, odds, winEth,
            points: points.join(','),
            gameType:1//1代表筛子游戏
        }
        
        return data;

 
    }

    recharge() {

        this.setState({

            isShowRechargeWithDraw:true
        })

        storage.set('recharge', true);
    }

    handleWithDraw(){

        this.setState({

            isShowRechargeWithDraw:true,
        })

        storage.set('recharge', false);
    }

    render() {
        
        let { metaMask, isLogin } = this.state;
        return (jsx); 
    }
}