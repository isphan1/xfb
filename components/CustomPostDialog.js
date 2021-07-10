import React from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Tooltip,
  makeStyles,
  IconButton,
  InputBase,
  Typography,
  Divider,
  Button,
  useMediaQuery,
} from "@material-ui/core";
import { ArrowBackIos, ArrowDropDown, Close, Mood, MoreHoriz, PersonAdd, PhotoLibrary, Public, QuestionAnswerSharp, Room } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0px",
    // padding: theme.spacing(1),
  },
  paper: {
    width: "500px",
    height:"450px",
    "@media (max-width: 600px)":{
      width:"100%",
      height:"100%",
    }
  },
  closeButton: {
    position: "absolute",
    backgroundColor: "#ccc",
    top: "11px",
    right: theme.spacing(2),
  },
  customInput: {
    minHeight: "120px",
    fontSize: "20px",
    display: "flex",
    alignItems: "start",
  },
  titleBox: {
    textAlign: "center",
    padding: "10px 15px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "500",
  },
  colorBoxSection: {
    display: "flex",
    justifyContent: "center",
  },
  colorBox: {
    width: "40px",
    height: "35px",
    margin: "0 10px",
    cursor: "pointer",
    border: "1px solid #ccc",
    borderRadius:"5px"
  },
  colorBoxButton: {
    width: "35px",
    height: "35px",
    margin: "0 10px",
    cursor: "pointer",
    border: "1px solid #ccc",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "bold",
    color: "#fff",
    background: "linear-gradient(to right,#e66465, #9198e5)",
    borderRadius:"5px"

  },
  postTypeBox: {
    padding: "10px 15px 5px 15px",
  },
  postButtonBox: {
    margin: "5px 15px 20px 15px",
  },
  postHeader: {
    display: "flex",
    alignItems: "center",
  },
  image: {
    borderRadius: "50px",
  },
  postInfo: {
    marginLeft: "5px",
  },
  postUser: {
    fontSize: "15px",
    fontWeight: "bold",
  },
  postTimeSection: {
    display: "flex",
    alignItems: "center",
  },
  postAccess: {
    display:"flex",
    alignItems:"center",
    backgroundColor:"#f3eded",
    borderRadius:"5px",
    padding:"0px 5px"
  },
  postAccessText:{
    fontSize:"14px",
    fontWeight:"bold",
    marginLeft:"5px"
  },
  postTimeIcon: {
    fontSize: "16px",
    marginLeft: "5px",
  },
  postButton: {
    color: "#fff",
    backgroundColor: "#009cde",
    width: "100%",
  },
  addToPost:{
      margin:"0 15px 10px 15px",
      padding:"10px",
      border:"1px solid #eee",
      borderRadius:"10px",
      display:"flex",
      justifyContent:"space-between",
      alignItems:"center"
  },
  addToPostText:{
    fontSize:"18px",
    fontWeight:"bold"
  },
  addToPostIcons:{
    
  },
  addToPostIcon:{

  },
  customWidth: {
    minWidth: "40px",
    height: "30px",
    textAlign: "center",
    alignItems: "center",
    display: "flex",
    fontSize: "12px",
    padding: "2.5px 10px",
    marginBottom: "5px",
  },
}));


const addIcons = [
  {icon:<QuestionAnswerSharp size="small" style={{color:"#df654f"}}/>,title:"Host a Q&A"},
  {icon:<PhotoLibrary size="small" style={{color:"#13b24e"}}/>,title:"Photo/Video"},
  {icon:<PersonAdd size="small" style={{color:"#009cde"}}/>,title:"Tag People"},
  {icon:<Room size="small" style={{color:"#e03251"}}/>,title:"Check In"},
  {icon:<Mood size="small" style={{color:"#ffbb00"}}/>,title:"Feeling/Activity"},
  {icon:<MoreHoriz size="small" />,title:"More"},
]

