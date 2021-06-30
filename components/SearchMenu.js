import React from "react";

import {
  Menu,
  MenuItem,
  Typography,
  makeStyles,
  Divider,
  IconButton,
  InputBase,
} from "@material-ui/core";
import { Close, Search, KeyboardBackspace } from "@material-ui/icons";
export default function SearchMenu(props) {
  const useStyles = makeStyles((theme) => ({
    menuDesign: {
      zIndex: "9999",
      "& .MuiMenu-paper": {
        width: "300px",
        minHeight: "280px",
        maxHeight: "490px",
        overflow: "hidden",
        borderRadius: "5px",
      },
      "& .MuiPaper-root": {
        left: "0 !important",
        top: "0 !important",
      },
    },
    menuItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      margin: "5px",
      padding:"5px" ,
      cursor: "pointer",
      "&:hover": {
        borderRadius: "7.5px",
        backgroundColor: "#f0f2f5",
      },
    },
  }));

  const { searchAnchor, handleCloseSearch, search, setSearch } = props;

  const classes = useStyles();
  return (
    <Menu
      className={classes.menuDesign}
      anchorEl={searchAnchor}
      // keepMounted
      open={Boolean(searchAnchor)}
      onClose={handleCloseSearch}
    >
      <div
        style={{
          marginLeft: "10px",
          display: "flex",
          alignItems: "center",
          marginBottom: "5px",
        }}
      >
        <IconButton
          disableFocusRipple
          size="small"
          style={{ marginRight: "7.5px" }}
          onClick={handleCloseSearch}
        >
          <KeyboardBackspace />
        </IconButton>
        <InputBase
          id="ab"
          style={{
            borderRadius: "30px",
            backgroundColor: "#f0f2f5",
            padding: "1.5px 10px",
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Facebook"
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "5px 10px",
        }}
      >
        <Typography style={{ fontSize: "15px", fontWeight: "bold" }}>
          Recent Searches
        </Typography>
        <Typography
          style={{ fontSize: "13px", fontWeight: "bold", color: "#009cde",cursor:"pointer" }}
        >
          Edit
        </Typography>
      </div>
      <Divider style={{ margin: "10px 0" }} />
      {["Dr. Muhammad Saifullah", "Muttakin Wara", "AbuBakar Mohammad Zakaria", 
      "Dr. Mufti Imam Hossain", "As Sunnah Complex"]
      .map((item) => (
        <div key={item} className={classes.menuItem}>
          <div style={{ display: "flex", alignItems: "center"}}>
            <img
              src="/a.png"
              width="40px"
              height="40px"
              style={{ borderRadius: "50px" }}
            />
            <Typography
              style={{
                fontSize: "14px",
                fontWeight: "400",
                marginLeft: "10px",
              }}
            >
              {item}
            </Typography>
          </div>
          <div>
            <IconButton size="small" onClick={handleCloseSearch}>
              <Close style={{ fontSize: "16px" }} />
            </IconButton>
          </div>
        </div>
      ))}
    </Menu>
  );
}
