module.exports = app => {

    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const UserSchema = new Schema({

        userName: {
            type:String,
            requred: true
        },

        password: {
            type: String,
            requred:true
        },
        
        userAddress: {
            type: String,
            requred: true
        },

        token:{
            type:Number
        }
    })
 
    const User = mongoose.model("User", UserSchema);

    return User;
}