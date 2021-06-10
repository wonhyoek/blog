const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const Pool = require('./mysql/pool');
const UserRouter = require('./router/user');
const FeedRouter = require('./router/feed');

const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors());

app.use('/upload', express.static('upload'));


app.use('/api/users', UserRouter);
app.use('/api/feeds', FeedRouter);



app.use((error, req, res, next) => {
    res.json({success: false, message: error.message});
})


app.listen(PORT, () => 
    console.log(`server is running on http://localhost:${PORT}`)
);

module.exports = {
    app
}