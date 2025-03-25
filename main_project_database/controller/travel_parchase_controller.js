const travel_package = require("../model/travel_pakage_shema");
const Purchase = require("../model/travel_purchase_shema");
const user = require("../model/travel_user_shema");

exports.travel_user_purchase = async(req ,res ,next)=>{
    const {adult ,children} = req.body

    const user_id = req.params.user_id
    const agent_id = req.params.agent_id
    const package_id = req.params.package_id

    console.log("agentid",agent_id);
    

    if(!adult,!children){
        res.status(404).json({
            sucuess : false , 
            message : "please fill the filed"
        })
    }
    const travel_details = await travel_package.findById(package_id)
    console.log("travel_details",travel_details);
  
    
    if(!travel_details){
        res.status(400).json({
            sucuess : false,
            message:"fetch failed"
        })
    }
    const company_name = travel_details.company_name 
    console.log("company_name",company_name);
    
    const destination = travel_details.destination

    const adult_totalprice = travel_details.adult_price * adult 

    const children_totalprice = travel_details.children_price * children

    const total_price = adult_totalprice + children_totalprice
    

    
    try {
        const userpurchase = await Purchase.create({
            user_id,
            agent_id,
            company_name,
            destination,
            adult,
            children,
            total_price
        })
        if(!userpurchase){
            res.status(404).json({
                sucuess : false , 
                message : "failed to create"
            })
        }
        res.status(200).json({
            sucuess: true,
            message: "purchase succsesfull",
            userpurchase
        })
    } catch (error) {
        console.log(error.message);
        
    }
}
exports.travel_purchase_auser = async(req,res,next)=>{
    const travel_purchase = await Purchase.find()
    if(!travel_purchase){
        res.status(404).json({
            sucuess:false,
            message:"purchase failed"
        })
    }
    console.log(travel_purchase);
    
    res.status(200).json({
        sucuess:true,
        message:"purchase fetch",
        travel_purchase
    })
    
}

exports.travel_purchase_update = async(req , res ,next)=>{

    const id = req.params.purchase_id

    const agent_id = req.params.agent_id

    const {adult ,children} = req.body

    if(!adult,!children){
        res.status(404).json({
            sucuess : false , 
            message : "please fill the filed"
        })
    }

    const travel_details = await travel_package.findById(agent_id)
  

    try {
        const purchase_data = await Purchase.findById(id)
    
    if(!purchase_data){
        res.status(404).json({
            sucuess : false , 
            message : "not found"
        })
    }

    const adult_amount = adult * travel_details.adult_price 

    const children_amount = children * travel_details.children_price

    const total_amount = adult_amount + children_amount

    

    purchase_data.adult = adult 
    purchase_data.children = children
    purchase_data.total_price = total_amount

    const updated_purchase = await purchase_data.save()

    res.status(200).json({
        sucuess : true , 
        message : "purchase has been  updated",
        updated_purchase
    })
    } catch (error) {
        console.log(error.message);
        
    }
    
    
    
}
exports.travel_purchase_approve = async(req , res ,next)=>{
    const id =  req.params.purchase_id
   
   
  
    const purchase_approve = await Purchase.findById(id)
    console.log("purchase_approve",purchase_approve);
    
    if(!purchase_approve){
       return res.status(400).json({
            sucuess : false,
            message : "purchase not found"
        })
    }

    purchase_approve.status = "approved"

    const status_approve = await purchase_approve.save()

    res.status(200).json({
        sucuess : true , 
        message : "Approved",
   
    })
}
exports.travel_purchase_disapprove = async(req , res ,next)=>{
    const id =  req.params.purchase_id
   
   
  
    const purchase_approve = await Purchase.findById(id)
    console.log("purchase_approve",purchase_approve);
    
    if(!purchase_approve){
       return res.status(400).json({
            sucuess : false,
            message : "purchase not found"
        })
    }

    purchase_approve.status = "disapproved"

    const status_approve = await purchase_approve.save()

    res.status(200).json({
        sucuess : true , 
        message : "disapproved",
   
    })
}

exports.travel_purchase_cancelled = async(req , res ,next)=>{

    const id =  req.params.purchase_id

    console.log("id",id);
    

    const purchase_approve = await Purchase.findById(id)
    console.log("purchase_approve",purchase_approve);
    
    if(!purchase_approve){
       return res.status(400).json({
            sucuess : false,
            message : "purchase not found"
        })
    }

    purchase_approve.status = "cancelled"

    const status_approve = await purchase_approve.save()

    res.status(200).json({
        sucuess : true , 
        message : "cancelled",
    })
}

exports.travel_purchase_Complete = async(req , res ,next)=>{

    const id =  req.params.purchase_id

    console.log("id",id);
    

    const purchase_complete = await Purchase.findById(id)
    console.log("purchase_complete",purchase_complete);
    
    if(!purchase_complete){
       return res.status(400).json({
            sucuess : false,
            message : "purchase not found"
        })
    }

    purchase_complete.status = "completed"

    const status_approve = await purchase_complete.save()

    res.status(200).json({
        sucuess : true , 
        message : "completed",
    })
}

exports.travel_purchase_delete = async (req ,res ,next)=>{
    
    const id = req.params.purchase_id
    console.log("id",id);
    
    const purchase = await Purchase.findById(id);
    console.log("purchase",purchase);
    
    const purchase_delete = await Purchase.findByIdAndDelete(id)

    console.log("purchase_delete",purchase_delete);
    

    if(!purchase_delete){
       return res.status(400).json({
            sucuess : false,
            message : "purchase not found"
        })
    }

    res.status(200).json({
        sucuess : true , 
        message : "order removed",
        purchase_delete
    })
}