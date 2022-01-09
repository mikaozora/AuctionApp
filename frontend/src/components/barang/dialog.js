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
} from "@mui/material";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
import { url } from "../../config";

const DialogAdd = (props) => {
  const [alert, setAlert] = useState({
    open: false,
    message: null,
    vertical: "top",
    horizpntal: "center",
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
  // const handleClick = (newState) => () => {
  //   setSnack({ open: true, ...newState });
  // };

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
      if (!response) {
        setAlert({ open: true, message: "Gagal Menambah Barang" });
      }
      props.processAdd();
      setAlert({ open: true, message: "Berhasil Menambah Barang" });
      resetForm();
    } catch (err) {
      console.log(err);
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
    <div>
      <Snackbar
        open={alert.open}
        autoHideDuration={1000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
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
          </DialogContent>
          <DialogContent sx={{ pt: 0, pb: 2 }}>
            <TextField
              margin="dense"
              id="hargaAwal"
              label="hargaAwal"
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
          </DialogContent>
          {/* <DialogContent sx={{ pt: 0, pb: 2 }}>
            <TextField
              autoFocus
              margin="dense"
              id="image"
              label="image"
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
              onChange={formik.handleChange}
              values={formik.values.image}
              autoComplete="off"
            />
          </DialogContent> */}
          <DialogContent sx={{ pt: 0, pb: 2 }}>
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

            {/* <Button variant="contained" component="label">
              Upload Image
              <input
                type="file"
                hidden
                onChange={formik.handleChange}
                values={formik.values.image}
              />
            </Button> */}
            {/* <input
              accept="image/*"
              className="contained-flie"
              style={{ display: "none" }}
              id="raised-button-file"
              multiple
              type="file"
            />
            <label htmlFor="raised-button-file">
              <Button
                variant="contained"
                component="span"
                className="button-image"
              >
                {formik.values.image == "" && "Upload File"}
                {console.log(formik.values.image)}
                {typeof formik.values.image === "object" &&
                  formik.values.image.name}
              </Button>
            </label> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={props.closeDialog}>Cancel</Button>
            <Button type="submit" onClick={props.closeDialog}>
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

const DialogDelete = (props) => {
  const [alert, setAlert] = useState(false);
  const { open, closeDialog, processDelete } = props;

  return (
    <div>
      <Dialog
        open={open}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Hapus Data Barang"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Apakah anda yakin ingin menghapus data barang?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={processDelete} autoFocus>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const DialogEdit = (props) => {
  const [alert, setAlert] = useState({
    open: false,
    message: null,
    vertical: "top",
    horizpntal: "center",
  });
  let data = props.data;
  const handleClose = () => {
    setAlert({ ...alert, open: false });
  };
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
    <div>
      <Snackbar
        open={alert.open}
        autoHideDuration={1000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
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
          </DialogContent>
          <DialogContent sx={{ pt: 0, pb: 2 }}>
            <TextField
              margin="dense"
              id="hargaAwal"
              label="hargaAwal"
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
          </DialogContent>
          {/* <DialogContent sx={{ pt: 0, pb: 2 }}>
            <TextField
              autoFocus
              margin="dense"
              id="image"
              label="image"
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
              onChange={formik.handleChange}
              values={formik.values.image}
              autoComplete="off"
            />
          </DialogContent> */}
          <DialogContent sx={{ pt: 0, pb: 2 }}>
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

            {/* <Button variant="contained" component="label">
              Upload Image
              <input
                type="file"
                hidden
                onChange={formik.handleChange}
                values={formik.values.image}
              />
            </Button> */}
            {/* <input
              accept="image/*"
              className="contained-flie"
              style={{ display: "none" }}
              id="raised-button-file"
              multiple
              type="file"
            />
            <label htmlFor="raised-button-file">
              <Button
                variant="contained"
                component="span"
                className="button-image"
              >
                {formik.values.image == "" && "Upload File"}
                {console.log(formik.values.image)}
                {typeof formik.values.image === "object" &&
                  formik.values.image.name}
              </Button>
            </label> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={props.closeDialog}>Cancel</Button>
            <Button type="submit" onClick={props.closeDialog}>
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export { DialogAdd, DialogDelete, DialogEdit };
