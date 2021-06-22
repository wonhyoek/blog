const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const multer = require('multer');
const Pool = require('../mysql/pool');
const saltRounds = 10;


exports.create = async (req, res, next) => {
     

    const email = req.body.email;
    const userName = req.body.username;
    const password = req.body.password; 

    
    try {       
        const validateEmail = await Pool.query('call checkEmail(?)', [email]);
        const validateUsername = await Pool.query('call checkUsername(?)', [userName]);

        console.log(validateEmail[0][0][0])
        if (validateUsername[0][0][0] !== undefined && validateEmail[0][0][0] !== undefined) {
            res.json({success: false, message: "이메일과 닉네임이 이미 사용중입니다."})

        } else if (validateUsername[0][0][0] !== undefined) {
            res.json({success: false, message: "닉네임이 이미 사용중입니다."})

        } else if (validateEmail[0][0][0] !== undefined) {
            res.json({success: false, message: "이메일이 이미 사용중입니다."})

        } else {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const createUser = await Pool.query(
                'call createUser(?, ?, ?)',
                [email, userName, hashedPassword]
            );
        
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
        
        const checkEmail = await Pool.query('call checkEmail(?)', [email]);
        if(checkEmail[0][0][0] === undefined){
            res.json({success: false, isAuth: false, message: "가입된 이메일이 존재하지 않습니다."});
        }


        const matchPassword = bcrypt.compare(password, checkEmail[0][0][0].password)

        if(matchPassword) {

            const token = await jwt.sign(checkEmail[0][0][0].username, 'secret');
            const setToken = await Pool.query(
                'call setToken(?, ?)',
                [token, checkEmail[0][0][0].username]
            )

            res
            .cookie("x_auth", token)
            .json({success: true, isAuth: true});
            
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

    Pool.query('call setToken(?, ?)', ["", username])
    .then(() => {
        res.json({succecs: true, isAuth: false});
    })
    .catch(err => {
        next(err);
    });
    
}


exports.userById = async (req, res, next) => {
    
    const userId = req.params.id;
    
    try {
        const getUserById = await Pool.query(
            'call getUserById(?)',
            [userId]
        );
        const user = getUserById[0][0][0];

        if(getUserById[0][0][0] !== undefined){
            res.json({success: true, user});
        } else {
            res.json({success: false});
        }

    } catch (e) {
        next(e)
    }
}




const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
})

const upload = multer({ storage: storage }).single("file")

exports.uploadUserimage = (req, res, next) => {

    upload(req, res, err => {
        if (err) {
            next(err);
        }
        return res.json({ success: true, filePath: res.req.file.path });
    })

    
}

exports.updateUserimage = async (req, res, next) => {

    const userimage = req.body.userimage;
    const user = req.user;

    try {
        const updateUserimage = await Pool.query(
            'call updateUserimage(?, ?)',
            [userimage, user.id]
        );
        res.json({success: true, userimage});
    } catch (error) {
        next(error)
    }

    
}