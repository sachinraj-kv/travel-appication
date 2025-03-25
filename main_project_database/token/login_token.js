const jwt = require('jsonwebtoken')

exports.genarate_login_token = async (req, res) => {

    console.log("login user", req.user);

    const payload = {
        id: req.user.id,
        time : Date.now(),
        role : req.user.role
    }

    console.log("payload ",payload );
    
    
    const genarate_token = await jwt.sign(payload , process.env.SECRET_KEY, { expiresIn: '30m' })

    if (!genarate_token) {
        res.status(400).json({
            sucsess: false,
            message: "login failed please register"
        })
    }

    res.status(200).cookie("token", genarate_token).json({
        sucsess: true,
        message: "login sucsessfully",
        user: req.user,
        isautenticate: true,
        cookies: genarate_token
    })
    
}