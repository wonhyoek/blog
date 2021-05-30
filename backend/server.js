const express = require('express');
const app = express();
const Pool = require('./mysql/pool');
const Mydb = require('./mysql/mydb');

const PORT = process.env.PORT || 5000;
const pool = new Pool();
const mydb = new Mydb(pool);



app.get('/dbtest/:userName', (req, res) => {
    let userName = req.params.userName;
    mydb.execute( conn => {
        conn.queryAsync("Select * from User where userName=?",[userName])
        .then(ret => {
            console.log(ret[0].id);
            res.json({success: true});
        });
    })
});

app.listen(PORT, () => 
    console.log(`server is running on http://localhost:${PORT}`)
);

module.exports = {
    Mydb
}