import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Link,
  Button,
  Paper,
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CardMedia,
} from "@mui/material";
import logo from "../../assets/logo.svg";
import { useHistory } from "react-router";
import axios from "axios";
import { url } from "../../config";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { convertToRupiah } from "../../helper/convertRupiah";
import { toIsoString } from "../../helper/date";
import { splitter } from "../../helper/splitter";
import ChipStatus from "./component/chip";

const History = () => {
  let role = localStorage.getItem("role");
  const [anchorEl, setAnchorEl] = React.useState(null);
  let history = useHistory();
  const open = Boolean(anchorEl);
  const [alert, setAlert] = useState(false);
  const [itemSelected, setItemSelected] = useState("");
  const [openTawar, setOpenTawar] = useState(false);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("")

  const closeTawar = () => {
    setOpenTawar(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.removeItem("userLogin");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    setAnchorEl(null);
    return history.push("/");
  };
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleNav = (item) => {
    return history.push(`/${item}`)
  }
  const headerConfig = () => {
    let header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    return header;
  };
  const getData = async () => {
    let id = JSON.parse(localStorage.getItem("userLogin")).id;
    try {
      const response = await axios.get(
        `${url}/historyLelang/${id}`,
        headerConfig()
      );
      if (!response) {
        console.log("error");
      }
      setData(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div
        style={{
          width: "100%",
          backgroundColor: "#ffffff",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ padding: "32px", marginLeft: "112px" }}>
          <img src={logo} style={{ width: "150px" }} alt="logo.svg"></img>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", paddingTop: "40px" }}>
            <Typography
              sx={{
                mr: 4,
                fontFamily: "poppins",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              <Link underline="none" onClick={() => handleNav("")} sx={{ color: "#000000" }}>
                Home
              </Link>
            </Typography>
            <Typography
              sx={{
                mr: 4,
                fontFamily: "poppins",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              <Link underline="none" href="#" sx={{ color: "#000000" }}>
                Services
              </Link>
            </Typography>
            <Typography
              sx={{
                mr: 4,
                fontFamily: "poppins",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              <Link underline="none" href="#" sx={{ color: "#000000" }}>
                Products
              </Link>
            </Typography>
            {role === "masyarakat" ? (
              <Typography
                sx={{
                  mr: 4,
                  fontFamily: "poppins",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                <Link underline="none" onClick={() => handleNav("myhistory")} sx={{ color: "#000000" }}>
                  History
                </Link>
              </Typography>
            ) : null}
          </div>
          <div>
            {role === "masyarakat" ? (
              <div>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  sx={{
                    backgroundColor: "",
                    boxShadow: "none",
                    mr: 18,
                    mt: 4,
                    width: "100px",
                    fontFamily: "poppins",
                    color: "#03AC0E",
                    borderRadius: "8px",
                    textTransform: "capitalize",
                    border: "1px solid #03AC0E",
                  }}
                >
                  {JSON.parse(localStorage.getItem("userLogin")).nama}
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            ) : (
              <Button
                variant="contained"
                type="submit"
                href="/login"
                sx={{
                  backgroundColor: "#03AC0E",
                  boxShadow: "none",
                  mr: 18,
                  mt: 4,
                  width: "100px",
                  fontFamily: "poppins",
                  borderRadius: "8px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#03AC0E",
                  },
                }}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
      <div style={{ padding: "24px 172px", maxWidth: "800px", marginLeft: "200px" }}>
        <Typography
          align="center"
          sx={{ fontFamily: "poppins", fontSize: "28px", fontWeight: 500 }}
        >
          Historyku
        </Typography>
        {data.map((row, index) => (
          <Accordion expanded={expanded === `panel + ${index}`} onChange={handleChange(`panel + ${index}`)}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{fontFamily: 'poppins', fontSize: "18px", fontWeight: 500, padding: "8px"}}>{row.lelang.barang.nama}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{display: 'flex'}}>
              <CardMedia
                  component="img"
                  height="300"
                  sx={{ width: 300 }}
                  image={url + "/barang_image/" + row.lelang.barang.image}
                  alt="image"
                />
                <div>
                  <Typography sx={{fontFamily: 'poppins', fontSize: "16px", fontWeight: 500, padding: "16px"}}>Tawaran Harga</Typography>
                  <Typography sx={{fontFamily: 'poppins', fontSize: "16px", fontWeight: 400, ml: 2}}>{convertToRupiah(row.penawaranHarga)}</Typography>
                  <Typography sx={{fontFamily: 'poppins', fontSize: "16px", fontWeight: 500, padding: "16px"}}>Tanggal</Typography>
                  <Typography sx={{fontFamily: 'poppins', fontSize: "16px", fontWeight: 400, ml: 2}}>{splitter(toIsoString(new Date(row.createdAt)))}</Typography>
                  <Typography sx={{fontFamily: 'poppins', fontSize: "16px", fontWeight: 500, padding: "16px"}}>Status</Typography>
                  <ChipStatus data={row} />
                </div>
              </div>
              <Typography>
                
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default History;
