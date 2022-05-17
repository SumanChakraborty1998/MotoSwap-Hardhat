import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import Dex from "./contract/Dex.json";
import ERC20abi from "./contract/ERC20abi.json";

const DEX_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const getWeb3 = () => {
  return new Promise(async (resolve, reject) => {
    let provider = await detectEthereumProvider();
    if (provider) {
      await provider.request({ method: "eth_requestAccounts" });
      try {
        const web3 = new ethers.providers.Web3Provider(window.ethereum);
        resolve(web3);
      } catch (e) {
        reject(e);
      }
    }
    reject("No Web3 Provider Detected, Install Metamask");
  });
};

export const getContracts = async (web3) => {
  const dex = await new ethers.Contract(DEX_ADDRESS, Dex.abi, web3.getSigner());
  const tokens = await dex.getTokens();
  console.log(tokens);
  return dex;
};
