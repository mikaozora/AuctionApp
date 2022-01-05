import React from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  ListItem,
  ListItemText,
  Divider,
  List,
  Box,
  ListItemIcon,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import SellIcon from "@mui/icons-material/Sell";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import LogoutIcon from '@mui/icons-material/Logout';
import { styled } from "@mui/styles";

const DivStyle = styled("div")(({ theme }) => ({
  width: "322px",
  height: "49px",
  display: "flex",
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  alignItems: "center",
  marginBottom: "16px",
  paddingLeft: "20px",
  cursor: "pointer",
  fontSize: "18px",
  "&:hover": {
    backgroundColor: "#f7f7f7f7",
  },
}));

class drawer extends React.Component {
  handleSideBar = (item) => {
    const currentPath = this.props.history.location.pathname;
    const pageDestination = item;

    if (pageDestination !== currentPath) {
      return this.props.history.push(pageDestination);
    }
  };
  render() {
    const side = [
      {
        icon: <HomeIcon sx={{ color: "#000000" }} />,
        name: "Dashboard",
        url: "/dashboard",
      },
      { icon: <Inventory2Icon />, name: "Barang", url: "/barang" },
      { icon: <SellIcon />, name: "Lelang", url: "/lelang" },
      { icon: <SupervisorAccountIcon />, name: "Petugas", url: "/petugas" },
      { icon: <LogoutIcon />, name: "Logout", url: "/logout" }
    ];
    return (
      <Drawer
        sx={{
          width: "391px",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "391px",
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <h1
          style={{
            color: "#125C13",
            fontFamily: "poppins",
            justifyContent: "center",
            display: "flex",
          }}
        >
          LELANG
        </h1>
        <List>
          {side.map((text, index) => (
            <ListItem
              key={text.name}
              onClick={() => this.handleSideBar(text.url)}
              sx={{ backgroundColor: "#ffffff" }}
            >
              <DivStyle>
                <ListItemIcon>{text.icon}</ListItemIcon>
                <ListItemText>
                  {" "}
                  <Typography
                    sx={{
                      fontSize: "18px",
                      color: "#000000",
                      fontFamily: "poppins",
                    }}
                  >
                    {text.name}
                  </Typography>
                </ListItemText>
              </DivStyle>
            </ListItem>
          ))}
        </List>
      </Drawer>
    );
  }
}

export default drawer;
{
  /* <ListItem onClick={() => this.handleSideBar('/dashboard')} button><ListItemText primary={"Dashboard"}/></ListItem>
                    <ListItem onClick={() => this.handleSideBar('/barang')} button>Barang</ListItem>
                    <ListItem onClick={() => this.handleSideBar('/Lelang')} button>Lelang</ListItem>
                    <ListItem onClick={() => this.handleSideBar('/Petugas')} button>Petugas</ListItem> */
}
