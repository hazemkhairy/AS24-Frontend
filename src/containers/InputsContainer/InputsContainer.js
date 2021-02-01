import React from 'react';
import axios from 'axios';

import './InputsContainer.css';

const InputsContainer = () => {
    const handleDefault = () => {
        axios.post('http://localhost:4000/generateReports').then(
            (res) => {
                if (res.status !== 200) {
                    console.log(res.data.messages)
                }
                else {
                    console.log(res.data);
                }
            }
        )
    }
    return (
        <div className="InputsContainer d-flex flex-column align-items-center justify-content-between">
            <div className="d-flex flex-column justify-content-between align-items-center">

                <input type="button" onClick={handleDefault} value="Use Default Files" className="btn btn-primary" />
            </div>
        </div>
    )
}

export default InputsContainer;