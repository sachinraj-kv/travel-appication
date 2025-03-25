const express = require('express')
const { travel_user_purchase, travel_purchase_update, travel_purchase_delete, travel_purchase_auser, travel_purchase_approve, travel_purchase_disapprove, travel_purchase_cancelled, travel_purchase_Complete } = require('../controller/travel_parchase_controller')

const routers = express.Router()

routers.route('/travel_user_purchase/:user_id/:agent_id/:package_id').post(travel_user_purchase) 
routers.route('/travel_user_purchase/user_purchase').get(travel_purchase_auser)
routers.route('/travel_purchase_update/:purchase_id/:agent_id').put(travel_purchase_update).delete(travel_purchase_delete)
routers.route('/travel_purchase_approve/:purchase_id').put( travel_purchase_approve)
routers.route('/travel_purchase_disapprove/:purchase_id').put(travel_purchase_disapprove)
routers.route('/travel_purchase_cancelled/:purchase_id').put(travel_purchase_cancelled)
routers.route('/travel_purchase_completed/:purchase_id').put(travel_purchase_Complete)
module.exports = routers
