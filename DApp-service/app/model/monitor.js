module.exports = app => {

    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const MonitorSchema = new Schema({

       content:{
           type: String,
           required: true
       }
    })

    const Monitor = mongoose.model('Monitor', MonitorSchema);

    return Monitor;
}