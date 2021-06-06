const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const Pool = require('./mysql/pool');
const UserRouter = require('./router/user');

const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors());


app.use('/api/users', UserRouter);



app.use((error, req, res, next) => {
    res.status(500).json({success: false, message: error.message});
})


app.listen(PORT, () => 
    console.log(`server is running on http://localhost:${PORT}`)
);

module.exports = {
    app
}