import Identicon from '@polkadot/react-identicon';
import React from "react";
import { useState } from "react";
import {useNavigate, useLocation} from 'react-router-dom';
import './accounts.css';

export const NewWallet = (props) => {
    // const {accountName, email, password, confirmPassword} = props;
    // let res = generate_account({accountName, password});

    // const image = <Identicon value={props.json.address} />;
    const {state} = useLocation();
    const {encoded, encoding, address, meta} = state;
    console.log(state);
    return (
        <div className='wallet_account-register'>
            {"all good!"}
        </div>
    )
};