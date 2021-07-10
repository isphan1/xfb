import { makeStyles, Menu, MenuItem, Typography } from '@material-ui/core'
import React from 'react'

const useStyles= makeStyles(theme=>({
    root: {
        zIndex: "9999",
        "& .MuiMenu-paper": {
          width: "360px",
          padding: "10px 10px 0 10px",
          maxHeight:"450px",
          borderRadius: "5px",
        },
        "& .MuiPaper-root": {
          // right: "0 !important",
          // top: "50px !important",
          // marginLeft:"130px",
          // marginTop:"-80px"
        },
      },
      menuItem:{
        display:"flex",
        flexDirection:"column",
        alignItems:"flex-start",
        padding:"5px",
        cursor:"pointer",
        "&:hover":{
          backgroundColor:"#e8e2e2",
          borderRadius:"5px"
        }
      },
      menuTitle:{fontSize:"15px",fontWeight:"400"},
      menuSubTitle:{
        fontSize:"13px",fontWeight:"300",color:"#332f2f"
      }
}))

const relaventTypes = [
  {title:"Top Comments",subTitle:"Show the most engaging comments frist."},
  {title:"Most Recent",subTitle:"Show the newest comments frist."},
  {title:"All Comments",subTitle:"Show all comments in chronological order, including potential spam."},

]

export default function RelaventMenu(props) {

    const {relaventAnchor,handleCloseRelavent} = props
    const classes = useStyles()

    return (
        <Menu
        className={classes.root}
        anchorEl={relaventAnchor}
        keepMounted
        open={Boolean(relaventAnchor)}
        onClose={()=>handleCloseRelavent(relaventTypes[1].title)}
        >
          {relaventTypes.map((item,id)=>(
              <div
              key={item.title}
              className={classes.menuItem}
              onClick={()=>handleCloseRelavent(item.title)}
              >
              <Typography className={classes.menuTitle}>{item.title}</Typography>
              <Typography className={classes.menuSubTitle}>{item.subTitle}</Typography>
              </div>
          ))} 
        </Menu>
    )
}
