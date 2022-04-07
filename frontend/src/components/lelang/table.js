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
import { styled } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import axios from "axios";
import { url } from "../../config";
import { DialogDelete, DialogEdit } from "./dialog";
import { tableCellClasses } from "@mui/material/TableCell";
import { convertToRupiah } from "../../helper/convertRupiah";

const TableLelang = (props) => {
  const [data, setData] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [itemSelected, setItemSelected] = useState("");
  const [nameBarang, setNameBarang] = useState("");
  const role = localStorage.getItem("role")

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
    setNameBarang(payload.barang.nama);
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
        a.barang.nama.toLowerCase() > b.barang.nama.toLowerCase() ? 1 : -1
      );
    } else if (sortedBy == "date") {
      result = data.sort(
        (a, b) => new Date(b.tglLelang) - new Date(a.tglLelang)
      );
    } else if (sortedBy == "price") {
      result = data.sort(
        (a, b) => parseFloat(b.hargaAkhir) - parseFloat(a.hargaAkhir)
      );
    } else {
      result = data;
    }
    return result;
  };
  const getData = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/lelang`, headerConfig());
      if (response.data.data) {
        let sortedData = sorted(response.data.data, props.sortedBy);
        setData(sortedData);
      }
      setData(response.data.data);
    } catch (err) {
      console.log(err);
    }
  }, [props.sortedBy]);

  const deleteData = async () => {
    try {
      const response = await axios.delete(
        `${url}/lelang/${itemSelected}`,
        headerConfig()
      );
      setAlert({
        open: true,
        message: "Berhasil menghapus data lelang",
        severity: "success",
      });
      setItemSelected("");
      handleCloseDelete();
      getData();
    } catch (err) {
      console.log(err.response);
      setAlert({ open: true, message: "Gagal menghapus data lelang", severity: "error" });
    }
  };
  const editData = async (payload) => {
    try {
      const newValues = {
        ...payload,
        endTime: payload.endTime + ".000Z",
      };
      const response = await axios.put(
        `${url}/lelang/`,
        newValues,
        headerConfig()
      );
        setItemSelected("");
        handleCloseEdit();
        setAlert({
          open: true,
          message: "Berhasil mengubah data lelang",
          severity: "success",
        });
        getData();
    } catch (err) {
      setAlert({
        open: true,
        message: "Gagal mengubah data lelang",
        severity: "error",
      });
    }
  };
  useEffect(() => {
    getData();
  }, [getData, props.reload]);
  return (
    <Paper sx={{ boxShadow: "none", padding: 3, borderRadius: 1 }}>
      <TableContainer>
        <DialogDelete
          open={openDelete}
          closeDialog={() => handleCloseDelete()}
          processDelete={() => deleteData()}
          handleClose={handleClose}
          alert={alert}
        />
        <DialogEdit
          open={openEdit}
          closeDialog={() => handleCloseEdit()}
          processEdit={(payload) => editData(payload)}
          data={itemSelected}
          nama={nameBarang}
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
              <TableCell align="left">Nama Barang</TableCell>
              <TableCell align="left">Harga Akhir</TableCell>
              <TableCell align="left">Tanggal Lelang</TableCell>
              <TableCell align="left">Tanggal Berakhir</TableCell>
              <TableCell align="center">Status</TableCell>
              {role === "petugas" ? <TableCell align="center">Action</TableCell> : null}
              
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .filter((row) => {
                if (props.searchText == "") {
                  return row;
                } else if (
                  row.barang.nama
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
                  <TableCell>{index + 1}</TableCell>
                  <TableCell align="left">{row.barang.nama}</TableCell>
                  <TableCell align="left">
                    {convertToRupiah(row.hargaAkhir)}
                  </TableCell>
                  <TableCell align="left">{row.tglLelang}</TableCell>
                  <TableCell align="left">
                    {row.endTime ? row.endTime : "-"}
                  </TableCell>
                  <TableCell align="center">
                    {row.status === "Dibuka" ? (
                      <Chip
                        label="Dibuka"
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
                        label="Ditutup"
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
                  {role === "petugas" ? <TableCell align="center">
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
                  </TableCell> : null}
                  
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TableLelang;
