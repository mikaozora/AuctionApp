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
import { styled } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import axios from "axios";
import { url } from "../../config";
import { DialogDelete, DialogEdit } from "./dialog";
import { tableCellClasses } from "@mui/material/TableCell";

const TablePetugas = (props) => {
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
    severity: "",
  });
  const handleClose = () => {
    setAlert({ ...alert, open: false });
  };
  const getData = async () => {
    const response = await axios.get(`${url}/petugas`, headerConfig());
    if (!response) {
      console.log("error");
    }
    setData(response.data.data);
  };

  const deleteData = async () => {
    try {
      const response = await axios.delete(
        `${url}/petugas/${itemSelected}`,
        headerConfig()
      );
      setAlert({
        open: true,
        message: "Berhasil menghapus data petugas",
        severity: "success",
      });
      setItemSelected("");
      handleCloseDelete();
      getData();
    } catch (err) {
      handleCloseDelete();
      setAlert({
        open: true,
        message: "Gagal menghapus data petugas",
        severity: "error",
      });
    }
  };
  const editData = async (payload) => {
    try {
      const response = await axios.put(
        `${url}/petugas/`,
        payload,
        headerConfig()
      );
      if (response.data.code === 200 || response.data.code === 201) {
        setItemSelected("");
        handleCloseEdit();
        setAlert({
          open: true,
          message: "Berhasil Mengubah Data Petugas",
          severity: "success"
        });
        getData();
      }
    } catch (err) {
      handleCloseEdit();
      setAlert({
        open: true,
        message: "Gagal Mengubah Data Petugas",
        severity: "error"
      });
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
          alert={alert}
          handleClose={handleClose}
        />
        <DialogEdit
          open={openEdit}
          closeDialog={() => handleCloseEdit()}
          processEdit={(payload) => editData(payload)}
          data={itemSelected}
          alert={alert}
          handleClose={handleClose}
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
              <TableCell>No</TableCell>
              <TableCell>Nama</TableCell>
              <TableCell>Username</TableCell>
              <TableCell align="center">Level</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .filter((row) => {
                if (props.searchText == "") {
                  return row;
                } else if (
                  row.nama
                    .toLowerCase()
                    .includes(props.searchText.toLowerCase())
                ) {
                  return row;
                }
              })
              .map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:nth-of-type(odd)": {
                      backgroundColor: "#f7f7f7",
                    },
                  }}
                >
                  {/* {console.log(row)} */}
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.nama}</TableCell>
                  <TableCell>{row.username}</TableCell>
                  <TableCell align="center">
                    {row.level === "admin" ? (
                      <Chip
                        label="Admin"
                        sx={{
                          backgroundColor: "#FBFFFB",
                          borderRadius: "8px",
                          width: "80px",
                          color: "#03AC0E",
                          fontFamily: "poppins",
                          fontWeight: 500,
                        }}
                      />
                    ) : (
                      <Chip
                        label="Petugas"
                        sx={{
                          backgroundColor: "#FFEAEF",
                          borderRadius: "8px",
                          width: "80px",
                          color: "#FF5C86",
                          fontFamily: "poppins",
                          fontWeight: 500,
                        }}
                      />
                    )}
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
                      <EditIcon sx={{ fontSize: "16px", color: "#03AC0E" }} />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteData(row.id)}
                      sx={{
                        backgroundColor: "#FAFFFA",
                        borderRadius: "8px",
                      }}
                    >
                      <DeleteIcon sx={{ fontSize: "16px", color: "#03AC0E" }} />
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

export default TablePetugas;
