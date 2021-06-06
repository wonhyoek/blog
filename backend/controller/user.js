const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const Pool = require('../mysql/pool');
const saltRounds = 10;


exports.create = async (req, res, next) => {
     
    const email = req.body.email;
    const userName = req.body.username;
    const password = req.body.password; 

    const checkEmail = 'select * from User where email=?;',
          checkUsername = 'select * from User where userName=?;'
          createUserQuery = 'insert into User(email, userName, password) values(?, ?, ?);'
    
    try {       
        const validateEmail = await Pool.query(checkEmail, [email]);
        const validateUsername = await Pool.query(checkUsername, [userName]);

        if (validateUsername[0][0] !== undefined && validateEmail[0][0] !== undefined) {
            res.json({success: false, message: "이메일과 닉네임이 이미 사용중입니다."})

        } else if (validateUsername[0][0] !== undefined) {
            res.json({success: false, message: "닉네임이 이미 사용중입니다."})

        } else if (validateEmail[0][0] !== undefined) {
            res.json({success: false, message: "이메일이 이미 사용중입니다."})

        } else {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const createUser = await Pool.query(createUserQuery, [email, userName, hashedPassword]);
        
            res.json({success: true, data: createUser[0].affectedRows});
        }


    } catch (e) {
        next(e);
    }
    
}


exports.login =  async (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    try {
        
        const confirmUser = await Pool.query('select * from User where email=?', [email]);
        if(confirmUser[0][0] === undefined){
            res.json({success: false, isAuth: false, message: "가입된 이메일이 존재하지 않습니다."});
        }


        const matchPassword = bcrypt.compare(password, confirmUser[0][0].password)
        if(matchPassword) {
            const token = await jwt.sign(confirmUser[0][0].username, 'secret');
            Pool.query('update User set token=? where username=?', [token, confirmUser[0][0].username])
            .then(() => {
                res
                .cookie("x_auth", token)
                .json({success: true, isAuth: true});
            })
        } else {
            res.json({success: false, isAuth: false, message: "비밀번호가 맞지 않습니다."});
        }


    } catch (error) {
        next(error);
    }
}



exports.auth = async (req, res, next) => {
    
    const user = req.user;

    res.json({success: true, isAuth: true, user});
}


exports.logout = async (req, res, next) => {
    
    const username = req.user.username;

    Pool.query('update User set token=? where username=?', ["", username])
    .then(() => {
        res.json({succecs: true, isAuth: false});
    })
    .catch(err => {
        next(err);
    });
    
}