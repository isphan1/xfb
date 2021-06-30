import React from "react";
import {
  Card,
  CardContent,
  makeStyles,
  Divider,
  Button,
  Typography,
  IconButton,
  useMediaQuery,
  InputBase,
  Tooltip,
  Grid,
} from "@material-ui/core";
import {
  MoreHoriz,
  Public,
  ThumbUpSharp,
  Favorite,
  ChatBubbleOutline,
  ThumbUp,
  ReplyOutlined,
  ArrowDropDown,
  InsertEmoticon,
  CameraAlt,
  GifSharp,
  PhotoSharp,
  EmojiEmotionsSharp,
} from "@material-ui/icons";
import SubComment from "../components/SubComment";

const useStyles = makeStyles((theme) => ({
  customWidth: {
    minWidth: "40px",
    minHeight: "30px",
    textAlign: "center",
    alignItems: "center",
    display: "flex",
    fontSize: "12px",
    padding: "2.5px 10px",
    marginTop: "5px",
  },
}));

export default function Comment({name,text,subComments}) {
  const classes = useStyles();

  return (
    <>
      <Grid container
        style={{
          display: "flex",
          alignItems: "flex-start",
          padding: "5px",
          position: "relative",
          marginTop:"15px"
        }}
      >
        <Grid item xs={1}>
        <img src="/lo.jpeg" width="36px" height="36px" />
        </Grid>
        <Grid item xs={11}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "7.5px",
              marginRight: "2.5px",
              backgroundColor: "#e9ebee",
              borderRadius: "10px",
              padding: "10px",
              paddingBottom: "0px",
            }}
          >
            <Typography style={{ fontWeight: "bold", fontSize: "14px" }}>
              {name}
            </Typography>
            <Typography style={{ fontSize: "14px", marginBottom: "-3px" }}>
              {text}
            </Typography>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  marginBottom: "-28px",
                }}
              >
                <span style={{ fontWeight: "bold", fontSize: "12px" }}>
                  Like
                </span>
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "12px",
                    margin: "0 5px",
                  }}
                >
                  Reply
                </span>
                <span style={{ fontSize: "12px" }}>2d</span>
              </div>
              <Tooltip
                title=

                  {<div style={{display:"flex",flexDirection:"column"}}>
                                  <ThumbUpSharp
                  size="small"
                  style={{
                    fontSize: "18px",
                    padding: "2.5px",
                    background: "#009cde",
                    color: "#fff",
                    borderRadius: "20px",
                    marginBottom:"5px"
                  }}
                />
                                <Favorite
                  size="small"
                  style={{
                    fontSize: "18px",
                    padding: "2.5px",
                    background: "#e03251",
                    color: "#fff",
                    borderRadius: "20px",
                  }}
                />
                </div>
                }
                classes={{ tooltip: classes.customWidth }}
                placement="bottom"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#fff",
                    padding: ".5px 2.5px",
                    borderRadius: "50px",
                    border: "1px solid #ccc",
                    marginBottom: "-12px",
                    boxShadow: "1px 1px 1px #ccc",
                    cursor: "pointer",
                  }}
                >
                  <ThumbUpSharp
                    style={{
                      fontSize: "15px",
                      padding: "2.5px",
                      background: "#009cde",
                      color: "#fff",
                      borderRadius: "20px",
                    }}
                    size="small"
                  />
                  <Favorite
                    style={{
                      fontSize: "15px",
                      padding: "2px",
                      background: "#e03251",
                      color: "#fff",
                      borderRadius: "20px",
                    }}
                    size="small"
                  />
                  <span style={{ fontSize: "13px", marginLeft: "2.5px" }}>
                    57
                  </span>
                </div>
              </Tooltip>
            </div>
          </div>
          <IconButton size="small">
            <MoreHoriz size="small" />
          </IconButton>
        </div>
        </Grid>
      </Grid>
      <div style={{margin:"15px 0 15px 40px"}}>
          {subComments.map(comment=>(
            <SubComment key={comment.text} subComment={comment}/>
          ))}
      </div>
    </>
  );
}
