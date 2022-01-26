import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableContainer,
  TableCell,
  Paper,
  IconButton,
  Chip,
} from "@mui/material";
import { styled, makeStyles } from "@mui/styles";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import axios from "axios";
import { url } from "../../config";
import { DialogDelete, DialogEdit } from "./dialog";
import ChipStatus from "./chip";
import { convertToRupiah } from "../../helper/convertRupiah";
import { tableCellClasses } from "@mui/material/TableCell";

const TableBarang = (props) => {
  const [data, setData] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [itemSelected, setItemSelected] = useState("");
  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleDeleteData = (id) => {
    setOpenDelete(true);
    setItemSelected(id);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleEditData = (payload) => {
    setOpenEdit(true);
    setItemSelected(payload);
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
  const headerConfigFile = () => {
    let header = {
      headers: {
        "Content-Type": "multipart/formdata",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    return header;
  };
  const [alert, setAlert] = useState({
    open: false,
    message: null,
    vertical: "top",
    horizpntal: "center",
  });
  const getData = async () => {
    const response = await axios.get(`${url}/barang`, headerConfig());
    if (!response) {
      console.log("error");
    }
    setData(response.data.data);
  };

  const deleteData = async () => {
    const response = await axios.delete(
      `${url}/barang/${itemSelected}`,
      headerConfigFile()
    );
    if (!response) {
      console.log("error");
    } else if (response.data.code === 200) {
      setItemSelected("");
      handleCloseDelete();
      getData();
    }
  };
  const editData = async (payload) => {
    try {
      const response = await axios.put(
        `${url}/barang/`,
        payload,
        headerConfigFile()
      );
      console.log(response);
      if (response.data.code === 200 || response.data.code === 201) {
        setItemSelected("");
        handleCloseEdit();
        setAlert({
          open: true,
          message: "Berhasil Mengubah Data Barang",
        });
        getData();
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, [props.reload]);
  return (
    <Paper sx={{ boxShadow: "none", padding: 3, borderRadius: 1 }}>
      <TableContainer>
        <DialogDelete
          open={openDelete}
          closeDialog={() => handleCloseDelete()}
          processDelete={() => deleteData()}
        />
        <DialogEdit
          open={openEdit}
          closeDialog={() => handleCloseEdit()}
          processEdit={(payload) => editData(payload)}
          data={itemSelected}
        />
        <Table
          sx={{
            minWidth: 650,
            boxShadow: "none",
            [`& .${tableCellClasses.root}`]: {
              borderBottom: "none",
              fontFamily: "poppins",
            },
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="left">No</TableCell>
              <TableCell align="left">Nama</TableCell>
              <TableCell align="left">Harga Awal</TableCell>
              <TableCell align="left">Tanggal</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{}}>
            {data.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: "none" },
                  "&:nth-of-type(odd)": {
                    backgroundColor: "#f7f7f7",
                  },
                }}
              >
                {/* {console.log(row)} */}
                <TableCell align="left">{index + 1}</TableCell>
                <TableCell align="left" sx={{ maxWidth: "200px" }}>
                  {row.nama}
                </TableCell>
                <TableCell align="left" sx={{ maxWidth: "100px" }}>
                  {convertToRupiah(row.hargaAwal)}
                </TableCell>
                <TableCell align="left">{row.tgl}</TableCell>
                <TableCell align="center">
                  <ChipStatus data={row} />
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => handleEditData(row)}
                    sx={{
                      backgroundColor: "#FAFFFA",
                      borderRadius: "8px",
                      marginRight: 1,
                    }}
                  >
                    <EditRoundedIcon
                      sx={{ fontSize: "16px", color: "#03AC0E" }}
                    />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteData(row.id)}
                    sx={{
                      backgroundColor: "#FAFFFA",
                      borderRadius: "8px",
                      marginRight: 1,
                    }}
                  >
                    <DeleteRoundedIcon
                      sx={{ fontSize: "16px", color: "#03AC0E" }}
                    />
                  </IconButton>
                  <IconButton
                    sx={{
                      backgroundColor: "#FAFFFA",
                      borderRadius: "8px"
                    }}
                  >
                    <InfoRoundedIcon
                      sx={{ fontSize: "16px", color: "#03AC0E" }}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TableBarang;
