import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFeeds } from "../../../_actions/feed_action";
import './LandingPage.css';


export default () => {
    
    const feedsInReducer = useSelector(state => state.feed);
    const dispatch = useDispatch();

    useEffect(() => {
        
        dispatch(getFeeds())

    }, []);

    const feeds = feedsInReducer.feeds;

    const renderFeeds = feeds && feeds.map((feed, index) => {
        return (
            <a href = {`/feeds/${feed.id}`} style = {{textDecoration: 'none', color: 'black'}} key = {index}>
                <div className = 'feed_container'>
                    <div className = 'feed_author'>
                        <img className = 'feed_author_img' src = {`http://localhost:5000/${feed.userimage}`}/>
                        <p>{feed.author}</p>
                    </div>
                    <div className = 'feed'>
                        <h5>{feed.title}</h5>
                        <div>{feed.content}</div>
                    </div>
                </div>
            </a>
        )
    })
    
    
    
    
    
    
    if(feedsInReducer) {
        return (
            <div>
                {renderFeeds}
            </div>
        )
    } else {
        return (
            <div> no Feeds </div>
        )
    }
}
