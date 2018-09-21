const BaseController = require('./base');

module.exports = class Login extends BaseController {

    /**
     * [login description]登录
     * @return {[type]} [description]
     */
    async login() {

        const { ctx } = this;

        const bodyParams = ctx.request.body;
        
          
        try {

            let info = await ctx.model.User.findOne({
                userName: bodyParams.userName,
                password: bodyParams.password
            })

            if (info) {



                ctx.session.userInfo = info;

                this.success({
                    userName: info.userName,
                    userAddress: info.userAddress,
                    token: info.token
                })
            } else {

                this.success({
                    status: 1 //1表示用户名不存在
                })
            }
        } catch (error) {

            this.error(error)
        }
    }

    /**
     * [register description]用户注册
     * @return {[type]} [description]
     */
    async register() {

        const { ctx } = this;
        const bodyParams = ctx.request.body;

        let code = bodyParams.inviteCode;
        
        let inviteCode = ctx.helper.getInviteCode();

        try {
            
            await ctx.model.User.update({inviteCode:code},{$inc:{invitePeople:+ 1}});

            let userInfo = await ctx.model.User.findOne({

                userName: bodyParams.userName
            })

            if (userInfo) {

                this.error({

                    message: "用户已经存在"
                })
                return;
            }



            let info = await ctx.model.User.create({

                userName: bodyParams.userName,
                password: bodyParams.password,
                userAddress: bodyParams.ethAddress,
                inviteCode,
                token: 0
            })

            ctx.session.userInfo = info;

            this.success({
                userName: info.userName,
                userAddress: info.userAddress,
                token: info.token
            })

        } catch (error) {

            this.error(error)
        }
    }

    /**
     * [isLogin description] 用户是否注册
     * @return {Boolean} [description]
     */
    async isLogin() {

        const { ctx } = this;

        let userInfo = ctx.session.userInfo;

        if (userInfo) {


            this.success({
                isLogin:true
            });
        } else {

            this.success({

                isLogin: false
            })
        }
    }

    /**
     * [transfer description]用户转让
     * @return {[type]} [description]
     */
    async transfer() {

        let { ctx } = this;

        let bodyParams = ctx.request.body;

        try {
            
            let info = await ctx.model.TransferRecord.create({

                eth: bodyParams.eth,
                gasPrice: bodyParams.gasPrice,
                token: bodyParams.token,
                from: bodyParams.from,
                to: bodyParams.to,
                time: bodyParams.time
            })
            
            let userName = ctx.session.userInfo.userName;

            await ctx.model.User.update({userName}, {$inc:{token: + Number(bodyParams.eth)}})
            
            let userInfo = await ctx.model.User.findOne({userName});

            this.success({

                token:userInfo.token
            })
        } catch (error) {

            this.error(error)
        }
    }

    async gameRecord() {

        let { ctx } = this;
        
        let bodyParams = ctx.request.body;
        let officalPoint = Math.floor(Math.random()*6 + 1);
        let gameResult = bodyParams.points.indexOf(officalPoint) > -1 ? 1 : 0;//1代表用赢了，0代表用户输了

        let betEth = bodyParams.betEth,
            winEth = bodyParams.winEth,
            points = bodyParams.points

        try{
            
          await ctx.model.GameRecord.create({

                betEth: bodyParams.betEth,
                winProb: bodyParams.winProb,
                odds: bodyParams.odds,
                winEth: bodyParams.winEth,
                userAddress: ctx.session.userInfo.userAddress,
                points: bodyParams.points,
                gameType: bodyParams.gameType,
                officalPoint,
                gameResult
          })  

          let userName = ctx.session.userInfo.userName;
          let betEth = +bodyParams.betEth;
          let winEth = +bodyParams.winEth;
            
            if(gameResult === 1) {//用户赢了，加
                
                await ctx.model.User.update({userName}, {$inc:{token: Number(winEth-betEth)}});
            } 

            if(gameResult === 0) {//用户输了，减

                await ctx.model.User.update({userName}, {$inc:{token: - Number(betEth)}})
            }
            
            let userInfo = await ctx.model.User.findOne();
            
            this.success({

                officalPoint,
                gameResult,
                betEth,
                winEth,
                points,
                officalPoint
            })
        }catch(e) {

            this.error(e);
        }
    }
}







