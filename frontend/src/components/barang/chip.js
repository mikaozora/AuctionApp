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
          sx={{ backgroundColor: "#E8E1D9", borderRadius: "10px" }}
        />
      ) : (
        <Chip
          label="Dilelang"
          sx={{ backgroundColor: "#F4A442", borderRadius: "10px", color:"#ffffff" }}
        />
      )}
    </div>
  );
};

export default ChipStatus;
