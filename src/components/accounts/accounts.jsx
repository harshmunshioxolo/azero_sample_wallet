import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./accounts.css";
import {generate_account} from '../../scripts/generateAccount';

const defaultFormFields = {
  accountName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const defaultAccount = {
  json: "",
  pair: "",
}

export const MakeAccount = () => {
  let navigate = useNavigate();
  // create a state hook
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [account, setAccount] = useState(defaultAccount);
  const { accountName, email, password, confirmPassword } = formFields;

  // const handleSubmit = async(event) => {
  //     event.preventDefault();
  //     if (password !== confirmPassword) {
  //         alert("passwords do not match");
  //         return;
  //     }
  //     try {
  //         let res = await generate_account({accountName, password});
  //         ren = true;
  //         // parse another account on top
  //         console.log(res.json.address);
  //         console.log(ren);

  //     } catch(error) {
  //         console.log(error);
  //     }
  // }

  
  // write a new redirect function
  const handleRedirect = async (event) => {
    // check for event default
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('passwords do not match');
      return;
    }
    console.log(formFields);

    try {

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formFields)
      };
      
      // fetch from the API
      const account_data = await fetch('http://localhost:3001/generate_account', requestOptions);
      const {json, pair} = account_data.json();
      console.log(json);

    } catch(error) {
      console.log(error);
    }
  };

  // const handleRedirect = async (event) => {
  //   event.preventDefault();
  //   if (password !== confirmPassword) {
  //     alert("passwords do not match");
  //     return;
  //   }
  //   try {
  //     console.log("here");
  //     let res = await generate_account({accountName, password});
  //     const {pair, jsonFile} = res;
  //     console.log(res.json);
  //   //   this.props.router.push({
  //   //       pathname: 'generate',
  //   //       state: res.json,
  //   //   }
  //   //   );
  //     navigate("/generate", {replace: true, state: {jsonFile: jsonFile}});
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
