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

        this.maxEth = eths[eths.length-1].value;
        this.minEth = eths[0].value;
 
        this.state = { 
            
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
 
    componentDidMount() { 
 
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

        let winProb = this.getPercent(this.selectedDice.length, this.dice2Data.length);
        let odds = this.getOdds(this.selectedDice.length, this.dice2Data.length);
        let winEth = this.calculateEth(this.state.eth, odds);
       
        this.setState({
            winProb: winProb,
            odds:odds, 
            dice2: this.dice2Data,
            winEth
        })
    } 

    changeEth(value) {
        
        let winEth = this.calculateEth(value, this.state.odds);
        this.setState({

            eth:value,
            winEth
        })
    }

    ethInput(e) {
        
        let eth = e.target.value;


        this.setState({

            eth, 
        })
    }
    
    //增加eth
    increaseEth() {
        
        let eth = this.state.eth + 0.01;

        eth = +(eth.toFixed(2));

        if(eth >= this.maxEth) {

            eth = this.maxEth
        }

        let winEth = this.calculateEth(eth, this.state.odds);

        this.setState({ eth, winEth })
    }

    //减少eth
    decreaseEth() {

        let eth = this.state.eth - 0.01;

        eth = +(eth.toFixed(2));

        if(eth < 0.01) {

            eth = 0.01;
        }
        
        let winEth = this.calculateEth(eth, this.state.odds);

        this.setState({ eth, winEth })
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

        return parseFloat(((a/b)*100).toFixed(2));
    }

    getOdds(a, b) {

        return parseFloat(((b/a)*0.97).toFixed(2));
    }
        
    //用户下注请求
    toBet() {
        
        toBetAction.call(this);

        return;



        let accounts = pageWeb3.accounts;
        let web3 = pageWeb3.web3;
        
        console.log(accounts)
        web3.eth.sendTransaction({  

            from:accounts[0],  
            to:this.officialEthAddress,
            value: web3.toWei(this.state.eth, 'ether')
        }, function(err, receipt) {

            if(err) { 
 
                console.log('您拒绝了下注请求:(');
                return;
            } 
            

            const result = web3.eth.getTransaction(receipt, function(err, data) {

                if(err) { return }
                
                console.log(data)
 
                let eth = web3.fromWei(data.value.toNumber(), 'ether');//用户转的eth
                let gasPrice = web3.fromWei(data.gasPrice.toNumber(), 'ether'); //用户的转的gas费用
                let time = moment().format('YYYY/MM/DD h:mm:ss a'); //转账成功的时间
                let userMoney = eth; //用户转了多少个eth给我们，我就给它多少代币
                let userEthAddress = accounts[0]; //用户eth的钱包地址
                let officialEthAddress = this.officialEthAddress //官方自己的钱包地址

                console.log(eth, gasPrice, userMoney, userEthAddress, officialEthAddress, time)

                let promise = utils.fetch({

                    url: '/saveTransferInfo',
                    data: { eth, gasPrice, userMoney, userEthAddress, officialEthAddress, receipt, time }
                })

                promise.then(res => {

                    console.log(res)
                })
            })
        })   
    }

    toLogin() { 

        this.setState({

            isShowLogin: true
        })
    }

    loginSuccessCb() {
        
        this.setState({

            isLogin: true,
            isShowLogin: false
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