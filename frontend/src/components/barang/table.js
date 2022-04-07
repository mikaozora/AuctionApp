import React, { useEffect, useState, useCallback } from "react";
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
import { DialogDelete, DialogEdit, DialogDetail } from "./dialog";
import ChipStatus from "./chip";
import { convertToRupiah } from "../../helper/convertRupiah";
import { tableCellClasses } from "@mui/material/TableCell";

const TableBarang = (props) => {
  const [data, setData] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [itemSelected, setItemSelected] = useState("");

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
  const handleOpenDetail = (id) => {
    setOpenDetail(true);
    setItemSelected(id);
  };

  const handleCloseDetail = () => {
    setOpenDetail(false);
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
  const sorted = (data, sortedBy) => {
    let result = [];
    if (sortedBy == "name") {
      result = data.sort((a, b) =>
        a.nama.toLowerCase() > b.nama.toLowerCase() ? 1 : -1
      );
    } else if (sortedBy == "date") {
      result = data.sort((a, b) => new Date(b.tgl) - new Date(a.tgl));
    } else if (sortedBy == "price") {
      result = data.sort(
        (a, b) => parseFloat(b.hargaAwal) - parseFloat(a.hargaAwal)
      );
    } else {
      result = data;
    }
    return result;
  };
  const getData = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/barang`, headerConfig());
      if (response.data.data) {
        let sortedData = sorted(response.data.data, props.sortedBy);
        setData(sortedData);
      }
    } catch (err) {
      console.log(err);
    }
  }, [props.sortedBy]);
  const deleteData = async () => {
    try {
      const response = await axios.delete(
        `${url}/barang/${itemSelected}`,
        headerConfigFile()
      );
      setAlert({
        open: true,
        message: "Berhasil menghapus data barang",
        severity: "success",
      });
      setItemSelected("");
      handleCloseDelete();
      getData();
    } catch (err) {
      handleCloseDelete();
      setAlert({
        open: true,
        message: "Gagal menghapus data barang",
        severity: "error",
      });
    }
  };
  const editData = async (payload) => {
    try {
      const response = await axios.put(
        `${url}/barang/`,
        payload,
        headerConfigFile()
      );
      if (response.data.code === 200 || response.data.code === 201) {
        setItemSelected("");
        handleCloseEdit();
        setAlert({
          open: true,
          message: "Berhasil Mengubah Data Barang",
          severity: "success"
        });
        getData();
      }
    } catch (err) {
      handleCloseEdit();
      setAlert({
        open: true,
        message: "Gagal Mengubah Data Barang",
        severity: "error"
      });
    }
  };

  useEffect(() => {
    getData();
  }, [getData, props.reload]);
  return (
    <Paper sx={{ boxShadow: "none", padding: 3, borderRadius: 1 }}>
      {console.log(props.sortedBy)}
      {/* {console.log(data)} */}
      {/* {console.log(data.sort((a, b) => (a.nama.toLowerCase() > b.nama.toLowerCase() ? 1 : -1)))} */}
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
        <DialogDetail
          open={openDetail}
          closeDialog={() => handleCloseDetail()}
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
                      onClick={() => handleOpenDetail(row)}
                      sx={{
                        backgroundColor: "#FAFFFA",
                        borderRadius: "8px",
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
      {/* <button onClick={sorted}>tes sort</button> */}
    </Paper>
  );
};

export default TableBarang;
