import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../config";
import { Chip } from "@mui/material";

const ChipStatus = (props) => {
  const { data } = props;
  const [status, setStatus] = useState(false);
  const headerConfig = () => {
    let header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    return header;
  };
  const getStatus = async () => {
    try {
      const response = await axios.get(
        `${url}/lelang/barang/${data.id}`,
        headerConfig()
      );

      if (response.data.data) {
        setStatus(true);
      } else {
        setStatus(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getStatus();
  }, []);
  return (
    <div>
      {!status ? (
        <Chip
          label="Tidak Dilelang"
          sx={{ backgroundColor: "#FFEAEF", borderRadius: "8px", width: "125px", color: "#FF5C86", fontFamily: 'poppins', fontWeight: 500 }}
        />
      ) : (
        <Chip
          label="Dilelang"
          sx={{ backgroundColor: "#FBFFFB", borderRadius: "8px", width: "125px", color:"#03AC0E", fontFamily: 'poppins', fontWeight: 500 }}
        />
      )}
    </div>
  );
};

export default ChipStatus;
