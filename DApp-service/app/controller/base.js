
const { Controller }  = require('egg');

module.exports = class BaseController extends Controller {

    success(data) {

        this.ctx.body = {

            code: 0,
            data:data||'',
            message: '操作成功'
        }
    }

    error(error) {

        // this.ctx.status = 500;
        this.ctx.body = {

            code:1,
            data: '',
            message:error.message.toString()
        }
    }
}