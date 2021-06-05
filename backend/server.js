const express = require('express');
const app = express();
const Pool = require('./mysql/pool');
const UserRouter = require('./router/user');

const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/users', UserRouter);

/*
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
*/

app.listen(PORT, () => 
    console.log(`server is running on http://localhost:${PORT}`)
);

module.exports = {
    app
}