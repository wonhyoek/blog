import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFeeds } from "../../../_actions/feed_action";
import './LandingPage.css';


export default () => {
    
    const dispatch = useDispatch();
    const [Feeds, setFeeds] = useState([]);

    useEffect(() => {
        
        dispatch(getFeeds())
        .then( res => {
            if(res.payload.feeds){
                setFeeds(res.payload.feeds)
            }
        })

    }, []);


    const renderFeeds = Feeds && Feeds.map((feed, index) => {
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
    
    
    
    
    
    
    if(Feeds.length !== 0) {
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
