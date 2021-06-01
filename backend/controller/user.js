const Pool = require('../mysql/pool');
const bcrypt = require('bcrypt');
const saltRounds = 10;


exports.create = async (req, res) => {
    
    const email = req.body.email;
    const userName = req.body.userName;
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
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        const createUser = await Pool.query(createUserQuery, [email, userName, hashedPassword]);
        
        res.json({success: true, data: createUser[0].affectedRows});
        Pool.end();

    } catch (e) {
        res.json({success: false, error: e});
        Pool.end();
    }
    
}

/* 
    mydb.execute( conn => {
        Promise.all([
            conn.queryAsync(checkEmail, [req.body.email]),
            conn.queryAsync(checkUsername, [req.body.userName])

        ]).then( ret => {
            console.log(ret);
            if(ret[0].id === true && ret[1].id === true) {
                res.json({message: "이메일과 닉네임 모두 이미 사용중입니다."})
            } else if(ret[1].id === true) {
                res.json({message: "이미 사용중인 닉네임 입니다."})
            } else if(ret[0].id === true) {
                res.json({message: "이미 사용중인 이메일 입니다."})
            } else {
                bcrypt.hash(req.body.password, saltRounds).then( hash => {
                    conn.queryAsync(createUser, [req.body.email, req.body.userName, hash])
                    .then( ret => {
                        console.log(ret)
                    })
                    .catch( err => console.log(err))
                });
            }
        })
    })
*/