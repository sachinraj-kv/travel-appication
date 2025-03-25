const mongoose = require('mongoose');


const user_purchase = new mongoose.Schema({
    user_id: {
      type : Object
    },
    agent_id: {
       type : Object
    },
    company_name :{
        type : String,
       
    },
    destination :{
        type : String,
    },
    adult: {
        type: Number,
        required: true
    },
    children: {
        type: Number,
        required: true
    },
    total_price: {
        type: Number
    },
    status:{
        type : String,
        default : "pending"
    }
});  


const Purchase = mongoose.model('Purchase', user_purchase);
module.exports = Purchase;
