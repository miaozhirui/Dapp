module.exports = app => {

    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const DaichaoSchema = new Schema({

        channelName:{
            type:String, 
            required:true
        },
        channelSid:{

            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    })

    const Daichao = mongoose.model('Daichao', DaichaoSchema);
    
    return Daichao;
}