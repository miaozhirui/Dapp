import React, { Component } from 'react';
import classnames from 'classnames';
import storage from 'good-storage';
import { utils } from 'libs';

export default class BetResult extends Component {

    constructor(props) {

        super(props)

        this.state = {

            isShowWait: true,
            isShowWin: false,
            isShowLost: false,
            // time:10,
            time: 10,
            betEth: '',
            winEth: '',
            points: "",
            officalPoint: "",
            isInDraw:false
        }
    }

    componentDidMount() {

        // let counter = 10;
        let counter = 10;
        let timer = setInterval(() => {

            if (counter == 1) {

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
        
        this.setState({

            isInDraw: true
        })
        let gameOutCome;

        let timer = setInterval(() => {

            gameOutCome = storage.get('gameOutCome');
       
            if (gameOutCome) {

                this.updateResult(gameOutCome);
                clearInterval(timer);
            }
        }, 1000)


    }

    updateResult(gameOutCome) {

        let winEth = +gameOutCome.winEth;
        let betEth = +gameOutCome.betEth;
        let num;

        if (gameOutCome.gameResult == 1) {

            this.setState({

                isShowWait: false,
                isShowWin: true,
                isShowLost: false,
                isInDraw: false,
                winEth: gameOutCome.winEth,
                points: gameOutCome.points,
                officalPoint: gameOutCome.officalPoint
            })

            num = utils.strip(+this.props.token + winEth - betEth);
        }

        if (gameOutCome.gameResult == 0) {

            this.setState({

                isShowWait: false,
                isShowWin: false,
                isShowLost: true,
                isInDraw:false,
                betEth: gameOutCome.betEth,
                points: gameOutCome.points,
                officalPoint: gameOutCome.officalPoint
            })
            num = utils.strip(+this.props.token - gameOutCome.betEth)

        }

        this.props.updateToken(num);
    }

    playAgain() {

        this.props.closePop();
    }

    generateResultPage() {

        let { isShowWait, isShowWin, isShowLost, isInDraw, time } = this.state;

        if(isInDraw) {

            return (
                <div className="in-draw">
                    <p>开奖中,请稍等...</p>
                </div>
                )
        }

        if (isShowWait) {


            return ( <div className = "wait-page">
                    <p>已邀请人数 <span>{this.props.invitePeople}</span></p>
                    <p> 庄家已提交! </p> 
                    <p> 请耐心等待... </p> 
                    <p> <span> { time } s </span>后开奖</p>
                </div>
            )
        }

        if (isShowWin) {

            return ( <div className = "win-page">
                <p> 您赢了! </p> <p> { this.state.winEth } < span > ETH < /span></p >
                <span className = "line"> < /span> <div className = "dice" >
                <div className = "left">
                <p> 您的赌注 </p> <ul> {
                    this.state.points.split(',').map((item, index) => (

                        <
                        li key = { index } className = { classnames('dice-layout', `dice${item}`) } > < /li>
                    ))
                } </ul> </div> <div className = "right" >
                <p> 结果 </p> <div className = { classnames('dice-layout', `dice${this.state.officalPoint}`) } > </div> </div> </div> </div>
            )
        }

        if (isShowLost) {

            return ( <div className = "win-page">
                <p> 您输了! </p> <p> { this.state.betEth } <span> ETH </span></p>
                <span className = "line"> </span> <div className = "dice">
                <div className = "left">
                <p> 您的赌注 </p> <ul> {
                    this.state.points.split(',').map((item, index) => (

                        <li key = { index } className = { classnames('dice-layout', `dice${item}`) } > < /li>
                    ))
                } </ul> </div> <div className = "right">
                <p> 结果 </p> <div className = { classnames('dice-layout', `dice${this.state.officalPoint}`) } > < /div> </div> </div> </div>
            )
        }
    }

    render() {

        let resultPage = this.generateResultPage();

        return ( <div id = "bet-result" className = "dialog" > { /*<span className="close" onClick={this.props.closePop}></span>*/ } 
            { resultPage } 
            {
                (!!this.state.isShowWait || !!this.state.isInDraw) ? '' :
                    < button className = "play-again"
                onClick = { e => this.playAgain() } > 再玩一次 < /button>
            }

            </div>
        )
    }
}