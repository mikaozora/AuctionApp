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
  Chip
} from "@mui/material";
import { styled } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import axios from "axios";
import { url } from "../../config";
import { DialogDelete, DialogEdit } from "./dialog";

const TableBarang = (props) => {
  const [data, setData] = useState([]);
  const [openDelete, setOpenDelete] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [itemSelected, setItemSelected] = useState("")
  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleDeleteData = (id) => {
    setOpenDelete(true);
    setItemSelected(id)
    
  }
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleEditData = (payload) => {
    setOpenEdit(true);
    setItemSelected(payload)
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
  const deleteData = async() => {
    const response = await axios.delete(`${url}/barang/${itemSelected}`, headerConfigFile())
    if(!response){
      console.log("error");
    }
    else if(response.data.code === 200){
      setItemSelected("")
      handleCloseDelete()
      getData()
    }
  }
  const editData = async(payload) => {
    try{
      const response = await axios.put(`${url}/barang/`, payload, headerConfigFile())
      console.log(response);
      if(response.data.code === 200 || response.data.code === 201){
        setItemSelected("")
        handleCloseEdit()
        setAlert({
          open: true,
          message: "Berhasil Mengubah Data Barang"
        })
        getData()
      }

    }catch(err){
      console.log(err);
    }

  }
  useEffect(() => {
    getData();
  }, [props.reload]);
  return (
    <TableContainer component={Paper}>
      {/* {console.log(itemSelected)} */}
      <DialogDelete open={openDelete} closeDialog={() => handleCloseDelete()} processDelete={() => deleteData()} />
      <DialogEdit open={openEdit} closeDialog={() => handleCloseEdit()} processEdit={(payload) => editData(payload)} data={itemSelected} />
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Nama</TableCell>
            <TableCell>Harga Awal</TableCell>
            <TableCell>Tanggal</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "&:nth-of-type(odd)": {
                  backgroundColor: "#f7f7f7",
                },
              }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{row.nama}</TableCell>
              <TableCell>{row.hargaAwal}</TableCell>
              <TableCell>{row.tgl}</TableCell>
              <TableCell align="center"><Chip label="Dilelang" /></TableCell>
              <TableCell align="center">
                <IconButton onClick={() => handleEditData(row)} sx={{"&:hover": {
                    backgroundColor: "rgba(244, 164, 67, 0.17)"
                }}}>
                  <EditIcon sx={{ fontSize: "20px", color: "#F4A442" }} />
                </IconButton>
                <IconButton onClick={() => handleDeleteData(row.id)} sx={{"&:hover": {
                    backgroundColor: "rgba(255, 0, 4, 0.15)"
                }}}>
                  <DeleteIcon sx={{ fontSize: "20px", color: "#ff0005" }} />
                </IconButton>
                <IconButton sx={{"&:hover": {
                    backgroundColor: "rgba(54, 103, 201, 0.15)"
                }}}>
                  <InfoIcon sx={{ fontSize: "20px", color: "#3667c9" }} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableBarang;
