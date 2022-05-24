import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Button, TextField } from "@mui/material";

const TYPE = {
  LIMIT: "LIMIT",
  MARKET: "MARKET",
};

const SIDE = {
  BUY: 0,
  SELL: 1,
};

export const NewOrder = ({ createMarketOrder, createLimitOrder }) => {
  // const [order, setOrder] = useState({
  //   type: TYPE.LIMIT,
  //   side: SIDE.BUY,
  //   amount: 0,
  //   price: 0,
  // });

  const [side, setSide] = useState(0);
  const [type, setType] = useState("LIMIT");
  const [amount, setAmount] = useState(null);
  const [price, setPrice] = useState(null);

  const createOrder = () => {
    if (type === TYPE.LIMIT) {
      createLimitOrder(amount, price, side);
    } else {
      createMarketOrder(amount, side);
    }
  };

  return (
    <div
      style={{
        background: "#9dc8f4",
        fontFamily: "Roboto",
        fontWeight: "bold",
        color: "#0e253b",
      }}
    >
      <Divider />
      <Typography sx={{ fontWeight: "bold" }} variant="h5" noWrap>
        Order Type
      </Typography>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <FormControlLabel
          value={TYPE.LIMIT}
          control={<Radio />}
          label="LIMIT ORDER"
        />
        <FormControlLabel
          value={TYPE.MARKET}
          control={<Radio />}
          label="MARKET ORDER"
        />
      </RadioGroup>
      <Typography sx={{ fontWeight: "bold" }} variant="h5" noWrap>
        Side
      </Typography>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={side}
        onChange={(e) => setSide(Number(e.target.value))}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <FormControlLabel value={SIDE.BUY} control={<Radio />} label="BUY" />
        <FormControlLabel value={SIDE.SELL} control={<Radio />} label="SELL" />
      </RadioGroup>
      <Typography sx={{ fontWeight: "bold" }} variant="h5" noWrap>
        Amount
      </Typography>
      <TextField
        onChange={(e) => setAmount(e.target.value)}
        size="small"
        sx={{ color: "black" }}
        value={amount}
      />
      {type !== "LIMIT" && <br />}
      {type === "LIMIT" ? (
        <>
          <Typography sx={{ fontWeight: "bold" }} variant="h5" noWrap>
            Price
          </Typography>
          <TextField
            onChange={(e) => setPrice(e.target.value)}
            size="small"
            sx={{ color: "black" }}
            value={price}
          />
        </>
      ) : null}
      <br />
      <br />
      <Button variant="contained" onClick={createOrder}>
        Create Order
      </Button>
      <br />
      <br />
    </div>
  );
};
