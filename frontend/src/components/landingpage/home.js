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
  CardMedia,
} from "@mui/material";
import logo from "../../assets/logo.svg";
import logo2 from "../../assets/logo2.svg";
import illustration from "../../assets/Discount-cuate.svg";
import ExtensionIcon from "@mui/icons-material/Extension";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import { useHistory } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "./style.css";
import axios from "axios";
import { url } from "../../config";
import { convertToRupiah } from "../../helper/convertRupiah";
import { msToTime } from "../../helper/convertMilliseconds";
import { DialogAdd, DialogEdit } from "./component/dialog";

const Home = () => {
  let role = localStorage.getItem("role");
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [data, setData] = useState([]);
  const [reloadAll, setReloadAll] = useState(false);
  const [alert, setAlert] = useState(false);
  const [snack, setSnack] = useState({
    buka: false,
    vertical: "top",
    horizpntal: "center",
  });
  const { vertical, horizontal, buka } = snack;
  const [itemSelected, setItemSelected] = useState("");
  const [openTawar, setOpenTawar] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleNav = (item) => {
    return history.push(`/${item}`);
  };

  const handleTawar = (newState, data) => () => {
    setSnack({ buka: true, ...newState });
    if (!localStorage.getItem("userLogin")) {
      setAlert(true);
    } else {
      setItemSelected(data);
      setOpenTawar(true);
    }
  };
  const closeTawar = () => {
    setOpenTawar(false);
  };

  const handleCloseSnack = () => {
    setSnack({ ...snack, buka: false });
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEdit = () => {
    setOpenEdit(true);
  };
  const closeEdit = () => {
    setOpenEdit(false);
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.removeItem("userLogin");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    setAnchorEl(null);
    return history.push("/");
  };
  const handleReload = () => {
    setReloadAll(true);
    setTimeout(() => {
      setReloadAll(false);
    }, 500);
  };
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
    try {
      const response = await axios.get(`${url}/lelang`, headerConfig());
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
  }, [reloadAll]);
  return (
    <div>
      {alert === true ? (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={buka}
          onClose={handleCloseSnack}
          message="Harap login terlebih dahulu"
          key={vertical + horizontal}
          autoHideDuration={10000}
        />
      ) : null}
      <DialogAdd
        open={openTawar}
        closeDialog={() => closeTawar()}
        data={itemSelected}
        reload={() => getData()}
      />
      <DialogEdit
        open={openEdit}
        closeDialog={() => closeEdit()}
        reload={() => getData()}
      />
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
              <Link
                underline="none"
                onClick={() => handleNav("")}
                sx={{ color: "#000000" }}
              >
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
                <Link
                  underline="none"
                  onClick={() => handleNav("myhistory")}
                  sx={{ color: "#000000" }}
                >
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
                    minWidth: "100px",
                    fontFamily: "poppins",
                    color: "#03AC0E",
                    borderRadius: "8px",
                    textTransform: "capitalize",
                    border: "1px solid #03AC0E",
                    padding: 1
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
                  <MenuItem onClick={handleEdit}>Edit Profile</MenuItem>
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
      <div
        className="content"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="left">
          <div style={{ display: "flex" }}>
            <Typography
              sx={{
                fontFamily: "poppins",
                fontWeight: 600,
                fontSize: "56px",
                mt: 11,
                ml: 18,
                width: "400px",
              }}
            >
              Make Your
              <div style={{ display: "flex" }}>
                <Typography
                  sx={{
                    fontFamily: "poppins",
                    fontWeight: 600,
                    fontSize: "56px",
                    mr: 2,
                  }}
                >
                  Best
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "poppins",
                    fontWeight: 600,
                    fontSize: "56px",
                    color: "#03AC0E",
                  }}
                >
                  Bid
                </Typography>
              </div>
            </Typography>
          </div>
          <Typography
            sx={{
              fontFamily: "poppins",
              ml: "144px",
              fontSize: "24px",
              width: "450px",
              fontWeight: 400,
            }}
          >
            Find your favorite item and get the best price
          </Typography>
          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: "#03AC0E",
              boxShadow: "none",
              ml: 18,
              mt: 2,
              padding: "8px 24px 8px 24px",
              fontFamily: "poppins",
              borderRadius: "8px",
              fontSize: "18px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#03AC0E",
              },
            }}
          >
            Get Started
          </Button>
        </div>
        <div className="right">
          <img
            src={illustration}
            style={{ width: "500px", margin: "32px 120px" }}
            alt="illustration.svg"
          ></img>
        </div>
      </div>
      <div
        className="services"
        style={{ marginTop: "24px", marginBottom: "64px" }}
      >
        <Typography
          align="center"
          sx={{
            fontFamily: "poppins",
            fontSize: "32px",
            fontWeight: 600,
            padding: 2,
            mb: 4,
          }}
        >
          Services
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            "& > :not(style)": {
              m: 1,
              width: 300,
              height: 300,
              ml: 3,
              borderRadius: "10px",
            },
          }}
        >
          <Paper variant="outlined">
            <IconButton
              disabled
              sx={{ padding: 3, borderRadius: "10px", margin: "24px 24px" }}
              style={{ backgroundColor: "#F2FFF2" }}
            >
              <ExtensionIcon
                sx={{
                  color: "#03AC0E",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "32px",
                }}
              />
            </IconButton>
            <Typography
              sx={{
                fontFamily: "poppins",
                fontSize: "24px",
                fontWeight: 500,
                ml: 3,
              }}
            >
              Best Item
            </Typography>
            <Typography
              sx={{
                fontFamily: "poppins",
                fontSize: "16px",
                fontWeight: 400,
                ml: 3,
                mt: 1,
              }}
            >
              Dapatkan item terbaik dari semua brand terkenal
            </Typography>
          </Paper>
          <Paper variant="outlined">
            <IconButton
              disabled
              sx={{ padding: 3, borderRadius: "10px", margin: "24px 24px" }}
              style={{ backgroundColor: "#F2FFF2" }}
            >
              <LocalOfferRoundedIcon
                sx={{
                  color: "#03AC0E",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "32px",
                }}
              />
            </IconButton>
            <Typography
              sx={{
                fontFamily: "poppins",
                fontSize: "24px",
                fontWeight: 500,
                ml: 3,
              }}
            >
              Best Price
            </Typography>
            <Typography
              sx={{
                fontFamily: "poppins",
                fontSize: "16px",
                fontWeight: 400,
                ml: 3,
                mt: 1,
              }}
            >
              Barang terbaik dengan harga lelang terbaik
            </Typography>
          </Paper>
          <Paper variant="outlined">
            <IconButton
              disabled
              sx={{ padding: 3, borderRadius: "10px", margin: "24px 24px" }}
              style={{ backgroundColor: "#F2FFF2" }}
            >
              <DoneAllRoundedIcon
                sx={{
                  color: "#03AC0E",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "32px",
                }}
              />
            </IconButton>
            <Typography
              sx={{
                fontFamily: "poppins",
                fontSize: "24px",
                fontWeight: 500,
                ml: 3,
              }}
            >
              Easy Transaction
            </Typography>
            <Typography
              sx={{
                fontFamily: "poppins",
                fontSize: "16px",
                fontWeight: 400,
                ml: 3,
                mt: 1,
              }}
            >
              Lakukan transaksi dengan mudah hanya dengan lihat lalu tawar
            </Typography>
          </Paper>
          <Paper variant="outlined">
            <IconButton
              disabled
              sx={{ padding: 3, borderRadius: "10px", margin: "24px 24px" }}
              style={{ backgroundColor: "#F2FFF2" }}
            >
              <ThumbUpAltRoundedIcon
                sx={{
                  color: "#03AC0E",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "32px",
                }}
              />
            </IconButton>
            <Typography
              sx={{
                fontFamily: "poppins",
                fontSize: "24px",
                fontWeight: 500,
                ml: 3,
              }}
            >
              Good Deals
            </Typography>
            <Typography
              sx={{
                fontFamily: "poppins",
                fontSize: "16px",
                fontWeight: 400,
                ml: 3,
                mt: 1,
              }}
            >
              Dapatkan semuanya dengan mudah dan murah
            </Typography>
          </Paper>
        </Box>
      </div>
      <div className="products" style={{ padding: "88px" }}>
        <Typography
          align="center"
          sx={{
            fontFamily: "poppins",
            fontSize: "32px",
            fontWeight: 600,
            padding: 2,
            mb: 4,
          }}
        >
          Products
        </Typography>
        <div>
          <Swiper
            slidesPerView={3}
            spaceBetween={72}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {data
              .filter((item) => {
                return item.status === "Dibuka";
              })
              .map((item) => (
                <SwiperSlide>
                  <CardMedia component="img" height="355" sx={{ width: 360 }} image={url + "/barang_image/" + item.barang.image} />
                  <div>
                    <Typography
                      sx={{
                        fontFamily: "poppins",
                        fontSize: "20px",
                        fontWeight: 500,
                        pl: 2,
                        pb: 1,
                        pt: 1,
                      }}
                      noWrap
                    >
                      {item.barang.nama}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "poppins",
                        fontSize: "16px",
                        fontWeight: 400,
                        pl: 2,
                      }}
                    >
                      Start from
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "poppins",
                        fontSize: "22px",
                        fontWeight: 500,
                        pl: 2,
                      }}
                    >
                      {convertToRupiah(item.hargaAkhir)}
                    </Typography>
                    <div>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#FFEAEF",
                          color: "#FF5C86",
                          boxShadow: "none",
                          fontFamily: "poppins",
                          borderRadius: "8px",
                          width: "150px",
                          textTransform: "none",
                          margin: "8px",
                          marginLeft: "16px",
                          "&:hover": {
                            backgroundColor: "#FFEAEF",
                            color: "#FF5C86",
                            boxShadow: "none",
                          },
                        }}
                      >
                        {msToTime(
                          new Date(item.endTime).getTime() -
                            new Date().getTime()
                        )}
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#F2FFF2",
                          color: "#03AC0F",
                          boxShadow: "none",
                          fontFamily: "poppins",
                          borderRadius: "8px",
                          width: "150px",
                          margin: "8px",
                          textTransform: "none",
                          "&:hover": {
                            backgroundColor: "#F2FFF2",
                            color: "#03AC0F",
                            boxShadow: "none",
                          },
                        }}
                        onClick={handleTawar(
                          { vertical: "top", horizontal: "center" },
                          item
                        )}
                      >
                        Tawar
                      </Button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
      <div
        className="footer"
        style={{
          marginTop: "24px",
          widht: "100%",
          padding: "56px",
          paddingLeft: "72px",
          backgroundColor: "#000000",
        }}
      >
        <img src={logo2} style={{ width: "200px" }} />
        <table
          style={{
            color: "#ffffff",
            fontFamily: "poppins",
            width: "80%",
            marginTop: "24px",
          }}
        >
          <tr style={{ fontSize: "18px" }}>
            <th align="left">Company</th>
            <th align="left">Join With Us</th>
            <th align="left">Careers</th>
            <th align="left">Get in Touch</th>
            <th align="left">Connect with Us</th>
          </tr>
          <tr style={{ height: "35px" }}>
            <td>About</td>
            <td>Admin partners</td>
            <td>Professional</td>
            <td>Help Center</td>
            <td>Instagram</td>
          </tr>
          <tr style={{ height: "35px" }}>
            <td>Product</td>
            <td>Product partners</td>
            <td>Student</td>
            <td>Contact Us</td>
            <td>Twitter</td>
          </tr>
          <tr style={{ height: "35px" }}>
            <td>Blog</td>
            <td></td>
            <td></td>
            <td></td>
            <td>Facebook</td>
          </tr>
        </table>
      </div>
    </div>
  );
};
export default Home;
