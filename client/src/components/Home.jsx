import React, { useEffect } from "react";
import { getContracts, getWeb3 } from "./../utils";
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

const drawerWidth = 240;

export const Home = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [selectOption, setSelectOption] = React.useState(0);

  const handleSelectOption = (val) => {
    setSelectOption(val);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar sx={{ background: "#1976D2" }}>
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
      <List>
        {["BAT / DAI", "XRP / DAI", "SHIB / DAI"].map((text, index) => (
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
                  handleSelectOption(index + 1);
                }}
              >
                <ListItemText primary={text} sx={{ fontWeight: "bold" }} />
              </ListItemButton>
            </ListItem>
            <Divider sx={{ height: "10px" }} />
          </>
        ))}
      </List>
      {/* <Divider /> */}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  useEffect(() => {
    const init = async () => {
      const provider = await getWeb3();
      const dex = await getContracts(provider);
      console.log(dex, dex.address);
      console.log(await dex.getTokens());
    };
    init();
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
          {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton> */}
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
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
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
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {selectOption}
      </Box>
    </Box>
  );
};

Home.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
