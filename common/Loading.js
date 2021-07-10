import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { Card, makeStyles, CardHeader, CardContent } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: "20px",
    marginBottom: "20px",
  },
}));

export default function Loading() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}
      >
        <Skeleton variant="circle" width="40px" height="40px" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginLeft: "20px",
            width:"80%"
          }}
        >
          <Skeleton variant="text" width="80%" height="25px" />
          <Skeleton variant="text" width="50%" height="15px" />
        </div>
      </div>
      <Skeleton variant="rect" width="100%" height="200px" />
      <div
        style={{
          marginTop: "15px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Skeleton variant="text" width="20%" height="30px" />
        <Skeleton variant="text" width="20%" height="30px" />
        <Skeleton variant="text" width="20%" height="30px" />
      </div>
      <div
        style={{
          marginTop: "15px",
          display: "flex",
          flexDirection:"column"
        }}
      >
        <Skeleton variant="text" width="100%" height="20px" />
        <Skeleton variant="text" width="70%" height="15px" />

      </div>
    </Card>
  );
}
