const express = require("express")
const router = require("../routes/travel_user_route")
const app = express()
const cookieparser = require('cookie-parser')
const cors = require("cors")
const Router = require("../routes/travel_agent_route")
const Routers = require("../routes/travel_packge_route")
const routers = require("../routes/travel_purchase_route")

app.use(cookieparser())

app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(cors({
    credentials:true,
    origin:true
}))
app.use(router)
app.use(Router)
app.use(Routers)
app.use(routers)

module.exports = app;