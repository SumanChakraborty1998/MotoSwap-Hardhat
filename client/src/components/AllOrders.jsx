import React from "react";
import moment from "react-moment";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Moment from "react-moment";
import Typography from "@mui/material/Typography";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(amount, price, date) {
  return { amount, price, date };
}

export const AllOrders = ({ orders, selectedToken }) => {
  console.log(orders);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "75%",
        // border: "1px solid red",
        margin: "auto",
        marginTop: "100px",
      }}
    >
      <>
        <TableContainer component={Paper}>
          <Typography variant="h4" noWrap sx={{ background: "lime" }}>
            Buy
          </Typography>
          <Table sx={{ minWidth: 500 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Amount</StyledTableCell>
                <StyledTableCell align="center">Price</StyledTableCell>
                <StyledTableCell align="center">Date</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedToken === "DAI" ? (
                <StyledTableRow>
                  <StyledTableCell align="center"></StyledTableCell>
                  <StyledTableCell align="center">
                    No Orders Available
                  </StyledTableCell>
                  <StyledTableCell align="center"></StyledTableCell>
                </StyledTableRow>
              ) : (
                orders.buy.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell align="center">
                      {row.amount.toNumber() - row.filled.toNumber()}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.price.toNumber()}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Moment fromNow>{parseInt(row.date) * 1000}</Moment>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ width: " 50px" }}></div>
        <TableContainer component={Paper}>
          <Typography variant="h4" noWrap sx={{ background: "red" }}>
            Sell
          </Typography>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Amount</StyledTableCell>
                <StyledTableCell align="center">Price</StyledTableCell>
                <StyledTableCell align="center">Date</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedToken === "DAI" ? (
                <StyledTableRow>
                  <StyledTableCell align="center"></StyledTableCell>
                  <StyledTableCell align="center">
                    No Orders Available
                  </StyledTableCell>
                  <StyledTableCell align="center"></StyledTableCell>
                </StyledTableRow>
              ) : (
                orders.sell.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell align="center">
                      {row.amount.toNumber() - row.filled.toNumber()}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.price.toNumber()}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Moment fromNow>{parseInt(row.date) * 1000}</Moment>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    </div>
  );
};
