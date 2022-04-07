import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../../config";
import { Chip } from "@mui/material";

const ChipStatus = (props) => {
  const [status, setStatus] = useState("");
  const headerConfig = () => {
    let header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    return header;
  };
  const data = props.data;
  const check = () => {
    if (
      data.lelang.status === "Dibuka" &&
      data.penawaranHarga === data.lelang.hargaAkhir
    ) {
      setStatus("Menunggu");
    } else if (
      data.lelang.status === "Ditutup" &&
      data.penawaranHarga === data.lelang.hargaAkhir
    ) {
      setStatus("Menang");
    } else {
      setStatus("Kalah");
    }
  };

  // const getStatus = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${url}/lelang/masyarakat/${data.idMasyarakat}`,
  //       headerConfig()
  //     );
  //       console.log(response.data.data);
  //     if (response.data.data) {
  //       setStatus(true);
  //     } else {
  //       setStatus(false);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  useEffect(() => {
    check();
    // getStatus()
  });
  return (
    <div>
      {console.log(status)}
      {status === "Menunggu" ? (
        <Chip
          label="Menunggu"
          sx={{
            backgroundColor: "#EAEFFF",
            borderRadius: "8px",
            width: "125px",
            color: "#8DA6FF",
            fontFamily: "poppins",
            fontWeight: 500,
            ml:2
          }}
        />
      ) : status === "Menang" ? (
        <Chip
          label="Menang"
          sx={{
            backgroundColor: "#FBFFFB",
            borderRadius: "8px",
            width: "125px",
            color: "#03AC0E",
            fontFamily: "poppins",
            fontWeight: 500,
            ml:2
          }}
        />
      ) : (
        <Chip
          label="Kalah"
          sx={{
            backgroundColor: "#FFEAEF",
            borderRadius: "8px",
            width: "125px",
            color: "#FF5C86",
            fontFamily: "poppins",
            fontWeight: 500,
            ml:2
          }}
        />
      )}
    </div>
  );
};

export default ChipStatus;
