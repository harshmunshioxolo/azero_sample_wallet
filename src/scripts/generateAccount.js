import { mnemonicGenerate } from '@polkadot/util-crypto';
import { keyring } from '@polkadot/ui-keyring';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { ApiPromise, WsProvider } from '@polkadot/api';

export const generate_mnemonic = () => {
    // generate a random mnemonic, 12 words in length
    const mnemonic = mnemonicGenerate(12);

    // return string mnemonic
    return mnemonic;
};


export const generate_account = async({password, name}) => {
    // const provider = new WsProvider('wss://ws-smartnet.test.azero.dev');
    // const api = await ApiPromise.create({ provider });
    const mnemonic = generate_mnemonic();
    await cryptoWaitReady().then(() => {
        keyring.loadAll({ ss58Format: 42, type: 'sr25519' });
    });
    const { pair, json } = keyring.addUri(mnemonic, password, { name: name });

    return ({'pair': pair, 'json': json, 'mnemonic': mnemonic});         

};

