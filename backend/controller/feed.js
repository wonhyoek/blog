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
        const feedId = createFeed[0].insertId;


        res.json({success: true, feedId});


    } catch (error) {
        next(error)
    }
}


exports.read = async (req, res, next) => {
    
    try {
        
        const findFeeds = await Pool.query('select * from Feed');
        const feeds = findFeeds[0];

        res.json({success: true, feeds});

    } catch (error) {
        next(error)
    }

}

exports.readById = async (req, res, next) => {

    const feedId = req.params.id;

    try {
        
        const findFeedById = await Pool.query('select * from Feed where id = ?', [feedId]);
        const feed = findFeedById[0][0];

        if(feed){
            res.json({success: true, feed});
        } else {
            res.json({success: false});
        }

    } catch (error) {
        next(error);
    }
}


exports.update = async (req, res, next) => {
    
    const feedId = req.params.id;
    const title = req.body.title;
    const content = req.body.content;

    try {
        
        const updateFeed = await Pool.query(
            'update Feed set title = ?, content = ? where id = ?', 
            [title, content, feedId]
        );
        res.json({success: true});

    } catch (error) {
        next(error);
    }
}

exports.delete = async (req, res, next) => {
    
    const feedId = req.params.id;
    
    try {
        const deleteFeed = await Pool.query(
            'delete from Feed where id = ?',
            [feedId]
        );
        res.json({success: true});
    } catch (error) {
        next(error);
    }
}