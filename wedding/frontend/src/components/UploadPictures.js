import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Button, Box, Typography } from '@mui/material';
import Navigation from "./Navigation";
import TextField from '@mui/material/TextField';

import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader'
import './uploadpictures.scss';

const UploadPictures = (appData) => {
  
  const navigate = useNavigate();

  const [filesUploaded, setFilesUploaded] = useState([]);

  const [post, setPost] = useState({
    name: '',
  });

  const updateState = (event, value) => {
    setPost({ name: event.target.value });    
  }

  const maximumFileSizeMB = 10;
  
  // specify upload params and url for your files
  const getUploadParams = ({ file, meta }) => { 
    console.log('Meta: ', meta, 'File: ', file);
    return { 
      url: appData.T_API_SERVER_URL + 'upload-pictures/' + encodeURIComponent(post.name), 
      PreviewComponent: null     
    };
  }
  
  // called every time a file's `status` changes
  const handleChangeStatus = ({ file }, status, allFiles) => { 
    console.log(status);
    if (status === 'done') {
      allFiles.forEach(f => { 
        if (f.file.name === file.name ) {
          setFilesUploaded([...filesUploaded, f.file]);
          f.remove();
        }
      });      
    }
  }
  
  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }

  
  return (
    <>
      <div className='upload-pictures-container'>
        <h1 className="top-header">Send Us Your Pictures</h1>
        <Navigation {...appData}/>                
        <div className='home-message'>
          {post.name && <span><span>{post.name}</span>, thank </span>}
          {!post.name && <span>Thank </span>}
          you so much for taking pictures<br/>and videos and for sharing them with us!
        </div>
        <div className="guestbook-form">
          <div>
            <div className="fieldLabel">Your Name</div>
            <div className="annotation">Required</div>
            <TextField 
              required
              value={post.name}
              onChange={updateState}
              className="guestbook-form-element"
              id="name" 
              variant="outlined" 
              placeholder="Name"
            />
          </div>
          <div>
          <div className="fieldLabel">Your Pictures</div>
            <div className='dropzone-container'>            
              {!post.name && <div className='enter-name'>Please enter your name to enable the drop zone.<br></br>Just select or drop files to upload them.</div>}
              <Dropzone
                disabled={post.name ? false : true}
                getUploadParams={getUploadParams}
                onChangeStatus={handleChangeStatus}
                onSubmit={handleSubmit}
                accept="image/*,audio/*,video/*"
                inputWithFilesContent="Upload more media files"
                inputContent="Drop files here or tap to browse."
              />            
            </div>
            {filesUploaded.length > 0 && <div>Successfully uploaded {filesUploaded.length} file{filesUploaded.length !== 1 && <span>s</span>}. You can add more!</div>}
          </div>
          <div className='filesCompleted'>
            { filesUploaded.map((file) => <div>{file.name} ~{(file.size / 1024 / 1024).toFixed(1)} MB</div>)}
          </div>
          <div className='footer'>
            Thank you so much, {post.name}!
          </div>
        </div>                      
      </div>
    </>
  );
};

export default UploadPictures;