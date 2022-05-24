import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Button } from "@mui/material";

const Direction = {
  WITHDRAW: "WITHDRAW",
  DEPOSIT: "DEPOSIT",
};

const options = [
  { label: "WITHDRAW", value: "WITHDRAW" },
  { label: "DEPOSIT", value: "DEPOSIT" },
];

export const Wallet = ({
  selectedToken,
  walletBalance,
  contractBalance,
  deposit,
  withdraw,
}) => {
  const [direction, setDirection] = useState(Direction.DEPOSIT);
  const [amount, setAmount] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(amount, direction);
    if (direction === Direction.DEPOSIT) {
      deposit(amount);
    } else {
      withdraw(amount);
    }
  };
  console.log(walletBalance, contractBalance);
  return (
    <div
      style={{
        background: "#3d96ee",
        fontFamily: "Roboto",
        fontWeight: "bold",
        color: "white",
      }}
    >
      <br />
      <Typography sx={{ fontWeight: "bold" }} variant="h5" noWrap>
        Wallet
      </Typography>
      <div>
        <Typography variant="h6" noWrap>
          Token Balance for: {selectedToken}
        </Typography>
        <div>
          <div>Wallet: {walletBalance}</div>
          <div>Dex: {contractBalance}</div>
        </div>

        <Typography variant="h6" noWrap>
          Transfer: {selectedToken}
        </Typography>
      </div>
      <br />
      <Divider />
      <div>
        <div>
          <FormControl>
            <Typography sx={{ fontWeight: "bold" }} variant="h5" noWrap>
              Direction
            </Typography>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
            >
              <FormControlLabel
                value="DEPOSIT"
                control={<Radio />}
                label="DEPOSIT"
              />
              <FormControlLabel
                value="WITHDRAW"
                control={<Radio />}
                label="WITHDRAW"
              />
            </RadioGroup>
            <br />
            <Divider />
            <br />
            <Typography sx={{ fontWeight: "bold" }} variant="h5" noWrap>
              Amount
            </Typography>
            <OutlinedInput
              id="outlined-adornment-weight"
              onChange={(e) => setAmount(e.target.value)}
              endAdornment={
                <InputAdornment position="end">{selectedToken}</InputAdornment>
              }
              size="small"
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                "aria-label": "Amount",
              }}
              sx={{ color: "black" }}
              value={amount}
            />
          </FormControl>
        </div>
      </div>
      <br />
      <Button variant="contained" onClick={handleSubmit}>
        SUBMIT
      </Button>
      <br />
      <br />
    </div>
  );
};
