const jwt = require('jsonwebtoken');
const Pool = require('../mysql/pool');

module.exports = async (req, res, next) => {

    let token = req.cookies.x_auth;
    if(!token) token = "";
    
    try {
        
        let decoded = await jwt.verify(token, 'secret');
        if(!decoded) decoded = "";

        const confirmUser = await Pool.query('select * from User where token=? and username=?'
        , [token, decoded]);
        if(confirmUser[0][0] === undefined){
            res.json({isAuth: false, message: "토큰과 일치하는 회원이 없습니다."})
        } else {
            req.user = confirmUser[0][0];
            next();
        }

    } catch (error) {
        next(error)
    }
}