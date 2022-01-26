import React, { useState, useEffect } from "react";
import { Card, Grid, Typography } from "@mui/material";
import axios from "axios";
import { url } from "../../config";

const CardStyle = (props) => {
  const [barangCount, setBarangCount] = useState(0);
  const [petugasCount, setPetugasCount] = useState(0);
  const [lelangCount, setLelangCount] = useState(0);
  const headerConfig = () => {
    let header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    return header;
  };
  const getBarang = async () => {
    try {
      const response = await axios.get(`${url}/barang`, headerConfig());
      if (!response) {
        console.log("error");
      }
      setBarangCount(response.data.data.length);
    } catch (err) {
      console.log(err);
    }
  };
  const getPetugas = async () => {
    try {
      const response = await axios.get(`${url}/petugas`, headerConfig());
      if (!response) {
        console.log("error");
      }
      setPetugasCount(response.data.data.length);
    } catch (err) {
      console.log(err);
    }
  };
  const getLelang = async () => {
    try {
      const response = await axios.get(`${url}/lelang`, headerConfig());
      if (!response) {
        console.log("error");
      }
      setLelangCount(response.data.data.length);
    } catch (err) {
      console.log(err);
    }
  };
  const [spacing, setSpacing] = React.useState(4);
  useEffect(() => {
    getBarang();
    getPetugas();
    getLelang();
  }, [props.reload]);
  return (
    <Grid sx={{ flexGrow: 1 }} container>
      <Grid item xs={12}>
        <Grid
          container
          justifyContent="left"
          sx={{ marginLeft: "1px" }}
          spacing={spacing}
        >
          <Grid item>
            <div
              style={{
                minHeight: 125,
                minWidth: 225,
                maxWidth: "100%",
                borderRadius: "10px",
                backgroundColor: "#E6FFE8",
                padding: "32px 32px 32px 32px",
              }}
            >
              <Typography
                sx={{
                  color: "#000000",
                  fontFamily: "poppins",
                  fontSize: "20px",
                  fontWeight: "600",
                  marginBottom: 1,
                }}
              >
                Barang
              </Typography>
              <Typography
                sx={{
                  color: "#000000",
                  fontSize: "40px",
                  fontWeight: 600,
                  fontFamily: "poppins",
                  marginBottom: 1,
                }}
              >
                {barangCount}
              </Typography>
              <Typography
                sx={{
                  color: "#000000",
                  fontSize: "16px",
                  fontWeight: 400,
                  fontFamily: "poppins",
                  width: "220px",
                }}
              >
                Banyak data barang yang telah ditambahkan
              </Typography>
            </div>
          </Grid>
          <Grid item>
            <div
              style={{
                minHeight: 125,
                minWidth: 225,
                maxWidth: "100%",
                borderRadius: "10px",
                backgroundColor: "#FFEAEF",
                padding: "32px 32px 32px 32px",
              }}
            >
              <Typography
                sx={{
                  color: "#000000",
                  fontFamily: "poppins",
                  fontSize: "20px",
                  fontWeight: "600",
                  marginBottom: 1,
                }}
              >
                Petugas
              </Typography>
              <Typography
                sx={{
                  color: "#000000",
                  fontSize: "40px",
                  fontWeight: 600,
                  fontFamily: "poppins",
                  marginBottom: 1,
                }}
              >
                {petugasCount}
              </Typography>
              <Typography
                sx={{
                  color: "#000000",
                  fontSize: "16px",
                  fontWeight: 400,
                  fontFamily: "poppins",
                  width: "225px",
                }}
              >
                Banyak data petugas yang telah ditambahkan
              </Typography>
            </div>
          </Grid>
          <Grid item>
            <div
              style={{
                minHeight: 125,
                minWidth: 225,
                maxWidth: "100%",
                borderRadius: "10px",
                backgroundColor: "#EAEFFF",
                padding: "32px 32px 32px 32px",
              }}
            >
              <Typography
                sx={{
                  color: "#000000",
                  fontFamily: "poppins",
                  fontSize: "20px",
                  fontWeight: "600",
                  marginBottom: 1,
                }}
              >
                Lelang
              </Typography>
              <Typography
                sx={{
                  color: "#000000",
                  fontSize: "28px",
                  fontWeight: 600,
                  fontFamily: "poppins",
                  ml: 1,
                }}
              ></Typography>
              <Typography
                sx={{
                  color: "#000000",
                  fontSize: "40px",
                  fontWeight: 600,
                  fontFamily: "poppins",
                  marginBottom: 1,
                }}
              >
                {lelangCount}
              </Typography>
              <Typography
                sx={{
                  color: "#000000",
                  fontSize: "16px",
                  fontWeight: 400,
                  fontFamily: "poppins",
                  width: "220px",
                }}
              >
                Banyak data lelang yang telah ditambahkan
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CardStyle;
