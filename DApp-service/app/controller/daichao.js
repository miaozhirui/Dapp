const BaseController = require('./base');

module.exports= class Daichao extends BaseController{

    async genChannel() {

        let {ctx} = this;
        let body = ctx.request.body;

        try{
            
            await ctx.model.Daichao.create({

                channelName:body.channelName,
                channelSid:body.channelSid,
                url:body.url
            })

            this.success();
        }catch(error) {

            this.error(error)
        }
    } 


    async getChannelList() {
        
        let {ctx} = this;

        try{

            let list = await ctx.model.Daichao.find().sort({_id:-1});

            this.success(list);
        }catch(e) {

            this.error(e);
        }
    }

    async deleteChannel() {

        let {ctx} = this;
        
        try{
            
            await ctx.model.Daichao.remove({_id:ctx.query.channelSid});

            this.success();
        } catch(e) {

            this.error();
        }
    }
}