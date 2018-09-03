module.exports = app => {

    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const transferRecord = new Schema({

        eth:{//用户转的eth,
            type:String,
            required:true
        },
        gasPrice:{

            type:String,
            required:true
        },
       
        from: {
            type:String,
            required:true
        },
        to:{
            type:String,
            required:true
        },
        time:{
            type:String,
            required:true
        }
    })


    const TransferRecord = mongoose.model('TransferRecord', transferRecord);
    return TransferRecord
}