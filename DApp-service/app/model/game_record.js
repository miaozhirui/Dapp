module.exports = app => {

    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const gameRecord = new Schema({

        betEth:{
            type:Number,
            required:true
        },
        winProb:{
            type:Number,
            required:true,
        },
        odds:{

            type:Number,
            required:true
        },
        winEth:{

            type:Number,
            required:true
        },
        userAddress:{

            type:String,
            required:true
        },
        points:{

            type:String,
            required:true
        },
        gameType:{

            type:Number,
            required:true
        },
        officalPoint:{
            type:Number,//官方的点数
            required:true
        },
        gameResult:{
            type:Number,//游戏的结果，赢或者输掉
            required:true
        }
    })

    const GameRecord = mongoose.model('GameRecord', gameRecord);
    return GameRecord;                                                                
}