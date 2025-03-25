const mongoose = require('mongoose')

const  travel_agent = new mongoose.Schema({
    company_name :{
        type : String,
        require : true
    },
    owned_by : {
        type : String,
        require : true
    },
    landline :{
        type : String,
        require : true

    },
    E_mail:{
        type : String,
        require : true,
        unique : [true , "E_mail already exist"]
    },
    Mobile:{
        type : String,
        require : true

    },
    city:{
        type : String,
        require : true

    },
    password : {
        type : String ,
        require : true
    },
    isapproved : {
        type : String,
        default : false
    },
    role : {
        type : String,
        default : "travel_agent"
    }

})

const agent = mongoose.model('Agent',travel_agent)

module.exports = agent