export default function CustomPostDialog(props) {
  const classes = useStyles();

  const { open, handlePostDialogClose,addPost,user } = props;

  const matchXs = useMediaQuery("(min-width:600px)")

  const [color, setColor] = React.useState("#ffffff");
  const [value, setValue] = React.useState("");
  const [box, setBox] = React.useState(false);

  const handleClose = () => {
    handlePostDialogClose();
    setColor("#ffffff");
    setValue("")
    setBox(false)
  };

const handleAddPost = () =>{
  addPost({'text':value,"user_id":user.user_id,'name':user.name,'profile_photo':user.profile_photo,'id':uuidv4()})
  handlePostDialogClose();
  setColor("#ffffff");
  setValue("")
  setBox(false)
}

  const colors = [
    { color: "#ffffff" },
    { color: "#104c97" },
    { color: "#009cde" },
    { color: "#1f262d" },
    { color: "#6d236c" },
    { color: "#ffbb00" },
    { color: "#4e0250" },
    { color: "#e6268c" },
  ];

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        classes={{ root: classes.root, paper: classes.paper }}
      >
        <DialogTitle classes={{ root: classes.titleBox }}>
          <Typography className={classes.title}>Create Post</Typography>
          <IconButton
            size="small"
            className={classes.closeButton}
            onClick={handleClose}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <Divider />
        <div className={classes.postTypeBox}>
          <div className={classes.postHeader}>
            <img
              src="/lo.jpeg"
              width="36px"
              height="36px"
              className={classes.image}
            />
            <div className={classes.postInfo}>
              <Typography className={classes.postUser}>
                Mohammad Hasan Dawdu
              </Typography>
              <div className={classes.postTimeSection}>
                <div className={classes.postAccess}>
                  <Public 
                  style={{
                    fontSize:"14px"
                  }}
                  />
                  <Typography className={classes.postAccessText}>Public</Typography>
                  <ArrowDropDown />
                </div>
              </div>
            </div>
          </div>
        </div>
        <DialogContent
          style={{
            backgroundColor: color,
            margin: "10px 0 10px 0",
            padding: "5px 15px 20px 15px",
            display:"flex",
            flexDirection:"column",
            justifyContent:"space-between"
          }}
        >
          <InputBase
            multiline
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={classes.customInput}
            style={{
              color: color === "#ffffff" ? "#000" : "#fff",
              minHeight:color === "#ffffff" ? "120px" : box ? "200px" : "120px",
            }}
            placeholder="What's on your mind Abu?"
          />
          <div style={{
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center"
          }}>
          <div
            className={classes.colorBoxButton}
            onClick={() => setBox(true)}
            style={{
              display: box ? "none" : "flex",
            }}
          >
            Aa
          </div>
          <div
            // className={classes.colorBoxButton}
            // onClick={() => setBox(true)}
            style={{
              display: box ? "none" : "flex",
            }}
          >
            <Mood size="small" style={{color:"#747577",fontSize:"30px",cursor:"pointer"}}/>
          </div>
          </div>
          <div
            className={classes.colorBoxSection}
            style={{
              display: box ? "flex" : "none",
            }}
          >
            <div
              className={classes.colorBox}
              style={{
                backgroundColor: "#ccc",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
              onClick={() => {setBox(false),setColor("#ffffff")}}
            >
              <ArrowBackIos size="small" />
            </div>
            {colors.map((item) => (
              <div
              key={item.color}
                className={classes.colorBox}
                style={{ backgroundColor: item.color }}
                onClick={() => setColor(item.color)}
              />
            ))}
          </div>
        </DialogContent>
        <div className={classes.addToPost}>
                <Typography
                className={classes.addToPostText}
                >Add to Your Post
                </Typography>
                <div className={classes.addToPostIcons}>
              {addIcons.map(item=>(

                <Tooltip
                key={item.title}
                  title={item.title}
                  classes={{ tooltip: classes.customWidth}}
                  placement="top"
                >
                <IconButton size="small" className={classes.addToPostIcon}>
                    {item.icon}
                  </IconButton>
                </Tooltip>
))}
                </div>
        </div>
        <div className={classes.postButtonBox}>
          <Button
            variant="contained"
            disabled={value.length <= 0}
            className={classes.postButton}
            onClick={handleAddPost}
          >
            post
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
