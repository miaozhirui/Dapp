const moment = require('moment');
const BaseController = require('./base') 

module.exports = class MonitorController extends BaseController {

    async index() {

        const { ctx } = this;
        // let errorInfo = JSON.stringify(ctx.request.body);
        let errorInfo = ctx.request.body;
        let time = new Date().getTime();

        errorInfo.time = Math.floor(time/1000);
        errorInfo.timeFormat = moment(time).format("YYYY-MM-DD hh:mm:ss");

        errorInfo = JSON.stringify(ctx.request.body);
        
        try{

            errorInfo = await ctx.model.Monitor.create({content: errorInfo});

            this.success(errorInfo)
        } catch (error){

            this.error(error)
        }

    }
}

