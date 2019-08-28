import * as ecc from "eosjs-ecc";
import * as eth from "ethereumjs-util";

export default class Converter {
  private ethPrivateKey: Buffer;
  private eosPublicKey: string;
  private eosPrivateKey: string;

  constructor(ethPrivateKey: string) {
    const rawPrivateKey = Buffer.from(ethPrivateKey.startsWith("0x") ? ethPrivateKey.substr(2) : ethPrivateKey, "hex");
    if (!eth.isValidPrivate(rawPrivateKey)) {
      throw new Error("Invalid Ethereum Private Key!");
    }

    this.ethPrivateKey = rawPrivateKey;
    const eosWIF = ecc.PrivateKey(this.ethPrivateKey).toWif();
    this.eosPrivateKey = eosWIF;
    this.eosPublicKey = ecc.privateToPublic(eosWIF);
  }

  public getEthPublicAddress(): string {
    return `0x${eth.privateToAddress(this.ethPrivateKey).toString("hex")}`;
  }

  public getEthPublicKey(): string {
    return eth.privateToPublic(this.ethPrivateKey).toString("hex");
  }

  public getEosPublicKey(): string {
    return this.eosPublicKey;
  }

  public getEosPrivateKey(): string {
    return this.eosPrivateKey;
  }
}
