import React, { Component } from 'react';
import classnames from 'classnames';
import storage from 'good-storage';

export default class BetResult extends Component {

    constructor(props){
        
        super(props)

        this.state = {

            isShowWait:true,
            isShowWin:false,
            isShowLost:false,
            time:10,
            // time:10
            betEth:'',
            winEth:'',
            points:"",
            officalPoint:""
        } 
    }

    componentDidMount(){

        // let counter = 10;
        let counter = 10;
        
        let timer = setInterval(() => {
            
            if(counter == 1){

                clearInterval(timer);
                
                this.showResultPage();
                return;
            }
            let time = --counter;
       
            this.setState({

                time
            })
        }, 1000)
    }

    showResultPage() {

        let gameOutCome = storage.get('gameOutCome');

        console.log(gameOutCome);
        if(gameOutCome.gameResult == 1){

            this.setState({
                
                isShowWait:false,
                isShowWin:true,
                isShowLost:false,
                winEth:gameOutCome.winEth,
                points:gameOutCome.points,
                officalPoint:gameOutCome.officalPoint
            })
        }

        if(gameOutCome.gameResult == 0){

            this.setState({
                
                isShowWait:false,
                isShowWin:false,
                isShowLost:true,
                betEth:gameOutCome.betEth,
                points:gameOutCome.points,
                officalPoint:gameOutCome.officalPoint
            })
        }
    }
    
    playAgain() {
        
        this.props.closePop();
    }

    generateResultPage() {

         let { isShowWait, isShowWin, isShowLost, time } = this.state;

        if(isShowWait) {
            

            return (
                <div className="wait-page">
                    <p>庄家已提交!</p>
                    <p>请耐心等待...</p>
                    <p><span>{time}s</span>后开奖</p>
                </div>
                )
        }

        if(isShowWin) {
 
            return (
                <div className="win-page" >
                    <p>您赢了!</p>
                    <p>{this.state.winEth} <span>ETH</span></p>
                    <span className="line"></span>
                    <div className="dice">
                        <div className="left">
                            <p>您的赌注</p>
                            <ul>
                            {
                                this.state.points.split(',').map((item,index) => (

                                    <li key={index} className={classnames('dice-layout',`dice${item}`)} ></li>
                                ))
                            }
                            </ul>
                        </div>
                        <div className="right">
                            <p>结果</p>
                            <div className={classnames('dice-layout',`dice${this.state.officalPoint}`)} ></div>
                        </div>
                    </div>
                </div>
            )
        }

        if(isShowLost) {

            return (
                <div className="win-page">
                    <p>您输了!</p>
                    <p>{this.state.betEth} <span>ETH</span></p>
                    <span className="line"></span>
                    <div className="dice">
                        <div className="left">
                            <p>您的赌注</p>
                            <ul>
                               {
                                    this.state.points.split(',').map((item,index) => (

                                        <li key={index} className={classnames('dice-layout',`dice${item}`)} ></li>
                                    ))
                               }
                            </ul>
                        </div>
                        <div className="right">
                            <p>结果</p>
                            <div className={classnames('dice-layout',`dice${this.state.officalPoint}`)} ></div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    render(){
        
        let resultPage = this.generateResultPage();

        return (
            <div id="bet-result" className="dialog">
                {/*<span className="close" onClick={this.props.closePop}></span>*/}
                {resultPage}
                {
                    !!this.state.isShowWait ? ''
                    :<button className="play-again" onClick={e=>this.playAgain()}>再玩一次</button>
                }
                
            </div>
            )
    }
}