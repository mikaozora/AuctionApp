import React, { useState } from "react";
import { Button, MenuItem, Menu, Typography } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterListIcon from "@mui/icons-material/FilterList";

const FilterButton = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSort = (value) => {
    props.sortedBy(value)
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          padding: 1,
          backgroundColor: "#f7f7f7",
          minWidth: "100px",
          marginLeft: 1,
        }}
      >
        <FilterListIcon sx={{ color: "#03AC0E" }} />
        <Typography
          sx={{
            color: "#03AC0E",
            textTransform: "none",
            fontFamily: "poppins",
            fontSize: "16px",
            marginLeft: 1,
          }}
        >
          Filter
        </Typography>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          overflow: "visible",
          sx: {
            boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
            fontFamily: "poppins",
            fontSize: "16px",
          },
        }}
      >
        <MenuItem
          sx={{ fontFamily: "poppins", fontSize: "14px" }}
          onClick={() => handleSort("date")}
        >
          By Date
        </MenuItem>
        <MenuItem
          sx={{ fontFamily: "poppins", fontSize: "14px" }}
          onClick={() => handleSort("name")}
        >
          By Name
        </MenuItem>
        <MenuItem
          sx={{ fontFamily: "poppins", fontSize: "14px" }}
          onClick={() => handleSort("price")}
        >
          By Last Price
        </MenuItem>
        <MenuItem
          sx={{ fontFamily: "poppins", fontSize: "14px" }}
          onClick={() => handleSort("")}
        >
          Default
        </MenuItem>
      </Menu>
    </div>
  );
};
export default FilterButton;
