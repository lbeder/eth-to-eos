import * as ecc from "eosjs-ecc";
import * as eth from "ethereumjs-util";
import * as prompt from "password-prompt";

const convertKey = async () => {
  const inputPrivateKey = await prompt('ETH Private Key: ', { method: 'hide' });
  const rawPrivateKey = inputPrivateKey.startsWith('0x') ? inputPrivateKey.substr(2) : inputPrivateKey;
  const ethPrivateKey = Buffer.from(rawPrivateKey, 'hex');

  if (!eth.isValidPrivate(ethPrivateKey)) {
    console.error('Invalid Ethereum Private Key!');
    return;
  }

  const ethAddress = `0x${eth.privateToAddress(ethPrivateKey).toString('hex')}`;
  const ethPublicKey = eth.privateToPublic(ethPrivateKey).toString('hex');

  console.log(`ETH Address: ${ethAddress}`);
  console.log(`ETH Public Key: ${ethPublicKey}`);

  const eosWIF = ecc.PrivateKey(ethPrivateKey).toWif();
  const eosPrivateKey = eosWIF;
  const eosPublicKey = ecc.privateToPublic(eosWIF);

  console.log(`EOS Private Key: ${eosPrivateKey}`);
  console.log(`EOS Public Key: ${eosPublicKey}`);
};

convertKey();
