import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getFeedById } from "../../../_actions/feed_action";

export default () => {

    const dispatch = useDispatch();
    const { id } = useParams();
    const feedInReducer = useSelector(state => state.feed);


    useEffect(() => {
        dispatch(getFeedById({id}))
    }, []);

    const feed = feedInReducer.feed;

    

    if(feed){
        return (
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
        )
    } else {
        return (
            <div>...loading</div>
        )
    }
}
