import React, { useCallback } from 'react';
import { useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { uploadUserimage, updateUserimage, auth } from "../../../_actions/user_action";


export default () => {

    const dispatch = useDispatch();
    const userInReducer = useSelector(state => state.user);
    const user = userInReducer.user;
    const onDrop = useCallback((files) => {
        
        let formData = new FormData;
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        
        formData.append('file', files[0]);

        let body = {
            formData, 
            config
        }

        

        dispatch(uploadUserimage(body))
        .then( res => {
            if(res.payload.success){
                console.log(res.payload.filePath);
                dispatch(updateUserimage({userimage: res.payload.filePath}))
                .then( res => {
                    if(res.payload.success){
                        dispatch(auth());
                    }
                })
            }
        } );
    
    },[]);
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    if(user){
        return (
            <div>
                <div 
                    style = {{display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    flexDirection: 'row'
                }}
                >
                    <div {...getRootProps()}>
                        
                            <img style = {{ width: '160px', height: '160px', borderRadius: '80px'}}
                                src = {`http://localhost:5000/${user.userimage}`}
                            />
                            <input {...getInputProps()}/>
                    </div>
                    <div style = {{marginLeft: '20px'}}>
                        <h2>{user.username}</h2>
                    </div>
                </div>
        </div>
        ) 
    } else {
        return '...loading';
    }
}
