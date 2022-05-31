import React from "react";
import Moment from "react-moment";
import TableContainer from "@mui/material/TableContainer";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  Typography,
  TableBody,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

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

export const AllTrades = ({ trades }) => {
  console.log(trades, "TRADE");
  const renderList = (trades) => {
    return (
      <TableContainer component={Paper} sx={{ margin: "auto", width: "60%" }}>
        <Typography
          variant="h4"
          noWrap
          sx={{ background: "gray", fontWeight: "bold" }}
        >
          All Trades
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
            {trades.map((row) => (
              <StyledTableRow key={row.tradeId.toNumber()}>
                <StyledTableCell align="center">
                  {row.amount.toNumber()}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.price.toNumber()}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Moment fromNow>{parseInt(row.date) * 1000}</Moment>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  return (
    <div>
      <h2>All Trades</h2>
      <div>{renderList(trades)}</div>
    </div>
  );
};
