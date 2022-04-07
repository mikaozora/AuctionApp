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
import { tableCellClasses } from "@mui/material/TableCell";
import { convertToRupiah } from "../../helper/convertRupiah";
import { toIsoString } from "../../helper/date";
import { splitter } from "../../helper/splitter";

const TableHistory = (props) => {
  const [data, setData] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [itemSelected, setItemSelected] = useState("");
  const [nameBarang, setNameBarang] = useState("");

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
  const sorted = (data, sortedBy) => {
    let result = [];
    if (sortedBy == "name") {
      result = data.sort((a, b) =>
        a.lelang.barang.nama.toLowerCase() > b.lelang.barang.nama.toLowerCase() ? 1 : -1
      );
    } else if (sortedBy == "date") {
      result = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortedBy == "price") {
      result = data.sort(
        (a, b) => parseFloat(b.lelang.hargaAkhir) - parseFloat(a.lelang.hargaAkhir)
      );
    } else {
      result = data;
    }
    return result;
  };
  const getData = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/historyLelang`, headerConfig());
      if (response.data.data) {
        let sortedData = sorted(response.data.data, props.sortedBy);
        setData(sortedData);
      }
      setData(response.data.data);
    } catch (err) {
      console.log(err);
    }
  }, [props.sortedBy]);

  
  useEffect(() => {
    getData();
  }, [getData, props.reload]);
  return (
    <Paper sx={{ boxShadow: "none", padding: 3, borderRadius: 1 }}>
      <TableContainer>
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
              <TableCell align="left">Harga Tawar</TableCell>
              <TableCell align="left">Tanggal Lelang</TableCell>
              <TableCell align="left">Tanggal Berakhir</TableCell>
              <TableCell align="left">Nama User</TableCell>
              <TableCell align="center">Status</TableCell>
              {/* <TableCell align="center">Action</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .filter((row) => {
                if (props.searchText == "") {
                  return row;
                } else if (
                  row.lelang.barang.nama
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
                  <TableCell align="left">{row.lelang.barang.nama}</TableCell>
                  <TableCell align="left">
                    {convertToRupiah(row.penawaranHarga)}
                  </TableCell>
                  <TableCell align="left">{splitter(toIsoString(new Date(row.createdAt)))}</TableCell>
                  <TableCell align="left">
                    {row.lelang.endTime ? row.lelang.endTime : "-"}
                  </TableCell>
                  <TableCell align="left">
                    {row.masyarakat.nama}
                  </TableCell>
                  <TableCell align="center">
                    {row.lelang.status === "Dibuka" && row.penawaranHarga === row.lelang.hargaAkhir ? (
                      <Chip
                        label="Menunggu"
                        sx={{
                          backgroundColor: "#EAEFFF",
                          borderRadius: "8px",
                          width: "100px",
                          color: "#8DA6FF",
                          fontFamily: "poppins",
                          fontWeight: 500,
                        }}
                      />
                    ) : row.lelang.status === "Ditutup" && row.penawaranHarga === row.lelang.hargaAkhir ? (
                      <Chip
                        label="Menang"
                        sx={{
                          backgroundColor: "#FBFFFB",
                          borderRadius: "8px",
                          width: "100px",
                          color: "#03AC0E",
                          fontFamily: "poppins",
                          fontWeight: 500,
                        }}
                      />
                    ) : <Chip
                    label="Kalah"
                    sx={{
                      backgroundColor: "#FFEAEF",
                      borderRadius: "8px",
                      width: "100px",
                      color: "#FF5C86",
                      fontFamily: "poppins",
                      fontWeight: 500,
                    }}
                  />}
                  </TableCell>
                  {/* <TableCell align="center">
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
                  </TableCell> */}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TableHistory;
