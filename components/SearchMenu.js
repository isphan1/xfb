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
import { connect } from "react-redux";
import axiosInstance from "./axios";
import Cookie from 'js-cookie'
const SearchMenu = (props) =>{
  const useStyles = makeStyles((theme) => ({
    menuDesign: {
      zIndex: "9999",
      "& .MuiMenu-paper": {
        width: "300px",
        // minHeight: "280px",
        maxHeight: "400px",
        overflow: "scroll",
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

  const { searchAnchor, handleCloseSearch,search,setSearch,results,setResults } = props;

  const classes = useStyles();

  React.useEffect(() => {
    if(search.length > 0){
    axiosInstance({
      method:"post",
      url:`search/`,
      data:{'search':search},
      headers:{
          "Authorization": "JWT "+ Cookie.get("access_token")
      }    
  }).then(res=>
      setResults(res.data)
      )
    .catch(err=>
      console.log(err)
      )
    }
  }, [search])

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
          autoComplete="off"
          id="ab"
          style={{
            borderRadius: "30px",
            backgroundColor: "#f0f2f5",
            padding: "1.5px 10px",
          }}
          value={search}
          onChange={e => setSearch(e.target.value.trim())}
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
      {
        results.length <= 0 ?
      
        <Typography style={{display:"flex",justifyContent:"center",
      alignItems:"center"
      }}>Nothing Found</Typography>
      :
      results.map((item) => (
        <div key={item.id} className={classes.menuItem}>
          <div style={{ display: "flex", alignItems: "center"}}>
            <img
              src={item.profile_photo}
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
              {item.name}
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

export default SearchMenu