// services/reportGenerator.js

import jsPDF from "jspdf";
import "jspdf-autotable";
import { splitter } from "./splitter";
import { toIsoString } from "./date";
// Date Fns is used to format the dates we receive
// from our API call
import { format } from "date-fns";

// define a generatePDF function that accepts a tickets argument
const generatePDF = tickets => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["No", "Nama Barang", "Harga Awal", "Harga Akhir", "Pemenang", "Tanggal Lelang", "Tanggal Akhir"];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  tickets.forEach((ticket, index) => {
    const ticketData = [
      index + 1,
      ticket.lelang.barang.nama,
      ticket.lelang.barang.hargaAwal,
      ticket.lelang.hargaAkhir,
      ticket.masyarakat.nama,
      splitter(toIsoString(new Date(ticket.createdAt))),
      ticket.lelang.endTime
      // called date-fns to format the date on the ticket
    //   format(new Date(ticket.updated_at), "yyyy-MM-dd")
    ];
    // push each tickcet's info into a row
    tableRows.push(ticketData);
  });


  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
//   const date = Date().split(" ");
  // we use a date string to generate our filename.
//   const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  doc.text("Laporan History Lelang", 14, 15);
  // we define the name of our PDF file.
  doc.save(`report_history.pdf`);
};

export default generatePDF;