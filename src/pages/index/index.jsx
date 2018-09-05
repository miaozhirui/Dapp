
<div id="home">
    <Spin size="large" wrapperClassName="loading" spinning={this.state.loading}>
        <nav>
            <div className="content">
                <div className="left">
                <span className="logo"></span>
                </div>
                <div className="right">222</div>
            </div>
        </nav>
        <div className="game">
            {
                this.state.isShowLogin ?
                    <Login 
                    loginSuccessCb = {this.loginSuccessCb.bind(this)} 
                    closePop = {this.closePop.bind(this)}
                    showRegister = {this.showRegister.bind(this)}
                    />
                : ""
            }
            
            {
                this.state.isShowRegister ?
                   <Register 
                    closePop = {this.closePop.bind(this)}
                    registerSuccessCb = {this.registerSuccessCb.bind(this)}
                    /> 
                :""
            }
            
            {
                this.state.isShowAccount ?
                    <Account
                    context = {this}
                    updateToken = {this.updateToken.bind(this)}
                    closePop = {this.closePop.bind(this)}
                    />
                :""
            }
            
            {
                this.state.isShowBetResult ?
                    <BetReult
                    token = {this.state.token}
                    updateToken = {this.updateToken.bind(this)}
                    closePop = {this.closePop.bind(this)}
                    />
                :""
            }
            {
                this.state.isShowRechargeWithDraw ?
                    <RechargeWithDraw 
                    context = {this}
                    updateToken = {this.updateToken.bind(this)}
                    closePop = {this.closePop.bind(this)}
                    />
                :""
            }

            <div className="left layout">
                {
                    isLogin !== false ?
                        <div className="action-wrap">
                            <div className="layout" onClick={e=>this.recharge()}>充值</div>
                            <div className="layout" >余额:{this.state.token}</div>
                        </div>
                    :""
                }
                {
                    isLogin !== false ?
                        <p className="with-draw" onClick={e => this.handleWithDraw()}>提现</p>
                    :""

                }
                <div className="list">
                    <h3>游戏历史</h3>
                    <div className="header">
                        <div>
                            <span>玩家</span>
                            <span>赌注</span>
                            <span>结果</span>
                        </div>
                    </div>

                    <div className="list-container">
                        <ul>
                            {
                                this.state.gameHistoryList.map((item, index) => (
                
                                        <li key={index}>
                                            <span className="address">{item.userAddress.slice(0,8)}</span>
                                            <span className="amount">
                                                <p>
                                                 {
                                                    item.points.split(',').map((item, index) => (

                                                            <span key={index} className={classnames(`dice${item}_icon`)}></span>
                                                        ))
                                                 }

                                                </p>
                                                {item.betEth}
                                            </span>
                                            <span className="dice">
                                                <span  className={classnames("icon", `dice${item.officalPoint}`)}></span>
                                            </span>
                                            <button></button>
                                        </li>
                                    ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <div className="middle layout">
                <h1><span className="icon"></span>骰子</h1>
                <div className="dice">

                {
                  this.state.dice2.map((item, index) => (

                    <span 
                        className={classnames('icon', {selected: item.selected})} 
                        value={item.value} 
                        key={index} 
                        onClick={() => this.selectDice(index, item.value)}
                        ></span> 
                   ))
                }

                </div>
                <p className="desc">选择骰子数来进行投注</p>
                <div className="nums">
                    {
                        this.state.eths.map((item, index) => (
                                
                             <span className={classnames('icon', {disabled:item.disabled})} key={index} onClick={() => this.changeEth(item)}>{item.name}</span>
                        ))
                    }
                   
                </div>
                <div className="write-nums">
                    <div className="left" onClick={this.decreaseEth.bind(this)}>-</div>
                    <div className="center">
                        <input ref="bet" type="text" value={this.state.eth}
                         onChange={e=>this.changeEthInput(e)}
                         onBlur={this.blurEthInput.bind(this)}/>
                    </div>
                    <div className="right" onClick={this.increaseEth.bind(this)}>+</div>
                </div>
                        {/*登录*/}
                
                {
                    isLogin === false ?
                        <button onClick={this.toLogin.bind(this)}>下注</button>
                        : ''
                }
                {
                    isLogin !== false ?
                        <button onClick={this.toBet.bind(this)}>下注</button>
                        : ''
                }
                
            </div>
            <div className="right layout">
                
                <div className="win">
                    <h3>获胜机会</h3>
                    <p>{this.state.winProb}%</p>
                </div>
                <div className="bet">
                    <h3>赢得投注</h3>
                    <p>{this.state.winEth}</p>
                    {/*<p>您将赢得{this.state.winEth}以太幣</p>*/}
                    {/*<p>3% 费用，0.001以太幣累积大奖</p>*/}
                </div>
            {/*
                <div className="grand-prize">
                    <h3>大奖包括</h3>
                    <p><span>1.680</span><span>以太币</span></p>
                    <p>0.1％的赢大奖机会！</p>
                </div>
            */}
            
            </div>
            
        </div>
    </Spin>
</div>