const express =  require("express")
const mongoose = require('mongoose')
const mongooseconnect = require("./connect/connection")
const dotenv = require('dotenv')
const app = require("./app/app")


dotenv.config({path:'./config.env'})

mongooseconnect()

app.listen(process.env.PORT , (req , res)=>{

    console.log(`we are running on port ${process.env.PORT}` );
    
})