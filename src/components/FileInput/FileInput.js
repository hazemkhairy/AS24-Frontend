import React from 'react';
import './FileInput.css';

const FileInput = ({ setFile, placeHolder, error }) => {

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }
    let styles = "FileInputContainer mb-4"
    if (error) {
        styles += " FileInputError";
    }
    return <div className={`${styles}`}>
        <label className="mr-4">{placeHolder}</label>
        <input type="file" onChange={handleFileChange} />

    </div>
}

export default FileInput;