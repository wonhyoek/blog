import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { deleteFeed, getFeedById, updateFeed } from "../../../_actions/feed_action";
import './FeedDetailPage.css';

export default () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();


    const feedInReducer = useSelector(state => state.feed);
    const userInReducer = useSelector( state => state.user );
    const user = userInReducer.user;
    const feed = feedInReducer.feed;

    useEffect(() => {
        dispatch(getFeedById({id}))
        .then( res => {
            setTitle(res.payload.feed.title)
            setContent(res.payload.feed.content)
        })
    }, []);
    
    
    
    const [ToggleUpdate, setToggleUpdate] = useState(false);
    const [Title, setTitle] = useState("");
    const [Content, setContent] = useState("");
    
    const onSetToggleUpdate = () => {
        setToggleUpdate(!ToggleUpdate);
    }
    const onTitleChange = (e) => {
        setTitle(e.currentTarget.value)
    }
    const onContentChange = (e) => {
        setContent(e.currentTarget.value)
    }


    
    const onDeleteFeed = () => {
        dispatch(deleteFeed(id))
        .then( res => {
            history.push('/')
        })
        .catch( err => {
            console.log(err);
            alert('삭제하지 못했습니다.')

        })
    }

    const onUpdateSubmit = (e) => {

        if(Title === "" || Content === ""){
            alert('공백으로는 업로드 할 수 없습니다.');
            return;
        }

        e.preventDefault();
        
        const body = {
            title: Title,
            content: Content
        }
        
        dispatch(updateFeed(body, id))
        .then(res => {
            if(res.payload.success){
                window.location.reload();
            } else {
                alert('업데이트에 실패했습니다.')
            }
        })
    }


    const deleteFeedButton = (
        <button onClick = {onDeleteFeed}>
            delete
        </button>
    )

    const updateFeedButton = (
        <button onClick = {onSetToggleUpdate}>
            update
        </button>
    )

    const cancelUpdateFeedButton = (
        <button onClick = {onSetToggleUpdate}>
            cancel
        </button>
    )

    

    if(feed){
        if(ToggleUpdate === false) {
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
                    { user && user.username === feed.author && deleteFeedButton}
                    { user && user.username === feed.author && updateFeedButton}
                </div>
            )
        } else {
            return (
                <div className = 'feed_container'>
                    <div className = 'feed_author'>
                        <img className = 'feed_author_img' src = {`http://localhost:5000/${feed.userimage}`}/>
                        <p>{feed.author}</p>
                    </div>
                    <form onSubmit = {onUpdateSubmit}>
                        <div className = 'feed'>
                            <input value = {Title} onChange = {onTitleChange}/>
                            <input value = {Content} onChange = {onContentChange}/>
                            <button onSubmit = {onUpdateSubmit}>update</button>
                            {cancelUpdateFeedButton}
                        </div>
                    </form>
                </div>
            )
        }
    } else {
        return (
            <div>...loading</div>
        )
    }
}
