import React, { useState } from "react";
import TablePetugas from "./petugas/table";
import { styled } from "@mui/material/styles";
import { InputBase, Button, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterButton from "./petugas/filter";
import AddIcon from "@mui/icons-material/Add";
import {DialogAdd} from "./petugas/dialog";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#f7f7f7f7",
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#03AC0E",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "18ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const MainContentPetugas = (props) => {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [reloadAll, setReloadAll] = useState(false)
    const [searchText, setSearchText] = useState('')

    const handleClickOpen = () => {
      setOpenDialog(true);
    };
  
    const handleClose = () => {
      setOpenDialog(false);
    };
    const handleReload = () => {
      setReloadAll(true);
      setTimeout(() => {
        setReloadAll(false);
      }, 500);
    };
    return (
      <main
        style={{
          background: "#f7f7f7f7",
          minHeight: "100vh",
          flexGrow: 1,
          overflow: "auto",
        }}
      >
        <DialogAdd open={openDialog} closeDialog={() => handleClose()} processAdd={() => handleReload()}  />
        <div
          style={{
            padding: 80,
          }}
        >
          <div
            style={{
              maxHeight: 100,
              margin: "0px 0px 8px 0px",
              padding: "24px",
              display: "flex",
              borderRadius: "10px",
              justifyContent: "space-between",
              backgroundColor: "#ffffff",
              alignItems: "center",
            }}
          >
            <div
              style={{
                alignItems: "center",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontFamily: "poppins",
                }}
              >
                Data Petugas
              </h3>
            </div>
            <div style={{ display: "flex" }}>
              
              <FilterButton />
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  onChange={e => setSearchText(e.target.value)}
                />
              </Search>
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  backgroundColor: "#03AC0E",
                  minWidth: "100px",
                  padding: 1,
                  marginLeft:1,
                  boxShadow: 'none',
                  "&:hover": {
                    backgroundColor: '#03AC0E',
                    boxShadow: 1
                  }
                }}
                onClick={() => handleClickOpen()}
              >
                <AddIcon />
                <Typography sx={{ fontFamily: "poppins", fontSize: "14px", marginLeft:1, fontWeight:200 }}>
                  Create
                </Typography>
              </Button>
            </div>
          </div>
          <TablePetugas reload={reloadAll} searchText={searchText} />
        </div>
      </main>
    );
  }
export default MainContentPetugas;
