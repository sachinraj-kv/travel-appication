const express = require('express')
const { travel_user_registration, travel_user_login, travel_user_update, tavel_user_delete, travel_admin_dashbord, travel_admin_status_deactive, travel_admin_status_active, travel_user_purchace_view } = require('../controller/travel_user_controller');
const { authorization, authorizedRole } = require('../auth/authorization');
const router = express.Router()

router.route('/create').post(travel_user_registration);
router.route('/login').post(travel_user_login)
router.route('/profile/:id').put(authorization , travel_user_update ).delete(authorization, tavel_user_delete)
router.route('/admin/dashbord').get( authorization, authorizedRole('admin') ,travel_admin_dashbord )
router.route('/admin/status/deactive/:userid').put( authorization , authorizedRole('admin'), travel_admin_status_deactive)
router.route('/admin/status/active/:Userid').put(authorization , authorizedRole('admin'),travel_admin_status_active)
router.route('/user_travel/purchase/:user_id').get(authorization , travel_user_purchace_view)

module.exports = router;

