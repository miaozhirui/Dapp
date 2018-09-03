
module.exports = app => {

    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const withdrawRecord = new Schema({

        token: {
            type:String,
            required:true
        },

        from: {
            type:String,
            required:true
        },

        to: {

            type: String, 
            required: true
        },

        time: {
            type:String,
            required: true
        }
    })

    const WithdrawRecord = mongoose.model('WithdrawRecord', withdrawRecord);
    return WithdrawRecord; 
}