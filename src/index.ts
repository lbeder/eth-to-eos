import * as prompt from "password-prompt";
import Converter from "./converter";

const convertKey = async () => {
  const ethPrivateKey = await prompt("ETH Private Key: ", { method: "hide" });
  const converter = new Converter(ethPrivateKey);

  console.log(`ETH Address: ${converter.getEthPublicAddress()}`);
  console.log(`ETH Public Key: ${converter.getEthPublicKey()}`);
  console.log(`EOS Public Key: ${converter.getEosPublicKey()}`);
  console.log(`EOS Private Key: ${converter.getEosPrivateKey()}`);
};

convertKey();
