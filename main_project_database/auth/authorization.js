const jwt = require('jsonwebtoken')
exports.authorization = (req, res, next) => {

    console.log("cookies",req.cookies);
    
    const {token}  = req.cookies
    console.log("here is token" ,token);
    

    jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
        if (err) {
            res.status(401).json({
                succses: false,
                message: err.message
            })
        }
        console.log("verifed decode", decode);

        req.userid = decode.id
        req.role = decode.role

        console.log("role", req.role);
        
    })

    next()
}

exports.authorizedRole = (...roles)=>{
    return(req , res , next )=>{

        const role =  req.role;

        console.log("verify role",role);
        

        if(!role.includes(roles)){
            return res.status(401).json({
                succses : false ,
                message: "Unauthorized Access"
            })
        }
        next()
    }
}