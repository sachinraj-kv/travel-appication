const agent = require("../model/travel_agent_shema");
const bcrypt = require('bcrypt');
const { genarate_agent_login_token } = require("../token/agent_token");
const travel_package = require("../model/travel_pakage_shema");
const Purchase = require("../model/travel_purchase_shema");


exports.travel_agent_registration = async (req, res, next) => {

    const { company_name, owned_by, landline, E_mail, Mobile, city, password } = req.body

    if (!company_name, !owned_by, !landline, !E_mail, !Mobile, !city, !password) {
      return res.status(400).json({
            sucuess: false,
            message: "please fill the fileds"
        })
    }

    const agent_password = await bcrypt.hash(password, 10)

    try {
        const travel_agent = await agent.create({
            company_name,
            owned_by,
            landline,
            E_mail,
            Mobile,
            city,
            password: agent_password
        })

        res.status(200).json({
            sucuess: true,
            message: "wait for  approval ",
            travel_agent
        })


    } catch (error) {
        console.log(error.message);
    }
}

exports.travel_agent_login = async (req, res, next) => {
    const { E_mail, password } = req.body

    if (!E_mail, !password) {
      return  res.status(400).json({
            sucuess: false,
            message: "please fill the fileds"
        })
    }
 

    try {
        const registerd_travel_agent = await agent.findOne({ E_mail })

         
            
        if (!registerd_travel_agent) {
           return res.status(400).json({
                sucuess: false,
                message: "login failed"
            })
        }

        if(registerd_travel_agent.isapproved === "false"){
           return res.status(200).json({
                sucuess : true ,
                message : "not approved",
                registerd_travel_agent
            })
        }
        const match_password = await bcrypt.compare(password, registerd_travel_agent.password)

        if (!match_password) {
           return res.status(400).json({
                sucuess: false,
                message: "login failed"
            })
        }

        const agent_data = {
            id: registerd_travel_agent._id,
            E_mail: registerd_travel_agent.E_mail,
            role : registerd_travel_agent.role
        }

        console.log("agent data",agent_data );
        
        req.agent = agent_data

        genarate_agent_login_token(req, res)

    } catch (error) {
        console.log(error.message);

    }

}

exports.travel_agent_update = async (req, res, next) => {

    const id = req.params.id

    const { company_name, owned_by, landline, E_mail, Mobile, city, password } = req.body

    if (!id) {
        res.status(404).json({
            sucuess: false,
            message: "profile not found"
        })
    }
    try {
        const agent_profile = await agent.findById(id)

        if (!agent_profile) {
            res.status(404).json({
                sucuess: false,
                message: "profile not found"
            })
        }

        agent_profile.company_name = company_name;
        agent_profile.owned_by = owned_by
        agent_profile.landline = landline
        agent_profile.E_mail = E_mail;
        agent_profile.Mobile = Mobile;
        agent_profile.city = city;

        const updated_agent = await agent_profile.save()

        res.status(200).json({
            sucuess: true,
            message: "profile updated",
            agent: {
                id: updated_agent._id,
                company_name: updated_agent.company_name,
                owned_by: updated_agent.owned_by,
                landline: updated_agent.landline,
                E_mail: updated_agent.E_mail,
                Mobile: updated_agent.Mobile,
                city: updated_agent.city,
            }
        })
    } catch (error) {
        console.log(error.message);

    }




}

exports.travel_agent_delete = async (req, res, next) => {
    const id = req.params.id

    if (!id) {
        res.status(404).json({
            sucuess: false,
            message: "profile not found"
        })
    }

    try {
        const agent_delete = await agent.findByIdAndDelete(id)

        if (!agent_delete) {
            res.status(404).json({
                sucuess: false,
                message: "profile not found" 
            })
        }

        res.status(200).json({
            sucuess: true,
            message: "profile deleted"
        })
    } catch (error) {
        console.log(error.message);

    }


}

exports.travel_agent_admin_dashbprd = async (req , res ,next)=>{
    
    const find_agent = await agent.find()

    if(!find_agent){
        res.status(404).json({
            sucuess : false ,
            message :"not found"
        })
    }

    res.status(200).json({
        sucuess : true , 
        message : "sucssesfully fetch",
        find_agent
    })
}

exports.travel_agent_approval = async(req , res ,next)=>{
    const id = req.params.agentid

    if(!id){
        res.status(400).json({
            sucuess : false ,
            message : "not found"
        })
    }

    const agent_isapproved = await agent.findByIdAndUpdate(id)

    if(!agent_isapproved ){
        res.status(400).json({
            sucuess : false ,
            message : "not found"
        })
    }
     
    agent_isapproved.isapproved = "true"
    const approved = await agent_isapproved.save()

    res.status(200).json({
        sucuess : true,
        message : "registation approved",
        isApproved:true,
    })
}

exports.travel_agent_disappoval = async(req ,res ,next)=>{
    const id = req.params.agentid

    if(!id){
        res.status(400).json({
            sucuess : false ,
            message : "not found",
        })
    }

    const agent_isapproved = await agent.findByIdAndUpdate(id)

    if(!agent_isapproved ){
        res.status(400).json({
            sucuess : false ,
            message : "not found"
        })
    }
     
    agent_isapproved.isapproved = "false"
    const approved = await agent_isapproved.save()

    res.status(200).json({
        sucuess : true,
        message : "registation incomplete , not approved",
        isApproved:false,
    })
}

exports.travel_agent_package_view = async (req ,res,next)=>{
    const agentid = req.params.agentid

     if(!agentid){
        res.status(404).json({
            sucuess : false ,
            message : "NOT FOUND"
        })
     }
     try {
        const view_package = await travel_package.find({agentid})


     if(!view_package){
        res.status(404).json({
            sucuess : false ,
            message : "NOT FOUND"
        })
     }

     res.status(200).json({
        sucuess:true,
        message : "personal packade",
        view_package
     })
     } catch (error) {
        console.log(error.message);
        
     }
     

}
exports.travel_agent_purchace_view = async(req ,res ,next)=>{
    const agent_id = req.params.agentid
    if(!agent_id ){
        res.status(400).json({
            sucuess : false ,
            message : "not found"
        })
    }
    try {
        const view_purchace = await Purchase.find({agent_id})
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

