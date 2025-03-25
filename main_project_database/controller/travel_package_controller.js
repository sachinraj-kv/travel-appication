const travel_package = require("../model/travel_pakage_shema");

exports.travel_package_create = async (req, res, next) => {

    const { company_name, destination, Highlight, full_descriotion, include, not_sutable_for, meet_at, what_to_bring, not_allowed, adult_price, children_price, travel_type,image ,state} = req.body
    const agentid = req.params.agentid

    console.log("agent id ",agentid);
    
    if (!company_name, !destination, !Highlight, !full_descriotion, !include, !not_sutable_for, !meet_at, !what_to_bring, !not_allowed, !adult_price, !children_price, !travel_type , !state ,!image) {
        res.status(400).json({
            sucuess: false,
            message: "all filed are require"
        })
    }
    try {
        const create_travel_package = await travel_package.create({
            agentid,
            company_name,
            destination,
            Highlight,
            full_descriotion,
            include,
            not_sutable_for,
            meet_at,
            what_to_bring,
            image,
            state,
            not_allowed,
            adult_price,
            children_price,
            travel_type,
        })
        
        console.log("package",create_travel_package);
        
        return res.status(200).json({
            sucuess: true,
            message: "packege added",
            create_travel_package
        })

    } catch (error) {
        
        console.log(error.message);

    }

}

exports.travel_package_delete = async(req , res , next)=>{
    const id = req.params.id

    const { company_name, destination, Highlight, full_descriotion, include, not_sutable_for, meet_at, what_to_bring, not_allowed, adult_price, children_price, travel_type,image ,state} = req.body

    if(!id){
        res.status(400).json({
            success : false , 
            message : "profile not found"
        })
    }

    

}

exports.travel_package_delete = async(req,res,next)=>{

    const id = req.params.id

    if(!id){
        res.status(400).json({
            success : false , 
            message : "profile not found"
        })
    }

    try {
        
        const travel_user_remove = await travel_package.findByIdAndDelete(id)

        console.log("delete data",travel_user_remove);
        

        if(!travel_user_remove){
            res.status(400).jjson({
                success : false , 
                message : "profile not found"
            })
        }

        res.status(200).json({
            success : true,                                                                                                                                                       
            message : "package  deledted" 
        })

    } catch (error) {
       console.log(error.message);
       
    }

}

exports.travel_package_view =async(req ,res ,next)=>{
    const all_packages = await travel_package.find()
    if(!all_packages){
        res.status(400).json({
            success : false,
            messagee : "package not found",
           
        })
        
    }
    res.status(200).json({
        success : true,
        messagee : "package fetch",
        all_packages
    })
}

