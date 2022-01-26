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
import LogoutIcon from "@mui/icons-material/Logout";
import { styled } from "@mui/styles";
import logo from "../assets/logo.svg";

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
const DivStyleActive = styled("div")(({ theme }) => ({
  width: "322px",
  height: "49px",
  display: "flex",
  backgroundColor: "#FBFFFB",
  borderRadius: "10px",
  alignItems: "center",
  marginBottom: "16px",
  paddingLeft: "20px",
  cursor: "pointer",
  fontSize: "18px",
}));

class drawer extends React.Component {
  handleSideBar = (item) => {
    const currentPath = this.props.history.location.pathname;
    const pageDestination = item;

    if (pageDestination !== currentPath) {
      return this.props.history.push(pageDestination);
    }
  };
  handleLogout = () => {
    localStorage.removeItem("userLogin");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    return this.props.history.push("/");
  };
  render() {
    const currentPath = this.props.history.location.pathname;
    return (
      <Drawer
        sx={{
          width: "250px",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "250px",
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {/* <h1
          style={{
            color: "#125C13",
            fontFamily: "poppins",
            justifyContent: "center",
            display: "flex",
          }}
        >
          LELANG
        </h1> */}
        <img
          src={logo}
          style={{
            width: "150px",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px 20px",
            marginLeft: "24px",
            marginTop: "24px"
          }}
        />
        <List>
          {currentPath === "/dashboard" ? (
            <ListItem
              key="Dashboard"
              onClick={() => this.handleSideBar("/dashboard")}
              sx={{ backgroundColor: "#ffffff" }}
            >
              <DivStyleActive>
                <ListItemIcon>
                  <HomeIcon sx={{ color: "#03AC0E" }} />
                </ListItemIcon>
                <ListItemText>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#03AC0E",
                      fontFamily: "poppins",
                    }}
                  >
                    Dashboard
                  </Typography>
                </ListItemText>
              </DivStyleActive>
            </ListItem>
          ) : (
            <ListItem
              key="Dashboard"
              onClick={() => this.handleSideBar("/dashboard")}
              sx={{ backgroundColor: "#ffffff" }}
            >
              <DivStyle>
                <ListItemIcon>
                  <HomeIcon sx={{ color: "#000000" }} />
                </ListItemIcon>
                <ListItemText>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#000000",
                      fontFamily: "poppins",
                    }}
                  >
                    Dashboard
                  </Typography>
                </ListItemText>
              </DivStyle>
            </ListItem>
          )}
          {currentPath === "/barang" ? (
            <ListItem
              key="Barang"
              onClick={() => this.handleSideBar("/barang")}
              sx={{ backgroundColor: "#ffffff" }}
            >
              <DivStyleActive>
                <ListItemIcon>
                  <Inventory2Icon sx={{ color: "#03AC0E" }} />
                </ListItemIcon>
                <ListItemText>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#03AC0E",
                      fontFamily: "poppins",
                    }}
                  >
                    Barang
                  </Typography>
                </ListItemText>
              </DivStyleActive>
            </ListItem>
          ) : (
            <ListItem
              key="Barang"
              onClick={() => this.handleSideBar("/barang")}
              sx={{ backgroundColor: "#ffffff" }}
            >
              <DivStyle>
                <ListItemIcon>
                  <Inventory2Icon sx={{ color: "#000000" }} />
                </ListItemIcon>
                <ListItemText>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#000000",
                      fontFamily: "poppins",
                    }}
                  >
                    Barang
                  </Typography>
                </ListItemText>
              </DivStyle>
            </ListItem>
          )}
          {currentPath === "/lelang" ? (
            <ListItem
              key="Lelang"
              onClick={() => this.handleSideBar("/lelang")}
              sx={{ backgroundColor: "#ffffff" }}
            >
              <DivStyleActive>
                <ListItemIcon>
                  <SellIcon sx={{ color: "#03AC0E" }} />
                </ListItemIcon>
                <ListItemText>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#03AC0E",
                      fontFamily: "poppins",
                    }}
                  >
                    Lelang
                  </Typography>
                </ListItemText>
              </DivStyleActive>
            </ListItem>
          ) : (
            <ListItem
              key="Lelang"
              onClick={() => this.handleSideBar("/lelang")}
              sx={{ backgroundColor: "#ffffff" }}
            >
              <DivStyle>
                <ListItemIcon>
                  <SellIcon sx={{ color: "#000000" }} />
                </ListItemIcon>
                <ListItemText>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#000000",
                      fontFamily: "poppins",
                    }}
                  >
                    Lelang
                  </Typography>
                </ListItemText>
              </DivStyle>
            </ListItem>
          )}
          {currentPath === "/petugas" ? (
            <ListItem
              key="Petugas"
              onClick={() => this.handleSideBar("/petugas")}
              sx={{ backgroundColor: "#ffffff" }}
            >
              <DivStyleActive>
                <ListItemIcon>
                  <SupervisorAccountIcon sx={{ color: "#03AC0E" }} />
                </ListItemIcon>
                <ListItemText>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#03AC0E",
                      fontFamily: "poppins",
                    }}
                  >
                    Petugas
                  </Typography>
                </ListItemText>
              </DivStyleActive>
            </ListItem>
          ) : (
            <ListItem
              key="Petugas"
              onClick={() => this.handleSideBar("/petugas")}
              sx={{ backgroundColor: "#ffffff" }}
            >
              <DivStyle>
                <ListItemIcon>
                  <SupervisorAccountIcon sx={{ color: "#000000" }} />
                </ListItemIcon>
                <ListItemText>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#000000",
                      fontFamily: "poppins",
                    }}
                  >
                    Petugas
                  </Typography>
                </ListItemText>
              </DivStyle>
            </ListItem>
          )}

          <ListItem
            key="Logout"
            onClick={() => this.handleLogout()}
            sx={{ backgroundColor: "#ffffff", mt:25 }}
          >
            <DivStyle style={{marginBottom:0}}>
              <ListItemIcon>
                <LogoutIcon sx={{ color: "#000000" }} />
              </ListItemIcon>
              <ListItemText>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#000000",
                    fontFamily: "poppins",
                  }}
                >
                  Logout
                </Typography>
              </ListItemText>
            </DivStyle>
          </ListItem>
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
