const express = require("express");
const app = express();
const { response } = require("../helper/wrapper");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { history_lelang } = require("../models/index");
const { lelang } = require("../models/index");
const { barang } = require("../models/index");
const { masyarakat } = require("../models/index");

app.get("/", auth("admin", "petugas", "masyarakat"), async (req, res) => {
  await history_lelang
    .findAll({
      include: [{
        model: lelang,
        as: "lelang",
        include: [{ model: barang, as: "barang" }],
      },{
        model: masyarakat,
        as: "masyarakat",
      }]
    })
    .then((result) => {
      return response(
        res,
        "success",
        result,
        "Success get data history lelang",
        200
      );
    })
    .catch((err) => {
      return response(res, "fail", err, "Failed get data history lelang", 400);
    });
});

app.get("/:id", auth("admin", "petugas", "masyarakat"), async (req, res) => {
  const param = {
    idMasyarakat: req.params.id,
  };
  await history_lelang
    .findAll({
      where: param,
      include: [{
        model: lelang,
        as: "lelang",
        include: [{ model: barang, as: "barang" }],
      },{
        model: masyarakat,
        as: "masyarakat",
      }]
      
    })
    .then((result) => {
      return response(
        res,
        "success",
        result,
        "Success get data history lelang",
        200
      );
    })
    .catch((err) => {
      return response(res, "fail", err, "Failed get data history lelang", 400);
    });
});

module.exports = app;
