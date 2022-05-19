import React, { useState } from "react";

const Direction = {
  WITHDRAW: "WITHDRAW",
  DEPOSIT: "DEPOSIT",
};

export const Wallet = () => {
  const [direction, setDirection] = useState(Direction.DEPOSIT);
  const [amount, setAmount] = useState(0);

  return <div>Wallet</div>;
};
