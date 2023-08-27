import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import './drop-file-input.css';

import { ImageConfig } from '../../config/ImageConfig'; 
import uploadImg from '../../assets/cloud-upload-regular-240.png';
import axios from 'axios';

const DropFileInput = props => {

    const [routeName, setRouteName] = useState('');
    const [routeCompany, setRouteCompany] = useState('');

    const handleRouteNameChange = (event) => {
        setRouteName(event.target.value);
    };

    const handleRouteCompanyChange = (event) => {
        setRouteCompany(event.target.value);
    };


    const wrapperRef = useRef(null);

    const [fileList, setFileList] = useState([]);

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const handleUploadButtonClick = () => {
        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('files[]', file);
        });
        formData.append('routeName', routeName);
        formData.append('routeCompany', routeCompany);
    
        axios.post('YOUR_API_ENDPOINT_URL', formData)
            .then(response => {
                console.log('Upload successful:', response.data);
                setFileList([]); 
                window.alert('Files uploaded successfully!');
            })
            .catch(error => {
                console.error('Upload error:', error);
                window.alert('An error occurred during upload. Please try again.');
            });
    };


    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        if (newFile) {
            if (newFile.type === 'text/csv') {
                const updatedList = [...fileList, newFile];
                setFileList(updatedList);
                props.onFileChange(updatedList);
            } else {
                alert("Only CSV files are allowed.");
            }
        }
    }

    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        props.onFileChange(updatedList);
    }

    return (
        <>
            <div className="route-input-fields">
                <div className="route-input-fields-row">
                    <label>Route Name : </label>
                    <input
                        type="text"
                        placeholder="Route Name"
                        value={routeName}
                        onChange={handleRouteNameChange}
                    />
                </div>
                <div className="route-input-fields-row">
                    <label>Route Name : </label>
                    <input
                        type="text"
                        placeholder="Route Company"
                        value={routeCompany}
                        onChange={handleRouteCompanyChange}
                    />
                </div>
               
            </div>
            {
                fileList.length === 0 ? (
                <div
                    ref={wrapperRef}
                    className="drop-file-input"
                    onDragEnter={onDragEnter}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                >
                    <div className="drop-file-input__label">
                        <img src={uploadImg} alt="" />
                        <h1>Drag & Drop your files here</h1>
                    </div>
                    <input type="file" value="" onChange={onFileDrop}/>
                </div>
                ) : null
            }
            
            {
                fileList.length > 0 ? (
                    <div className="drop-file-preview">
                        <h1 className="drop-file-preview__title">
                            Ready to upload
                        </h1>
                        {
                            fileList.map((item, index) => (
                                <div key={index} className="drop-file-preview__item">
                                    <img src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']} alt="" />
                                    <div className="drop-file-preview__item__info">
                                        <p>{item.name}</p>
                                        <p>{item.size}B</p>
                                    </div>
                                    <span className="drop-file-preview__item__del" onClick={() => fileRemove(item)}>x</span>
                                    {/* <button className="upload-button" onClick={handleUploadButtonClick}>
                                        Upload Files
                                    </button> */}
                                
                                </div>
                            ))
                        }
                    </div>
                ) : null
            }
            {
                fileList.length > 0 ? (
                <button className="submit-button" onClick={handleUploadButtonClick}>
                submit file
                </button>
                ) : null
            }
            
        </>
    );
}

DropFileInput.propTypes = {
    onFileChange: PropTypes.func
}

export default DropFileInput;
