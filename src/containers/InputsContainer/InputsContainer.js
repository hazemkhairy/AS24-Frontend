import React, { useState } from 'react';
import axios from 'axios';

import FileInput from '../../components/FileInput/FileInput';

import './InputsContainer.css';

const InputsContainer = ({ setReports }) => {
    const [listingsFile, setListingsFile] = useState(null);
    const [contactsFile, setContactsFile] = useState(null);

    const [listingError, setListingsError] = useState(false);
    const [contactsError, setContactssError] = useState(false);

    const handleDefault = () => {
        axios.post('http://localhost:4000/generateReports', { useDefault: true }).then(
            (res) => {
                if (res.status !== 200) {
                    console.log(res.data.messages)
                }
                else {
                    console.log(res.data);
                    setReports(res.data);
                }
            }
        )
    }
    const handleUpload = () => {
        const fd = new FormData();
        if (isValidInput()) {
            fd.append('files', listingsFile, "listings.csv");
            fd.append('files', contactsFile, "contacts.csv");
            axios.post('http://localhost:4000/generateReports', fd).then(
                (res) => {
                    if (res.status !== 200) {
                        console.log(res.messages)
                    }
                    else {
                        console.log(res.data);
                        setReports(res.data);
                    }
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
    return (
        <div className="InputsContainer d-flex flex-column align-items-center justify-content-between">
            <FileInput error={listingError} placeHolder="Listings File" setFile={setListingsFile} />
            <FileInput error={contactsError} placeHolder="Contacts File" setFile={setContactsFile} />
            <div className="d-flex flex-column justify-content-between align-items-center">

                <input type="button" onClick={handleUpload} value="Use Uploaded Files" className="btn btn-primary" />
                <label>OR</label>
                <input type="button" onClick={handleDefault} value="Use Default Files" className="btn btn-primary" />
            </div>
        </div>
    )
}

export default InputsContainer;