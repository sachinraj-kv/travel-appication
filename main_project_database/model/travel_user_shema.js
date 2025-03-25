const mongoose = require('mongoose')

const travel_user = new mongoose.Schema({
    first_name : {
        type: String , 
        require : true
    },
    last_name : {
        type : String ,
        require : true
    },
    password : {
        type : String ,
        require : true
    },
    E_mail : {
        type : String ,
        require : true,
        unique : [true , "E_mail already exist"]
    },
    status: {
        type : String ,
        default : "active"
    },
    role : {
        type : String ,
        default : "user"
    }
})

const user = mongoose.model('Users',travel_user)

module.exports = user;