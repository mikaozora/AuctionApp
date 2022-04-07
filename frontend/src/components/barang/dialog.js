import React, { useState } from "react";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Snackbar,
  Alert,
  createTheme,
  ThemeProvider,
  IconButton,
  Typography,
  CardMedia,
} from "@mui/material";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
import { url } from "../../config";
import { styled } from "@mui/styles";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {splitter} from "../../helper/splitter"
import { toIsoString } from "../../helper/date";

const RequiredType = styled("Typography")(({ theme }) => ({
  fontFamily: "poppins",
  fontSize: "14px",
  fontWeight: 300,
  color: "#FF5C86",
}));

const theme = createTheme({
  palette: {
    success: {
      main: "#03AC0E",
    },
  },
});

const DialogAdd = (props) => {
  const [alert, setAlert] = useState({
    open: false,
    message: null,
    vertical: "top",
    horizpntal: "center",
    severity: "",
  });
  const [required, setRequired] = useState({
    show: false,
    message: "",
  });
  const headerConfig = () => {
    let header = {
      headers: {
        "Content-Type": "multipart/formdata",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    return header;
  };

  const handleClose = () => {
    setAlert({ ...alert, open: false });
  };
  const add = async (values, resetForm) => {
    const formData = new FormData();
    formData.append("nama", values.nama);
    formData.append("hargaAwal", values.hargaAwal);
    formData.append("deskripsi", values.deskripsi);
    formData.append("image", values.image);
    try {
      const response = await axios.post(
        `${url}/barang`,
        formData,
        headerConfig()
      );
      console.log(response);
      props.processAdd();
      setAlert({
        open: true,
        message: "Berhasil Menambah Barang",
        severity: "success",
      });
      resetForm();
    } catch (err) {
      setAlert({
        open: true,
        message: "Gagal Menambah Barang",
        severity: "error",
      });
    }
  };
  const validation = yup.object({
    nama: yup.string().required("Nama is required"),
    hargaAwal: yup.string().required("Harga is required"),
    deskripsi: yup.string().required("Deskripsi is required"),
    image: yup.string().required("Image is required"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nama: "",
      hargaAwal: "",
      deskripsi: "",
      image: "",
    },
    validationSchema: validation,
    onSubmit: (values, { resetForm }) => {
      add(values, resetForm);
      console.log(values);
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Snackbar
          open={alert.open}
          autoHideDuration={5000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleClose}
            severity={alert.severity}
            sx={{ width: "100%" }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
        <Dialog open={props.open} onClose={props.closeDialog}>
          <form onSubmit={formik.handleSubmit}>
            <DialogTitle>Tambah Data Barang</DialogTitle>
            <DialogContent sx={{ pt: 0, pb: 2 }}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Nama"
                type="text"
                fullWidth
                variant="outlined"
                color="success"
                sx={{
                  minWidth: "500px",
                  outline: "none",
                  backgroundColor: "#f7f7f7",
                }}
                name="nama"
                onChange={formik.handleChange}
                value={formik.values.nama}
                autoComplete="off"
              />
              {(formik.touched.nama && Boolean(formik.errors.nama)) ||
              required.show ? (
                <RequiredType>
                  {formik.touched.nama && formik.errors.nama}
                </RequiredType>
              ) : null}
            </DialogContent>

            <DialogContent sx={{ pt: 0, pb: 2 }}>
              <TextField
                margin="dense"
                id="hargaAwal"
                label="Harga Awal"
                type="text"
                fullWidth
                variant="outlined"
                color="success"
                sx={{
                  minWidth: "500px",
                  outline: "none",
                  backgroundColor: "#f7f7f7",
                }}
                name="hargaAwal"
                onChange={formik.handleChange}
                value={formik.values.hargaAwal}
                autoComplete="off"
              />
              {(formik.touched.hargaAwal && Boolean(formik.errors.hargaAwal)) ||
              required.show ? (
                <RequiredType>
                  {formik.touched.hargaAwal && formik.errors.hargaAwal}
                </RequiredType>
              ) : null}
            </DialogContent>
            <DialogContent sx={{ pt: 0, pb: 2 }}>
              <TextField
                multiline
                margin="dense"
                id="deskripsi"
                label="Deskripsi"
                type="text"
                fullWidth
                variant="outlined"
                color="success"
                rows={4}
                sx={{
                  minWidth: "500px",
                  outline: "none",
                  backgroundColor: "#f7f7f7",
                }}
                name="deskripsi"
                onChange={formik.handleChange}
                value={formik.values.deskripsi}
                autoComplete="off"
              />
              {(formik.touched.deskripsi && Boolean(formik.errors.deskripsi)) ||
              required.show ? (
                <RequiredType>
                  {formik.touched.deskripsi && formik.errors.deskripsi}
                </RequiredType>
              ) : null}
            </DialogContent>
            <DialogContent sx={{ pt: 0, pb: 0 }}>
              <TextField
                margin="dense"
                id="image"
                type="file"
                fullWidth
                variant="outlined"
                color="success"
                sx={{
                  minWidth: "500px",
                  outline: "none",
                  backgroundColor: "#f7f7f7",
                }}
                name="image"
                onChange={(event) => {
                  formik.setFieldValue("image", event.target.files[0]);
                }}
                autoComplete="off"
              />
              {(formik.touched.image && Boolean(formik.errors.image)) ||
              required.show ? (
                <RequiredType>
                  {formik.touched.image && formik.errors.image}
                </RequiredType>
              ) : null}
            </DialogContent>
            <DialogActions>
              <Button
                onClick={props.closeDialog}
                sx={{
                  backgroundColor: "#ffffff",
                  color: "#03AC0E",
                  mt: 1,
                  mb: 1,
                  minWidth: "80px",
                  textTransform: "none",
                  fontSize: "14px",
                  fontFamily: "poppins",
                  fontWeight: 400,
                  borderRadius: 1,
                  border: "1px solid #03AC0E",
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={props.closeDialog}
                sx={{
                  backgroundColor: "#03AC0E",
                  color: "#ffffff",
                  mt: 1,
                  mb: 1,
                  minWidth: "80px",
                  marginRight: 2,
                  textTransform: "none",
                  fontSize: "14px",
                  fontFamily: "poppins",
                  fontWeight: 400,
                  borderRadius: 1,
                  border: "1px solid #03AC0E",
                  "&:hover": {
                    backgroundColor: "#03AC0E",
                  },
                }}
              >
                Submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </ThemeProvider>
  );
};

const DialogDelete = (props) => {
  const { open, closeDialog, processDelete, handleClose, alert } = props;

  return (
    <div>
      <Snackbar
        open={alert.open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
      <Dialog
        open={open}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Hapus Data Barang"}</DialogTitle>
        <DialogContent sx={{ pb: 1 }}>
          <DialogContentText id="alert-dialog-description">
            Apakah anda yakin ingin menghapus data barang?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={closeDialog}
            sx={{
              backgroundColor: "#ffffff",
              color: "#03AC0E",
              mt: 1,
              mb: 1,
              minWidth: "80px",
              textTransform: "none",
              fontSize: "14px",
              fontFamily: "poppins",
              fontWeight: 400,
              borderRadius: 1,
              border: "1px solid #03AC0E",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={processDelete}
            autoFocus
            sx={{
              backgroundColor: "#03AC0E",
              color: "#ffffff",
              mt: 1,
              mb: 1,
              minWidth: "80px",
              marginRight: 2,
              textTransform: "none",
              fontSize: "14px",
              fontFamily: "poppins",
              fontWeight: 400,
              borderRadius: 1,
              border: "1px solid #03AC0E",
              "&:hover": {
                backgroundColor: "#03AC0E",
              },
            }}
          >
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const DialogEdit = (props) => {
  const { alert, handleClose } = props;
  const [required, setRequired] = useState({
    show: false,
    message: "",
  });
  let data = props.data;
  const edit = async (values) => {
    const formData = new FormData();
    formData.append("id", values.id);
    formData.append("nama", values.nama);
    formData.append("hargaAwal", values.hargaAwal);
    formData.append("tgl", values.tgl);
    formData.append("deskripsi", values.deskripsi);
    formData.append("image", values.image);
    props.processEdit(formData);
  };
  const validation = yup.object({
    nama: yup.string().required("Nama is required"),
    hargaAwal: yup.string().required("Harga is required"),
    deskripsi: yup.string().required("Deskripsi is required"),
    image: yup.string().required("Image is required"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: data.id,
      nama: data.nama,
      hargaAwal: data.hargaAwal,
      tgl: data.tgl,
      deskripsi: data.deskripsi,
      image: data.image,
    },
    validationSchema: validation,
    onSubmit: (values) => {
      edit(values);
      console.log(values);
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Snackbar
          open={alert.open}
          autoHideDuration={5000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleClose}
            severity={alert.severity}
            sx={{ width: "100%" }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
        <Dialog open={props.open} onClose={props.closeDialog}>
          <form onSubmit={formik.handleSubmit}>
            <DialogTitle>Edit Data Barang</DialogTitle>
            <DialogContent sx={{ pt: 0, pb: 2 }}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Nama"
                type="text"
                fullWidth
                variant="outlined"
                color="success"
                sx={{
                  minWidth: "500px",
                  outline: "none",
                  backgroundColor: "#f7f7f7",
                }}
                name="nama"
                onChange={formik.handleChange}
                value={formik.values.nama}
                autoComplete="off"
              />
              {(formik.touched.nama && Boolean(formik.errors.nama)) ||
              required.show ? (
                <RequiredType>
                  {formik.touched.nama && formik.errors.nama}
                </RequiredType>
              ) : null}
            </DialogContent>
            <DialogContent sx={{ pt: 0, pb: 2 }}>
              <TextField
                margin="dense"
                id="hargaAwal"
                label="Harga Awal"
                type="text"
                fullWidth
                variant="outlined"
                color="success"
                sx={{
                  minWidth: "500px",
                  outline: "none",
                  backgroundColor: "#f7f7f7",
                }}
                name="hargaAwal"
                onChange={formik.handleChange}
                value={formik.values.hargaAwal}
                autoComplete="off"
              />
              {(formik.touched.hargaAwal && Boolean(formik.errors.hargaAwal)) ||
              required.show ? (
                <RequiredType>
                  {formik.touched.hargaAwal && formik.errors.hargaAwal}
                </RequiredType>
              ) : null}
            </DialogContent>
            <DialogContent sx={{ pt: 0, pb: 2 }}>
              <TextField
                multiline
                margin="dense"
                id="deskripsi"
                label="Deskripsi"
                type="text"
                fullWidth
                variant="outlined"
                color="success"
                rows={4}
                sx={{
                  minWidth: "500px",
                  outline: "none",
                  backgroundColor: "#f7f7f7",
                }}
                name="deskripsi"
                onChange={formik.handleChange}
                value={formik.values.deskripsi}
                autoComplete="off"
              />
              {(formik.touched.deskripsi && Boolean(formik.errors.deskripsi)) ||
              required.show ? (
                <RequiredType>
                  {formik.touched.deskripsi && formik.errors.deskripsi}
                </RequiredType>
              ) : null}
            </DialogContent>
            <DialogContent sx={{ pt: 0, pb: 0 }}>
              <TextField
                margin="dense"
                id="image"
                type="file"
                fullWidth
                variant="outlined"
                color="success"
                sx={{
                  minWidth: "500px",
                  outline: "none",
                  backgroundColor: "#f7f7f7",
                }}
                name="image"
                onChange={(event) => {
                  formik.setFieldValue("image", event.target.files[0]);
                }}
                autoComplete="off"
              />
              {(formik.touched.image && Boolean(formik.errors.image)) ||
              required.show ? (
                <RequiredType>
                  {formik.touched.image && formik.errors.image}
                </RequiredType>
              ) : null}
            </DialogContent>
            <DialogActions>
              <Button
                onClick={props.closeDialog}
                sx={{
                  backgroundColor: "#ffffff",
                  color: "#03AC0E",
                  mt: 1,
                  mb: 1,
                  minWidth: "80px",
                  textTransform: "none",
                  fontSize: "14px",
                  fontFamily: "poppins",
                  fontWeight: 400,
                  borderRadius: 1,
                  border: "1px solid #03AC0E",
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={props.closeDialog}
                sx={{
                  backgroundColor: "#03AC0E",
                  color: "#ffffff",
                  mt: 1,
                  mb: 1,
                  minWidth: "80px",
                  marginRight: 2,
                  textTransform: "none",
                  fontSize: "14px",
                  fontFamily: "poppins",
                  fontWeight: 400,
                  borderRadius: 1,
                  border: "1px solid #03AC0E",
                  "&:hover": {
                    backgroundColor: "#03AC0E",
                  },
                }}
              >
                Submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </ThemeProvider>
  );
};

const DialogDetail = (props) => {
  const { processEdit } = props;
  let data = props.data;

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth="true"
        maxWidth="md"
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <DialogTitle id="alert-dialog-title">{"Detail Barang"}</DialogTitle>
          <IconButton
            onClick={props.closeDialog}
            sx={{ "&:hover": { backgroundColor: "#ffffff" } }}
          >
            <CloseRoundedIcon sx={{ marginRight: 2 }} />
          </IconButton>
        </div>
        <DialogContent sx={{ pt: 1 }}>
          <div style={{ display: "flex" }}>
            <CardMedia
              
              component="img"
              height="300"
              sx={{ width: 300 }}
              image={url + "/barang_image/" + data.image}
            />
            <div>
              <table style={{ margin: "8px", width: "100%", padding: "8px", fontFamily: "poppins", paddingRight: "16px" }}>
                <tr align="left">
                  <th>Nama Barang</th>
                  <th>Tanggal</th>
                </tr>
                <tr>
                  <td>{data.nama}</td>
                  <td>{data.tgl}</td>
                </tr>
                <tr align="left" style={{marginTop: "8px"}}>
                  <th>Harga Awal</th>
                  <th>UpdatedAt</th>
                </tr>
                <tr>
                  <td>{data.hargaAwal}</td>
                  <td>{splitter(toIsoString(new Date(data.updatedAt)))}</td>
                </tr>
                <tr align="left">
                  <th style={{}} colSpan="2">
                    Deskripsi
                  </th>
                </tr>
                <tr>
                  <td style={{ }} colSpan="2">
                    {data.deskripsi}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export { DialogAdd, DialogDelete, DialogEdit, DialogDetail };
