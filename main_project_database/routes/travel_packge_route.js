const express = require('express')
const { travel_package_create, travel_package_view, travel_package_delete } = require('../controller/travel_package_controller')
const { agent_authorization } = require('../auth/agent_authorization')
const { authorizedRole } = require('../auth/authorization')

const Routers = express.Router()

Routers.route('/travel_package/:agentid').post(travel_package_create)
Routers.route('/travel/package_delete/:id').delete(travel_package_delete)
Routers.route('/travel/packages').get(travel_package_view)


module.exports = Routers

