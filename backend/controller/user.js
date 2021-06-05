const Pool = require('../mysql/pool');
const bcrypt = require('bcrypt');
const saltRounds = 10;


exports.create =  async (req, res) => {
    
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const validateUsername = await Pool.query('select * from User where username = ?', [username]);
    const validateEmail = await Pool.query('select * from User where email = ?', [email]);
    
    if(validateUsername[0][0] !== null && validateEmail[0][0] !== null) {
        res.status(400).json({success: false})
        Pool.end();
    } else if (validateUsername[0][0] !== null) {
        res.status(400).json({success: false});
        Pool.end();
    } else if (validateEmail[0][0] !== null) {
        res.status(400).json({success: false});
        Pool.end();
    }
    

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const createUser = await Pool.query('insert into User(username, email, password) values(?, ?, ?);', [username, email, hashedPassword]);
}

