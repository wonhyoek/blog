import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFeeds } from "../../../_actions/feed_action";
import './LandingPage.css';


export default () => {
    
    const feeds = useSelector(state => state.feed);
    const dispatch = useDispatch();

    useEffect(() => {
        
        dispatch(getFeeds())

    }, []);

    const feedsInReducer = feeds.feeds;

    const renderFeeds = feedsInReducer && feedsInReducer.map((feed, index) => {
        return (
            <div className = 'feed_container' key = {index}>
                <div className = 'feed_author'>
                    <img className = 'feed_author_img' src = {`http://localhost:5000/${feed.userimage}`}/>
                    <p>{feed.author}</p>
                </div>
                <div className = 'feed'>
                    <h5>{feed.title}</h5>
                    <div>{feed.content}</div>
                </div>
            </div>
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
