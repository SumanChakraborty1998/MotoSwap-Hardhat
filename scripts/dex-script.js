const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
  const [DAI, BAT, SHIB, XRP] = ["DAI", "BAT", "SHIB", "XRP"].map((ticker) =>
    hre.ethers.utils.formatBytes32String(ticker),
  );

  const SIDE = {
    BUY: 0,
    SELL: 1,
  };

  const [trader1, trader2, trader3, trader4] = await hre.ethers.getSigners();

  // console.log("trader1", trader1.address);
  // console.log("trader2", trader2.address);
  // console.log("trader3", trader3.address);
  // console.log("trader4", trader4.address);

  const Dex = await hre.ethers.getContractFactory("Dex");
  const Bat = await hre.ethers.getContractFactory("Bat");
  const Dai = await hre.ethers.getContractFactory("Dai");
  const Shib = await hre.ethers.getContractFactory("Shib");
  const Xrp = await hre.ethers.getContractFactory("Xrp");

  const dex = await Dex.deploy();
  const bat = await Bat.deploy();
  const dai = await Dai.deploy();
  const shib = await Shib.deploy();
  const xrp = await Xrp.deploy();

  await dex.deployed();
  await bat.deployed();
  await dai.deployed();
  await shib.deployed();
  await xrp.deployed();

  await Promise.all([
    dex.addToken(DAI, dai.address),
    dex.addToken(BAT, bat.address),
    dex.addToken(SHIB, shib.address),
    dex.addToken(XRP, xrp.address),
  ]);

  const amount = hre.ethers.utils.parseEther("1000");

  const seedTokenBalance = async (token, trader) => {
    await token.faucet(trader.address, amount);

    await token.connect(trader).approve(dex.address, amount);
    const ticker = await token.name();
    await dex
      .connect(trader)
      .deposit(amount, hre.ethers.utils.formatBytes32String(ticker));
  };

  await Promise.all(
    [dai, bat, shib, xrp].map((token) => seedTokenBalance(token, trader1)),
  );

  await Promise.all(
    [dai, bat, shib, xrp].map((token) => seedTokenBalance(token, trader2)),
  );
  await Promise.all(
    [dai, bat, shib, xrp].map((token) => seedTokenBalance(token, trader3)),
  );
  await Promise.all(
    [dai, bat, shib, xrp].map((token) => seedTokenBalance(token, trader4)),
  );

  console.log("Seed Added");

  const increaseTime = async (seconds) => {
    await ethers.provider.send("evm_increaseTime", [seconds]);
    await ethers.provider.send("evm_mine");
  };

  await dex.connect(trader1).createLimitOrder(BAT, 1000, 10, SIDE.BUY);
  await dex.connect(trader2).createMarketOrder(BAT, 1000, SIDE.SELL);
  await increaseTime(1);
  await dex.connect(trader1).createLimitOrder(BAT, 1200, 11, SIDE.BUY);
  await dex.connect(trader2).createMarketOrder(BAT, 1200, SIDE.SELL);
  await increaseTime(1);
  await dex.connect(trader1).createLimitOrder(BAT, 1200, 15, SIDE.BUY);
  await dex.connect(trader2).createMarketOrder(BAT, 1200, SIDE.SELL);
  await increaseTime(1);
  await dex.connect(trader1).createLimitOrder(BAT, 1500, 14, SIDE.BUY);
  await dex.connect(trader2).createMarketOrder(BAT, 1500, SIDE.SELL);
  await increaseTime(1);
  await dex.connect(trader1).createLimitOrder(BAT, 2000, 12, SIDE.BUY);
  await dex.connect(trader2).createMarketOrder(BAT, 2000, SIDE.SELL);

  await dex.connect(trader1).createLimitOrder(XRP, 1000, 2, SIDE.BUY);
  await dex.connect(trader2).createMarketOrder(XRP, 1000, SIDE.SELL);
  await increaseTime(1);
  await dex.connect(trader1).createLimitOrder(XRP, 500, 4, SIDE.BUY);
  await dex.connect(trader2).createMarketOrder(XRP, 500, SIDE.SELL);
  await increaseTime(1);
  await dex.connect(trader1).createLimitOrder(XRP, 800, 2, SIDE.BUY);
  await dex.connect(trader2).createMarketOrder(XRP, 800, SIDE.SELL);
  await increaseTime(1);
  await dex.connect(trader1).createLimitOrder(XRP, 1200, 6, SIDE.BUY);
  await dex.connect(trader2).createMarketOrder(XRP, 1200, SIDE.SELL);
  console.log(dex.address);

  console.log("Trade Added");

  //create orders
  await Promise.all([
    dex.connect(trader1).createLimitOrder(BAT, 1400, 10, SIDE.BUY),
    dex.connect(trader2).createLimitOrder(BAT, 1200, 11, SIDE.BUY),
    dex.connect(trader2).createLimitOrder(BAT, 1000, 12, SIDE.BUY),
    dex.connect(trader1).createLimitOrder(XRP, 3000, 4, SIDE.BUY),
    dex.connect(trader1).createLimitOrder(XRP, 2000, 5, SIDE.BUY),
    dex.connect(trader2).createLimitOrder(XRP, 500, 6, SIDE.BUY),
    dex.connect(trader1).createLimitOrder(SHIB, 4000, 12, SIDE.BUY),
    dex.connect(trader1).createLimitOrder(SHIB, 3000, 13, SIDE.BUY),
    dex.connect(trader2).createLimitOrder(SHIB, 500, 14, SIDE.BUY),
    dex.connect(trader3).createLimitOrder(BAT, 2000, 16, SIDE.SELL),
    dex.connect(trader4).createLimitOrder(BAT, 3000, 15, SIDE.SELL),
    dex.connect(trader4).createLimitOrder(BAT, 500, 14, SIDE.SELL),
    dex.connect(trader3).createLimitOrder(XRP, 4000, 10, SIDE.SELL),
    dex.connect(trader3).createLimitOrder(XRP, 2000, 9, SIDE.SELL),
    dex.connect(trader4).createLimitOrder(XRP, 800, 8, SIDE.SELL),
    dex.connect(trader3).createLimitOrder(SHIB, 1500, 23, SIDE.SELL),
    dex.connect(trader3).createLimitOrder(SHIB, 1200, 22, SIDE.SELL),
    dex.connect(trader4).createLimitOrder(SHIB, 900, 21, SIDE.SELL),
  ]);

  console.log("Order Added");
  // console.log(await dex.getTokens());

  const orders = await dex.connect(trader1).getOrders(BAT, SIDE.BUY);
  const sellOrders = await dex.connect(trader1).getOrders(BAT, SIDE.SELL);
  // console.log(orders, sellOrders);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
