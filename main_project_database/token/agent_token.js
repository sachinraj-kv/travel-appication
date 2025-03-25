const jwt = require('jsonwebtoken')

exports.genarate_agent_login_token = async (req,res,next)=>{

    const payload = {
        id : req.agent.id,
        time : Date.now(),
        role :req.agent.role
    }

    const genarate_token = jwt.sign(payload , process.env.SECRET_KEY, {expiresIn : '30 m'})

    if(!genarate_token){
       return res.status(404).json({
            sucsess : false,
            message : "login failed "
        })
    }

    res.status(200).cookie("agenttoken",genarate_token).json({
        sucuess : true ,
        message : "login sucsessfully",
        agent : req.agent,
        isautenticate : true,
        cookies : genarate_token
    })
}