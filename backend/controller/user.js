const Mydb = require('../mysql/mydb');
const Promise = require('bluebird');
const mydb = require('../mysql/pool');
const bcrypt = require('bcrypt');
const saltRounds = 10;


exports.create = (req, res) => {
    
    const checkEmail = 'select * from User where email=?;',
          checkUsername = 'select * from User where userName=?;'
          createUser = 'insert into User(email, userName, password) values(?, ?, ?);'
    
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
}