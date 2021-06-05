const jwt = require('jsonwebtoken');
const Pool = require('../mysql/pool');

module.exports = async (req, res, next) => {

    const token = req.cookies.x_auth;
    if(!token){
        res.json({success: false, message: "토큰을 넣어야 합니다."});
    }
    try {
        
        const decoded = await jwt.verify(token, 'secret');
        const confirmUser = await Pool.query('select * from User where token=? and username=?'
        , [token, decoded]);
        if(confirmUser[0][0] === undefined){
            res.json({success: false, message: "토큰과 일치하는 회원이 없습니다."})
        } else {
            req.user = confirmUser[0][0];
            next();
        }

    } catch (error) {
        next(error);
    }
}