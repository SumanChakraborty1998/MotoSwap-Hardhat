import React, { useEffect, useState } from "react";
import { getContracts, getWeb3 } from "../utils";
import { Container } from "./Container";

export const Home = () => {
  const [provider, setProvider] = useState(undefined);
  const [contracts, setContracts] = useState(undefined);
  const [accounts, setAccounts] = useState([]);
  const [selectedToken, setSelectedToken] = useState("DAI");
  const [balance, setBalance] = useState({});

  useEffect(() => {
    const init = async () => {
      const provider = await getWeb3();
      console.log(provider);

      const contracts = await getContracts(provider);
      const accounts = await provider.listAccounts();

      setProvider(provider);
      setContracts(contracts);
      setAccounts(accounts);
    };
    init();
  }, []);

  const isReady = () => {
    return provider && contracts && accounts.length > 0;
  };

  return (
    <div className="App">
      {!isReady() ? (
        <div>Loading...</div>
      ) : (
        <Container
          provider={provider}
          contracts={contracts}
          accounts={accounts}
          setSelectedToken={setSelectedToken}
          selectedToken={selectedToken}
          balance={balance}
          setBalance={setBalance}
          setAccounts={setAccounts}
        ></Container>
      )}
    </div>
  );
};
