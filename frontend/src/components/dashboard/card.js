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
    return header
  };
  const getBarang = async() => {
    try{
      const response = await axios.get(`${url}/barang`, headerConfig())
      if(!response){
        console.log("error");
      }
      setBarangCount(response.data.data.length)
    }catch(err){
      console.log(err);
    }
  }
  const getPetugas = async() => {
    try{
      const response = await axios.get(`${url}/petugas`, headerConfig())
      if(!response){
        console.log("error");
      }
      setPetugasCount(response.data.data.length)
    }catch(err){
      console.log(err);
    }
  }
  const getLelang = async() => {
    try{
      const response = await axios.get(`${url}/lelang`, headerConfig())
      if(!response){
        console.log("error");
      }
      setLelangCount(response.data.data.length)
    }catch(err){
      console.log(err);
    }
  }
  const [spacing, setSpacing] = React.useState(4);
  useEffect(() => {
    getBarang()
    getPetugas()
    getLelang()
  }, [props.reload])
  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={4}>
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
                height: 125,
                width: 325,
                maxWidth: "100%",
                borderRadius: "10px",
                backgroundColor: "#3E7C17",
                padding: "16px",
              }}
            >
              <Typography
                sx={{
                  color: "#ffffff",
                  fontFamily: "poppins",
                  fontSize: "20px",
                  fontWeight: "600",
                  margin: "10px 0px 10px 10px",
                }}
              >
                Jumlah Barang
              </Typography>
              <Typography
                sx={{
                  color: "#ffffff",
                  fontSize: "28px",
                  fontWeight: 600,
                  fontFamily: "poppins",
                  ml: 1,
                }}
              >
                {barangCount}
              </Typography>
            </div>
          </Grid>
          <Grid item>
            <div
              style={{
                height: 125,
                width: 325,
                maxWidth: "100%",
                borderRadius: "10px",
                backgroundColor: "#F4A442",
                padding: "16px",
              }}
            >
              <Typography
                sx={{
                  color: "#ffffff",
                  fontFamily: "poppins",
                  fontSize: "20px",
                  fontWeight: "600",
                  margin: "10px 0px 10px 10px",
                }}
              >
                Jumlah Petugas
              </Typography>
              <Typography
                sx={{
                  color: "#ffffff",
                  fontSize: "28px",
                  fontWeight: 600,
                  fontFamily: "poppins",
                  ml: 1,
                }}
              >
                {petugasCount}
              </Typography>
            </div>
          </Grid>
          <Grid item>
            <div
              style={{
                height: 125,
                width: 325,
                maxWidth: "100%",
                borderRadius: "10px",
                backgroundColor: "#E8E1D9",
                padding: "16px",
              }}
            >
              <Typography
                sx={{
                  color: "#000000",
                  fontFamily: "poppins",
                  fontSize: "20px",
                  fontWeight: "600",
                  margin: "10px 0px 10px 10px",
                }}
              >
                Jumlah Lelang
              </Typography>
              <Typography
                sx={{
                  color: "#000000",
                  fontSize: "28px",
                  fontWeight: 600,
                  fontFamily: "poppins",
                  ml: 1,
                }}
              >
                {lelangCount}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CardStyle;
