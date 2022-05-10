const express = require('express');
const { mnemonicGenerate } = require('@polkadot/util-crypto');
const { keyring } = require('@polkadot/ui-keyring');
const { cryptoWaitReady } = require('@polkadot/util-crypto');
const cors = require('cors');

// Defining a port
const PORT = process.env.PORT || 3001;

// Deining the app 
const app = express();
app.use(cors());

/** 
 * create a default endpoint
 * @param {req} request body from the front end
 * @returns {res} json response
*/
app.get("/", (req, res) => {
    res.json({message: "Hey hi! This is the backend. You can use other APIs and build on top of it."})
});


/** 
 * create a default test endpoint
 * @param {req} request body from the front end
 * @param {req.query.password} string encrypted password
 * @param {req.query.user} string user name
 */
app.post("/test_params", (req, res) => {
    const password = req.query.password;
    const username = req.query.user;
    res.json({message: "Welcome "+username});
});


// create and enpoint to generate the address
app.post("/generate_account", (req, res) => {

    // retrieve the values from the req
    const username = req.query.accountName;
    const paraphrase = req.query.password;

    // generate a random mnemonic, 12 words in length
    const mnemonic = mnemonicGenerate(12);

    // add the account, encrypt the stored JSON with an account-specific password
    const { pair, json } = keyring.addUri(mnemonic, paraphrase, { name: username });
    res.json({json: json, pair: pair});

});

// create a sample address for test purpose
app.get("/test_generate", (req, res) => {
    // generate a random mnemonic, 12 words in length
    const mnemonic = mnemonicGenerate(12);

    // add the account, encrypt the stored JSON with an account-specific password
    const { pair, json } = keyring.addUri(mnemonic, 'myStr0ngP@ssworD', { name: 'sample_acc' });
    res.json({address: json.address});

});

// create a sample endpoint
app.get("/hello", (req, res) => {
    res.json({message: "Hello! Welcome to Azero community outreach!"});
});



// initialize the server with keyrings
cryptoWaitReady().then(() => app.listen(PORT, () => {
    // initialize it with ss58Format 42 for default substrate format (for azero)
    keyring.loadAll({ ss58Format: 42, type: 'sr25519' });
    console.log('Server listening to a port')
    })
);