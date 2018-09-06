const BaseController = require('./base');

module.exports = class GameController extends BaseController{

    async getHistoryList() {

        let { ctx } = this;

        try{
            
            let list = await ctx.model.GameRecord.find().sort({_id:-1}).limit(50);

            this.success(list)
        } catch(err){

            this.error(err);
        }
    }
}