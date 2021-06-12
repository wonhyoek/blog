import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {useDispatch} from "react-redux";
import { createFeed } from '../../../_actions/feed_action';


export default () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [Title, setTitle] = useState("");
    const [Content, setContent] = useState("");
    
    const onTitleChange = (e) => {
        setTitle(e.currentTarget.value);
    }
    const onContentChange = (e) => {
        setContent(e.currentTarget.value);
    }


    const onFeedSubmit = () => {

        const body = {
            title: Title,
            content: Content
        }

        dispatch(createFeed(body))
        .then( res => {
            console.log(res);
            if(res.payload.success){
                const feedId = res.payload.feedId;
                history.push(`/feeds/${feedId}`);
            } else {
                alert("업로드에 실패했습니다.")
            }
        })

    }
    
    return (
        <div>
            <form onSubmit = {onFeedSubmit}>
                <input value = {Title} onChange = {onTitleChange} placeholder = "Title"/>
                <input value = {Content} onChange = {onContentChange} placeholder = "Content"/>
            </form>
            <button onClick = {onFeedSubmit}>Upload</button>
        </div>
    )
}
