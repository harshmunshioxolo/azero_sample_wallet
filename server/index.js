const express = require('express');
const { mnemonicGenerate } = require('@polkadot/util-crypto');
const { keyring } = require('@polkadot/ui-keyring');
const { cryptoWaitReady } = require('@polkadot/util-crypto');

// Defining a port
const PORT = process.env.PORT || 3001;

// Deining the app 
const app = express();

// create a default endpoint
app.get("/", (req, res) => {
    res.json({message: "Hey hi! This is the backend. You can use other APIs and build on top of it."})
});

// a default enpoint to test the incoming params
app.get("/test_params", (req, res) => {
    const password = req.query.password;
    const username = req.query.user;
    res.json({message: "Welcome "+username});
});


// create and enpoint to generate the address
app.get("/generate_account", (req, res) => {
    // retrieve the values from the req
    const username = req.query.user;
    const paraphrase = req.query.password;

    // generate a random mnemonic, 12 words in length
    const mnemonic = mnemonicGenerate(12);

    // add the account, encrypt the stored JSON with an account-specific password
    const { pair, json } = keyring.addUri(mnemonic, paraphrase, { name: username });
    res.json({address: json.address});

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
    keyring.loadAll({ ss58Format: 42, type: 'sr25519' });
    console.log('Server listening to a port')
    })
);