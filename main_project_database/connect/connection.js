const mongoose = require('mongoose')


const mongooseconnect = ()=>{
    
    mongoose.connect('mongodb+srv://sachinrajkv22:jkG2nksiVhLRSQPv@cluster0.ka98h.mongodb.net/travel')

    .then((data)=>{

        console.log(`database connected to the ${data.connection.host}`);

        
    })

    .catch((error)=>{
       
        console.log(error.message);
      
        
    })
}

module.exports = mongooseconnect;