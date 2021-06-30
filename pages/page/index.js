import React from 'react'
import {makeStyles,Drawer,Toolbar,Typography,IconButton,Button,Divider} from '@material-ui/core'
import { Settings, PersonAdd, ThumbUp, Assistant, Add } from '@material-ui/icons';
import Head from 'next/head'
const drawerWidth = 320;

const useStyles = makeStyles(theme =>({
    root:{
        flex:1,
        marginLeft:"320px"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        "@media (max-width: 990px)": {
          display: "none",
        },
      },
      drawerPaper: {
        width: drawerWidth,
        backgroundColor: "#fff",
        border: "none",
        padding: "10px",
      },
      drawerContainer: {
        overflow: "auto",
      },
      pageHeader:{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        padding:"10px 0px"
      },
      pageHeaderTitle:{
        fontSize:"24px",
        fontWeight:"700"
      },
      pageCreateButton:{
          textTransform:"capitalize",
          width:"100%",
          backgroundColor:"#cbe6f7",
          "&:hover":{
            backgroundColor:"#d0e0ea",
          },
          margin:"5px 0px"
      },
      pageIconButton:{
          backgroundColor:"#f1eaea",
          padding:"5px",
          "&:hover":{
            backgroundColor:"#ccc",
          }
      },
      pageIconButton1:{
        backgroundColor:"#f1eaea",
        padding:"5px",
        "&:hover":{
          backgroundColor:"#f1eaea",
        }
    },
      pageLink:{
          display:"flex",
          alignItems:"center",
          padding:"5px 10px",
          marginTop:"5px",
          cursor:"pointer",
          "&:hover":{
            backgroundColor:"#ccc",
            borderRadius:"7.5px"
          }
      },
      pageLinkTitle:{
        marginLeft:"10px",
        fontSize:"16px",
        fontWeight:"400",
        color:"#000"
      },

}))

const pageLinks = [
    {icon:<Assistant size="small"/>,title:"Discover"},
    {icon:<ThumbUp size="small"/>,title:"Liked Pages"},
    {icon:<PersonAdd size="small"/>,title:"Invites"},
]

const index = () =>{

const classes = useStyles()

    return (
        <div>
          <Head>
            <title>Pages</title>
          </Head>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{ paper: classes.drawerPaper }}
        >
            <Toolbar variant="dense"/>
        <div className={classes.drawerContainer}>
            <div className={classes.pageHeader}>
                <Typography className={classes.pageHeaderTitle}>Pages</Typography>
                <IconButton size="small" className={classes.pageIconButton}>
                <Settings size="small" />
              </IconButton>
            </div>
        <Button className={classes.pageCreateButton} variant="contained"><Add size="small"/>Create New Page</Button>
        <Divider style={{margin:"10px 0px"}}/>
        {
            pageLinks.map(item=>(
                <div className={classes.pageLink} key={item.title}>
                <IconButton size="small" className={classes.pageIconButton1}>
                    {item.icon}
                </IconButton>
                <Typography className={classes.pageLinkTitle}>{item.title}</Typography>
            </div>
            ))
        }

        </div>
            </Drawer>
            <main className={classes.root}>
                B
            </main>
        </div>
    )
}

index.layout = "L1";

export default index