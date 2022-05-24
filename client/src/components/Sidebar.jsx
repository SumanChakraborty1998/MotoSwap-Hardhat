import React from "react";
import { Wallet } from "./Wallet";
import { NewOrder } from "./NewOrder";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const drawerWidth = 400;

export const Sidebar = ({
  tokens,
  setSelectedToken,
  selectedToken,
  deposit,
  balance,
  withdraw,
  createLimitOrder,
  createMarketOrder,
}) => {
  console.log(balance);

  return (
    <div>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          background: "#1976D2",
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
            background: "#1976D2",
          }}
          open
        >
          <div
            style={{
              background: "#1976D2",
              fontFamily: "Roboto",
              fontWeight: "bold",
            }}
          >
            <Toolbar
              sx={{
                background: "#1976D2",
                position: "fixed",
                zIndex: "40",
                width: "325px",
                // border: "1px solid red",
              }}
              fullWidth
            >
              <Typography
                variant="h5"
                noWrap
                component="div"
                sx={{ margin: "auto", fontWeight: "bold", color: "white" }}
              >
                Start Trading
              </Typography>
            </Toolbar>
            <Divider />
            <List sx={{ marginTop: "45px" }}>
              {tokens.map((text, index) => (
                <>
                  <ListItem key={index} value={text} disablePadding>
                    <ListItemButton
                      sx={{
                        background: "#1976D2",
                        color: "white",
                        margin: "auto",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                      onClick={() => {
                        setSelectedToken(text);
                      }}
                    >
                      <ListItemText
                        primary={`${text}/DAI`}
                        sx={{ fontWeight: "bold" }}
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </>
              ))}
            </List>
            {/* <Divider /> */}
          </div>
          <Wallet
            walletBalance={balance.tokenWallet}
            contractBalance={balance.tokenDex}
            selectedToken={selectedToken}
            deposit={deposit}
            withdraw={withdraw}
          />
          {selectedToken !== "DAI" ? (
            <NewOrder
              createLimitOrder={createLimitOrder}
              createMarketOrder={createMarketOrder}
            />
          ) : null}
        </Drawer>
      </Box>
    </div>
  );
};
