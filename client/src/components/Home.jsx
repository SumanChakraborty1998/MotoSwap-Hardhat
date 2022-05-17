import React, { useEffect } from "react";
import { getContracts, getWeb3 } from "./../utils";

export const Home = () => {
  useEffect(() => {
    const init = async () => {
      const provider = await getWeb3();
      const dex = await getContracts(provider);
      console.log(dex);
    };
    init();
  }, []);
  return <div>Home</div>;
};
