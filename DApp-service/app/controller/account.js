const BaseController = require('./base');

module.exports = class Account extends BaseController {

    async getAccount() {

        let { ctx } = this;
        
        let userInfo = ctx.session.userInfo;

        // console.log(userInfo);
        try{
            
            if(!userInfo){

                this.success({
                    
                    code:-1,
                    message: '用户未登录'
                })
                return;
            }
            let userName = userInfo.userName;
       
            let info = await ctx.model.User.findOne({ userName });


            this.success({

                token:info.token,
                invitePeople:info.invitePeople,
                inviteCode:info.inviteCode
            })
        }catch(error){

            this.error(error);
        }
    } 

    async withdraw() {

        let { ctx } = this;
        let bodyParams = ctx.request.body;

        let userInfo = ctx.session.userInfo;
        let userName = userInfo.userName;
        
        try{

            await ctx.model.WithdrawRecord.create({
                
                from: bodyParams.from,
                to: userInfo.userAddress,                
                token:bodyParams.token,
                time:bodyParams.time
            })

            await ctx.model.User.update({userName}, {$inc: {token: -Number(bodyParams.token)}});

            this.success();
            
        }catch(error) {

            this.error(error)
        }
    }
}