const Pool = require('../mysql/pool');

exports.create = async (req, res, next) => {

    const user = req.user.username;
    const title = req.body.title;
    const content = req.body.content;

    try {
        
        const createFeed = await Pool.query(
            'insert into Feed(author, title, content) values(?, ?, ?)',
            [user, title, content]
        );
        const findFeed = await Pool.query(
            'select * from Feed where id=?',
            [createFeed[0].insertId]
        );
        
        
        const feedId = findFeed[0][0].id;
        res.json({success: true, feedId});


    } catch (error) {
        next(error)
    }
}


exports.read = async (req, res, next) => {
    
    try {
        
        const findFeeds = await Pool.query('select * from Feed');
        const feeds = findFeeds[0];
        res.json({success: true, feeds})

    } catch (error) {
        next(error)
    }

}