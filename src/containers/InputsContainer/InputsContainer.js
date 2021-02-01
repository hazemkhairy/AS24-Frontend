import React, { useState } from 'react';
import axios from 'axios';

import FileInput from '../../components/FileInput/FileInput';

import './InputsContainer.css';

const InputsContainer = ({ setReports }) => {
    const [listingsFile, setListingsFile] = useState(null);
    const [contactsFile, setContactsFile] = useState(null);
    const [backendError, setBackendError] = useState(false);
    const [backendErrorMessages, setBackendErrorMessages] = useState([]);
    const [listingError, setListingsError] = useState(false);
    const [contactsError, setContactssError] = useState(false);

    const handleDefault = () => {
        axios.post('http://localhost:4000/generateReports', { useDefault: true }).then(
            (res) => {
                if (res.status !== 200) {
                    setBackendError(true);
                    setBackendErrorMessages(res.data.messages.slice(0, 100));
                }
                else {
                    setBackendError(false);
                    if (res.data)
                        setReports(res.data);
                }
            }
        ).catch(
            err => {
                setBackendError(true);
                if (err.response && err.response.data && err.response.data.messages)
                    setBackendErrorMessages(err.response.data.messages.slice(0, 100));
            }
        )
    }
    const handleUpload = () => {
        const fd = new FormData();
        if (isValidInput()) {
            fd.append('files', listingsFile, "listings.csv");
            fd.append('files', contactsFile, "contacts.csv");
            console.log(fd)
            axios.post('http://localhost:4000/generateReports', fd).then(
                (res) => {
                    if (res.status !== 200) {
                        setBackendError(true);
                        setBackendErrorMessages(res.data.messages.slice(0, 100));
                    }
                    else {
                        setBackendError(false);
                        if (res.data)
                            setReports(res.data);
                    }
                }
            ).catch(
                err => {
                    setBackendError(true);
                    if (err.response && err.response.data && err.response.data.messages)
                        setBackendErrorMessages(err.response.data.messages.slice(0, 100));
                }
            )
        }
    }
    const isValidInput = () => {
        let valid = true;
        if (!listingsFile) {
            setListingsError(true);
            valid = false;
        }
        else {
            setListingsError(false);
        }
        if (!contactsFile) {
            setContactssError(true);
            valid = false;
        }
        else {
            setContactssError(false);
        }
        return valid;
    }
    const getBackendErrorMessages = () => {
        if (backendErrorMessages.length === 0)
            return <div className="errorMessage">
                <p className="p-0 m-1"> Unkown error </p>
            </div>
        return backendErrorMessages.map((message) => {
            return <div className="errorMessage">
                <p className="p-0 m-1"> {message} </p>
            </div>
        })
    }
    return (
        <div className="InputsContainer d-flex flex-column align-items-center justify-content-between">
            <FileInput error={listingError} placeHolder="Listings File" setFile={setListingsFile} />
            <FileInput error={contactsError} placeHolder="Contacts File" setFile={setContactsFile} />
            <div className="d-flex flex-column justify-content-between align-items-center">

                <input type="button" onClick={handleUpload} value="Use Uploaded Files" className="btn btn-primary" />
                <label>OR</label>
                <input type="button" onClick={handleDefault} value="Use Default Files" className="btn btn-primary" />
            </div>
            {backendError && <div className="mt-2">
                <input type="button" value="Clear errors" className="btn btn-danger mb-2" onClick={() => { setBackendError(false) }} />
                <div className="errorDiv">

                    {getBackendErrorMessages()}
                </div>
            </div>}
        </div>
    )
}

export default InputsContainer;