const express = require('express')
const { travel_agent_registration, travel_agent_login, travel_agent_update, travel_agent_delete, travel_agent_admin_dashbprd, travel_agent_approval, travel_agent_disappoval, travel_agent_package_view, travel_agent_purchace_view } = require('../controller/travel_agent_controller')
const { agent_authorization } = require('../auth/agent_authorization')
const { authorization, authorizedRole } = require('../auth/authorization')

const Router = express.Router()

Router.route('/agent_account_create').post(travel_agent_registration)
Router.route('/agent_login').post(travel_agent_login)
Router.route('/agent_profile/:id').put( agent_authorization ,travel_agent_update).delete(  agent_authorization, travel_agent_delete)
Router.route('/admin/dashbord/agent').get( authorization , authorizedRole('admin') , travel_agent_admin_dashbprd)
Router.route('/admin/dashbord/approval/:agentid').put(authorization , authorizedRole('admin') ,travel_agent_approval)
Router.route('/admin/dashbord/disapproval/:agentid').put(authorization , authorizedRole('admin'),travel_agent_disappoval)
Router.route('/agent_travel_package/:agentid').get( agent_authorization,travel_agent_package_view )
Router.route('/agent_travel_purchase/:agentid').get(agent_authorization ,travel_agent_purchace_view)
module.exports = Router