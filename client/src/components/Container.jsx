import { ethers } from "ethers";
import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Sidebar } from "./Sidebar";
import { AllOrders } from "./AllOrders";

const DEX_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const { Title } = Typography;

const SIDE = {
  BUY: 0,
  SELL: 1,
};
const drawerWidth = 400;

export const Container = ({
  provider,
  contracts,
  accounts,
  selectedToken,
  setSelectedToken,
  balance,
  setBalance,
  setAccounts,
}) => {
  const [tokens, setTokens] = useState([]);
  const [trades, setTrades] = useState([]);

  const getBalances = async (account, token) => {
    const tokenDex = await contracts.dex.traderBalances(
      account,
      ethers.utils.formatBytes32String(token),
    );
    const tokenWallet = await contracts.tokenContracts[selectedToken].balanceOf(
      account,
    );
    return {
      tokenDex: tokenDex.toString(),
      tokenWallet: tokenWallet.toString(),
    };
  };

  useEffect(() => {
    fetchTokens();

    const init = async () => {
      const balances = await getBalances(accounts[0], selectedToken);
      const orders = await getOrders(selectedToken);
      const _accounts = await provider.listAccounts();
      setAccounts(_accounts);
      setOrders(orders);
      setBalance(balances);
      console.log(balances);
    };
    init();
  }, [selectedToken]);

  const fetchTokens = async () => {
    const dex = contracts.dex;
    let tokens = await dex.getTokens();
    tokens = tokens.map((_item) =>
      ethers.utils.parseBytes32String(_item.ticker),
    );
    setTokens(tokens);
  };

  const [orders, setOrders] = useState({
    buy: [],
    sell: [],
  });

  const getOrders = async (token) => {
    const orders = await Promise.all([
      contracts.dex.getOrders(
        ethers.utils.formatBytes32String(token),
        SIDE.BUY,
      ),
      contracts.dex.getOrders(
        ethers.utils.formatBytes32String(token),
        SIDE.SELL,
      ),
    ]);

    return { buy: orders[0], sell: orders[1] };
  };

  const deposit = async (amount) => {
    await contracts.tokenContracts[selectedToken].approve(
      contracts.dex.address,
      amount,
    );

    await contracts.dex.deposit(
      amount,
      ethers.utils.formatBytes32String(selectedToken),
    );

    const balances = await getBalances(accounts[0], selectedToken);
    console.log(balances);
    setBalance(balances);
  };

  const withdraw = async (amount) => {
    await contracts.dex.withdraw(
      amount,
      ethers.utils.formatBytes32String(selectedToken),
    );

    const balances = await getBalances(accounts[0], selectedToken);

    setBalance(balances);
  };

  const createLimitOrder = async (amount, price, side) => {
    console.log(amount, price, side);
    const order = await contracts.dex.createLimitOrder(
      ethers.utils.formatBytes32String(selectedToken),
      amount,
      price,
      side,
    );
    console.log(order);
    const orders = await getOrders(selectedToken);
    setOrders(orders);
  };

  const createMarketOrder = async (amount, side) => {
    const order = await contracts.dex.createMarketOrder(
      ethers.utils.formatBytes32String(selectedToken),
      amount,
      side,
    );
    const orders = await getOrders(selectedToken);
    setOrders(orders);
  };

  const listenToTrades = (
    tradeId,
    orderId,
    ticker,
    trader1,
    trader2,
    amount,
    price,
    date,
  ) => {
    const trade = {
      tradeId,
      orderId,
      ticker,
      trader1,
      trader2,
      amount,
      price,
      date,
    };
    setTrades([...trades, trade]);
  };

  useEffect(() => {
    contracts.dex.on("NewTrade", listenToTrades);
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      {/* <CssBaseline /> */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ margin: "auto", fontWeight: "bold" }}
          >
            MotoSwap Exchange of ERC20
          </Typography>
        </Toolbar>
      </AppBar>
      <Sidebar
        setSelectedToken={setSelectedToken}
        tokens={tokens.filter((item) => item !== "DAI")}
        selectedToken={selectedToken}
        deposit={deposit}
        balance={balance}
        withdraw={withdraw}
        createLimitOrder={createLimitOrder}
        createMarketOrder={createMarketOrder}
      ></Sidebar>
      {/* <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {selectedToken}
      </Box> */}
      <AllOrders orders={orders} selectedToken={selectedToken} />
    </Box>
  );
};
