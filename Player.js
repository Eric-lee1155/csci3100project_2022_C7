//this is for testing
let mongoose = require('mongoose');
//password is csci3100test
const connectionstring = 'mongodb+srv://LiKinFai:csci3100test@cluster0.ljfgn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(connectionstring)
    .then(() => {
        console.log('Connected to Database');
    })
    .catch((err) => {
        console.error('error!');
    })
const Schema = mongoose.Schema;
const PlayerSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: 'AnonymousPlayer'
    },
    TotalWin: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    }
}, { timestamps: true});

const PlayerModel = mongoose.model('Players', PlayerSchema);
module.exports = PlayerModel;