const mongoose = require('mongoose')

const package = new mongoose.Schema({
    agentid:{
        type:Object
    },
    company_name :{
        type : String,
        require : true
    },
    destination :{
        type : String,
        require : true
    },
    Highlight:{
        type : String,
        require : true
    },
    full_descriotion:{
        type : String ,
        require : true
    },
    include :{
        type : String ,
        require : true
    },
    not_sutable_for:{
        type :  String ,
        require : true
    },
    meet_at:{
        type : String ,
        require : true
    },
    what_to_bring:{
        type : String ,
        require : true
    },
    state:{
        type : String,
        require : true
    },
    not_allowed:{
        type : String ,
        require : true
    },
    adult_price:{
        type : String ,
        require : true
    },
    children_price:{
        type : String ,
        require : true
    },
    travel_type:{
        type : String ,
        require : true
    },
    image :{
        type :String,
        require : true
    },
    expire_in : {
        type : Date,
        require : true
    }
})

const travel_package = mongoose.model('Packages',package )

module.exports = travel_package;