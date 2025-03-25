const user = require("../model/travel_user_shema");
const bcrypt = require('bcrypt');
const { genarate_login_token } = require("../token/login_token");
const Purchase = require("../model/travel_purchase_shema");

exports.travel_user_registration = async (req, res, next) => {

    const { first_name, last_name, password, E_mail } = req.body

    console.log("Request received:", { first_name, last_name, E_mail, password });

    if (!first_name, !last_name, !password, !E_mail) {
        return res.status(400).json({
            success: false,
            message: "please fill the filled"
        })
    }

    const handlepassword = await bcrypt.hash(password, 10);


    try {

        const travelling_user = await user.create({
            first_name,
            last_name,
            password: handlepassword,
            E_mail,
        })
        console.log("register user",travelling_user);
        

        return res.status(200).json({
            success: true,
            message: "account Created",
            travelling_user
        })

    } catch (error) {

        console.log("login erroe",error);

    }
}

exports.travel_user_login = async (req, res, next) => {
    const {  password, E_mail } = req.body

    if ( !password, !E_mail) {
        return res.status(400).json({
            success: false,
            message: "please fill the field"
        })
    }

    
    try {
        const registered_travel_users = await user.findOne({ E_mail })

        
        if(registered_travel_users.status === "deactive"){
            res.status(404).json({
                success : false , 
                message : "account deactivate"
            })
        }


    const match_password = await bcrypt.compare(password, registered_travel_users.password)

    

    if (!match_password) {
        return res.status(400).json({
            success: false,
            message: "Login failed pass"
        })
    }

    const login_user_data = {
        id: registered_travel_users._id,
        firstname :registered_travel_users.first_name,
        lastname :registered_travel_users.last_name,
        Email: registered_travel_users.E_mail,
        role : registered_travel_users.role
    }

    req.user =  login_user_data 

    genarate_login_token(req , res)

    } catch (error) {
        console.log(error.message);
        
    }
    

}

exports.travel_user_update = async (req ,res ,next)=> {
    
    const id = req.params.id
    console.log("id",id);
    
    const { first_name, last_name, E_mail} = req.body

    console.log("data",E_mail);
    

    if(!id){
        res.status(400).json({
            success : false , 
            message : "profile not found"
        })
    }

    try {
        
        const travel_user_profile = await user.findById(id)


    if(!travel_user_profile){
        res.status(400).json({
            success : false , 
            message : "profile not found"
        })
    }

    travel_user_profile.first_name  =   first_name ;
    travel_user_profile.last_name  =   last_name ;
    travel_user_profile.E_mail  =   E_mail ;
    

    const update_travel_user_profile = await travel_user_profile.save()

    res.status(200).json({
        success : true ,
        message : "profile updated",
        users : {
            id :  update_travel_user_profile._id,
            firstname :  update_travel_user_profile.first_name,
            lastname :   update_travel_user_profile.last_name ,
            Email :  update_travel_user_profile.E_mail
        }
    })
    


    } catch (error) {
        
        console.log(error.message);
        
    }
    

    
}

exports.tavel_user_delete = async (req , res , next) =>{

    const id = req.params.id

    if(!id){
        res.status(400).json({
            success : false , 
            message : "profile not found"
        })
    }

    try {
        
        const travel_user_remove = await user.findByIdAndDelete(id)

        console.log("delete data",travel_user_remove);
        

        if(!travel_user_remove){
            res.status(400).jjson({
                success : false , 
                message : "profile not found"
            })
        }

        res.status(200).json({
            success : true,                                                                                                                                                       
            message : "profile deledted" 
        })

    } catch (error) {
       console.log(error.message);
       
    }

    
}   

exports.travel_admin_dashbord = async (req ,res , next)=>{


    const all_registerd_users = await (await user.find()).reverse()

    res.status(200).json({
        success : true ,
        message : "admin dashbord",
        all_registerd_users
    })
}

exports.travel_admin_status_deactive = async(req , res , next)=>{
    const id = req.params.userid 

    if(!id){
        res.status(400).json({
            success : false ,
            message : "user not found"
        })
    }

    const  users = await user.findById(id)

    if(!users){
        res.status(400).json({
            success : false ,
            message : "user not found"
        })
    }

    users.status = "deactive" ;

    const status_update = await users.save()

    res.status(200).json({
        success : true,
        message : " deactivate"
    })
}

exports.travel_admin_status_active = async(req ,res ,next)=>{
    const id = req.params.Userid

    if(!id){
        res.status(400).json({
            success : false ,
            message : "user not found"
        })
    }
    try {
        const  admin_users = await user.findById(id)
        console.log("admin users",admin_users);
        

    if(!admin_users){
        res.status(400).json({
            success : false ,
            message : "user not founded"
        })
    }

    admin_users.status = "active" ;

    const status_update = await admin_users.save()

    res.status(200).json({
        success : true,
        message : "active"
    })

    } catch (error) {
        console.log(error.message);
        
    }
    
}

exports.travel_user_purchace_view = async(req ,res ,next)=>{
    const user_id = req.params.user_id
    if(!user_id ){
        res.status(400).json({
            sucuess : false ,
            message : "not found"
        })
    }
    try {
        const view_purchace = await Purchase.find({user_id})
        console.log("view_purchace",view_purchace);
        
     if(!view_purchace){
        res.status(404).json({
            sucuess : false ,
            message : "NOT FOUND"
        })
     }
     res.status(200).json({
        sucuess:true,
        message : "personal purchase",
        view_purchace
     })
    } catch (error) {
        console.log(error.message);
    }
}
