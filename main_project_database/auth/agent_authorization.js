const jwt = require('jsonwebtoken')

exports.agent_authorization = async (req , res ,next)=>{
    const {agenttoken} = req.cookies;
    
    console.log("agent token",agenttoken);
    
    if(!agenttoken){
        res.status(400).json({
            success : false ,
            message : "please login"
        })
    }

    jwt.verify(agenttoken , process.env.SECRET_KEY , (err , decoded)=>{
        if(err){
            res.status(400).json({
                success : false ,
                message : "please login"
            })
        }
        console.log("agent verify ",decoded.role);

        req.agentid = decoded.id
        req.role = decoded.role
    })

    next()
}
