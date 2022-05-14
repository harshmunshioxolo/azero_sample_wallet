import Identicon from '@polkadot/react-identicon';
import { json } from 'express';
import React from "react";
import { useState } from "react";
import {useNavigate, useLocation} from 'react-router-dom';
import './accounts.css';


// define an async function


export const NewWallet = (props) => {
    const location = useLocation();

    const newAccount = async() => {
        try {
    
            //define formFields
            const formFields = location.state;
    
            // define request options
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formFields)
            };
            
            // fetch from the API
            // async API calls
            const result = await fetch('http://localhost:3001/generate_account', requestOptions);
    
            // jsonify data
            const data = await result.json();
    
            // split between data and pair
            const json_data = data.json;
            const pair = data.pair;

            return json_data;
    
        } catch(error) {
            alert('There is an error:' + {error});
        }
    }

    const json_data = newAccount();
    return (
        <div className='wallet_account-register'>
            {json_data.address}
        </div>
    )
};