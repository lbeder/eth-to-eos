import { expect } from "chai";
import Converter from "../src/Converter";

describe("Converter", () => {
  [
    "",
    "0x",
    "123",
    "0x512a25e312e3f835e62df591bc8783cd7e329cccd2b6467387bbc59009709e0",
    "512a25e312e3f835e62df591bc8783cd7e329cccd2b6467387bbc59009709e0"
  ].forEach((invalidKey) => {
    it(`throws on invalid ethereum key ${invalidKey}`, () => {
      expect(() => new Converter(invalidKey)).to.throw("Invalid Ethereum Private Key!");
    });
  });

  [{
    eosPrivateKey: "5JS2phu6x8UAEWCtcRt6NVWnKkBEDADpd92HxoFJBePmYiapLGy",
    eosPublicKey: "EOS5A8YPZ3WkQ2PLb2Zzbi2zjiMAWowSj6gnrvvtT8JmJBCBLDK8P",
    ethPrivateKey: "0x512a25e312e3f835e62df591bc8783cd7e329cccd2b6467387bbc59009709e04",
    ethPublicAddress: "0x4ac54fd1f4044acfc9315490662c06ec1a13d627",
    ethPublicKey: "2383e4c737f9b000392f0d3cb84386228217014b179dc06aa49de10ec44af54a022c88c49bbdcce75a9aa6569038c3d227828a431de9b94b6d58c9c9e2ada326", // tslint:disable-line:max-line-length
  },
  {
    eosPrivateKey: "5JS2phu6x8UAEWCtcRt6NVWnKkBEDADpd92HxoFJBePmYiapLGy",
    eosPublicKey: "EOS5A8YPZ3WkQ2PLb2Zzbi2zjiMAWowSj6gnrvvtT8JmJBCBLDK8P",
    ethPrivateKey: "512a25e312e3f835e62df591bc8783cd7e329cccd2b6467387bbc59009709e04",
    ethPublicAddress: "0x4ac54fd1f4044acfc9315490662c06ec1a13d627",
    ethPublicKey: "2383e4c737f9b000392f0d3cb84386228217014b179dc06aa49de10ec44af54a022c88c49bbdcce75a9aa6569038c3d227828a431de9b94b6d58c9c9e2ada326", // tslint:disable-line:max-line-length
  },
  {
    eosPrivateKey: "5JVeumUQyL5H2oVePqNaPxjyxeS4EQ8TPDiYHB5ffkn9ZegATEH",
    eosPublicKey: "EOS5832ZnTVE9gTts8Qcjeb5YoDtPJ1i7Eys3hk2GQ48TkwF38ZMR",
    ethPrivateKey: "0x5963a795918120e27837dc62be0d4e42a4edd9dbea21a196e4903affda53fa13",
    ethPublicAddress: "0xfbd0e563111334309129f8d7887bf20ff880e9dc",
    ethPublicKey: "1ec21247730db59d6505e691386cd62e86123bb98fc7fe6e020be8692a7f67fc8712b5fd6f06d2029f477e3815857c6119423e0a0ad8bebc75b798b60bb1ab20", // tslint:disable-line:max-line-length
  }].forEach(({ ethPrivateKey, ethPublicAddress, ethPublicKey, eosPublicKey, eosPrivateKey }) => {
    it(`converts ${ethPrivateKey}`, () => {
      const converter = new Converter(ethPrivateKey);
      expect(converter.getEthPublicAddress()).to.eql(ethPublicAddress);
      expect(converter.getEthPublicKey()).to.eql(ethPublicKey);
      expect(converter.getEosPublicKey()).to.eql(eosPublicKey);
      expect(converter.getEosPrivateKey()).to.eql(eosPrivateKey);
    });
  });
});
