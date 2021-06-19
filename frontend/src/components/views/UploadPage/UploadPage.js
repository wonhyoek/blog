import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {useDispatch} from "react-redux";
import { createFeed } from '../../../_actions/feed_action';
import './UploadPage.css';


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

        if(Title === "" || Content === ""){
            alert('공백으로는 업로드 할 수 없습니다.');
            return;
        }

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
        <div className = 'container'>
            <form className = 'form' onSubmit = {onFeedSubmit}>
                <input className = 'title' 
                    value = {Title} 
                    onChange = {onTitleChange} 
                    placeholder = "Title"
                />
                <input className = 'content'
                    value = {Content} 
                    onChange = {onContentChange} 
                    placeholder = "Content"
                />
            </form>
            <button className = 'signin' onClick = {onFeedSubmit}>Upload</button>
        </div>
    )
}
