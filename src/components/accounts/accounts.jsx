import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./accounts.css";
import {generate_account} from '../../scripts/generateAccount';
import {NewWallet} from './generated';

const defaultFormFields = {
  accountName: "",
  email: "",
  password: "",
  confirmPassword: "",
};


export const MakeAccount = () => {
  let navigate = useNavigate();
  // create a state hook
  const [formFields, setFormFields] = useState(defaultFormFields);
  // create a state hook for account
  const [account, setAccount] = useState({json: {}, pair: {}});
  const { accountName, email, password, confirmPassword } = formFields;
  
  // write a new redirect function
  const handleRedirect = async (event) => {
    // check for event default
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('passwords do not match');
      return;
    }

    // return (
    //   <NewWallet {...formFields} />
    // );
    console.log(formFields);

    try {

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formFields)
      };
      
      // fetch from the API
      const result = await fetch('http://localhost:3001/generate_account', requestOptions);
      const data = await result.json();
      const json_data = data.json;
      const pair = data.pair;

      // .then(data => {
      //   let json_res = data.json().json;
      //   let pair_res = data.json().pair;
      //   setAccount({
      //     json: json_res,
      //     pair: pair_res
      //   })
      // });
      
      console.log(json_data);

    } catch(error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="wallet_account-register">
      <form className="wallet_account-form" onSubmit={handleRedirect}>
        <label className="wallet_account-form_label">Azero New Account</label>
        <input
          type="text"
          className="wallet_account-form_text_big"
          placeholder="Full Name"
          required
          onChange={handleChange}
          name="accountName"
        />
        {/* <label className='wallet_account-form_label'>Email</label> */}
        <input
          type="email"
          className="wallet_account-form_text"
          placeholder="Email"
          required
          onChange={handleChange}
          name="email"
        />
        {/* <label className='wallet_account-form_label'>Password</label> */}
        <input
          type="password"
          className="wallet_account-form_text"
          placeholder="Password"
          required
          onChange={handleChange}
          name="password"
        />
        {/* <label className='wallet_account-form_label'>Confirm Password</label> */}
        <input
          type="password"
          className="wallet_account-form_text"
          placeholder="Confirm Password"
          required
          onChange={handleChange}
          name="confirmPassword"
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>

  );
};
