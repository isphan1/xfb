import {
  Button,
  Dialog,
  Divider,
  makeStyles,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  MenuItem,
  Select,
  Radio,
  IconButton,
  InputAdornment,
  Tooltip,
  ClickAwayListener,
} from "@material-ui/core";

import { Close, Error, FormatListNumbered, YoutubeSearchedFor } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0px",
    backgroundColor: "rgba(255,255,255,.5)",
  },
  paper: {
    width: "450px",
    height: "auto",
    padding: "10px 0",
    borderRadius: "5px",
    boxShadow: "1px 4px 3px #635e5e",
    "@media (max-width: 600px)": {
      width: "100%",
      height: "100%",
      padding: "30px 0",
    },
  },
  inputField: {
    "& .MuiOutlinedInput-input": {
      padding: "10px 14px",
    },
    "& .Mui-focused": {
      outline: "0",
    },
  },
  formControl: {
    width: "31%",
    "& .MuiSelect-select.MuiSelect-select": {
      padding: "7.5px 10px",
      fontSize: "14px",
    },
  },
  selectEmpty: {
    fontSize: "15px",
  },
  formControlLabel: {
    display: "flex",
    justifyContent: "space-between",
    padding: "2.5px 10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "31%",
    margin: "0",
    "& .MuiFormControlLabel-root": {
      margin: "0",
    },
    "& .MuiTypography-body1": {
      fontSize: "14px",
    },
  },
  submitButton: {
    backgroundColor: "#37a000",
    color: "#fff",
    textTransform: "capitalize",
    textAlign: "center",
    width: "50%",
    fontSize: "20px",
    fontWeight: "500",
    padding: "0",
    marginLeft: "25%",
    marginBottom: "10px",
    "&:hover": {
      backgroundColor: "#13b24e",
    },
    "@media (max-width: 600px)": {
      width: "60%",
      fontSize: "18px",
      marginLeft: "20%",
      fontWeight: "500",
    },
  },
  customTooltip:{
    height:"40px",
    backgroundColor:"#be4b49",
    display:"flex",
    alignItems:"center",
    fontSize:"13px",
    color:"#fff",
    fontWeight:"400",
    borderRadius:"4px",
    padding:"5px 20px",
    borderTop:"1px solid #7d7a7a",
    borderBottom:"1px solid #7d7a7a",
    borderLeft:"1px solid #7d7a7a",

  },
  arrow: {
    fontSize:"20px",
    "&::before": {
      backgroundColor: "#be4b49",
    }
  }
}));

const SingUp = ({ openSingUp, handleCloseSingUp }) => {
  const classes = useStyles();

  const schema = yup.object().shape({
    firstName: yup.string().required(),
    username: yup.string().min(3).required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    // resolver: yupResolver(schema)
  });

  const [open, setOpen] = React.useState(false);

  const [day, setDay] = React.useState("");
  const [month, setMonth] = React.useState("");
  const [year, setYear] = React.useState("");

  const [value, setValue] = React.useState("");

  const handleChangeDay = (event) => {
    setDay(event.target.value);
  };

  const handleChangeMonth = (event) => {
    setMonth(event.target.value);
  };

  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };

  const handleChangeRadio = (event) => {
    setValue(event.target.value);
  };

  const onSubmit = (data) => {
    console.log(data, day, month, year);
    reset({});
    handleCloseSingUp();
  };

  const handleOpenTooltip = () =>{
    if(errors.firstName){
      setOpen(true)
    }
  }

  const handleCloseTooltip = () =>{
    if(errors.firstName){
      setOpen(false)
    }
  }

  return (
    <Dialog
      fullScreen
      open={openSingUp}
      //   onClose={handleCloseSingUp}
      classes={{ root: classes.root, paper: classes.paper }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: "0 20px",
        }}
      >
        <div
          style={{
            display: "column",
          }}
        >
          <Typography style={{ fontSize: "30px", fontWeight: "700" }}>
            Sing Up
          </Typography>
          <Typography style={{ fontSize: "14px" }}>
            It's quick and easy.
          </Typography>
        </div>
        <IconButton size="small">
          <Close
            size="small"
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleCloseSingUp(), reset({});
            }}
          />
        </IconButton>
      </div>
      <Divider style={{ margin: "20px 0" }} />
      <div
        style={{
          padding: "0 20px",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <ClickAwayListener onClickAway={handleCloseTooltip}>

        <Tooltip 
            title="What's your name?"
            arrow
            // PopperProps={{
            //   disablePortal: true,
            // }}
            placement="left"
            classes={{ tooltip: classes.customTooltip , arrow: classes.arrow }}
            open={open}
            onClose={handleCloseTooltip}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            >
          <TextField
            variant="outlined"
            focused={false}
            onClick={handleOpenTooltip}
            placeholder="First name"
            {...register("firstName", { required: true, minLength: 3 })}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="start"
                  style={{
                    display: errors.firstName ? "flex" : "none",
                    marginRight: "-10px",
                  }}
                >
                  <Error style={{ color: "#be4b49" }} />
                </InputAdornment>
              ),
            }}
            className={classes.inputField}
            style={{
              width: "48.5%",
              marginRight: "1.5%",
              borderRadius: "6px",
              border: errors.firstName ? "1px solid #be4b49" : "inherit",
            }}
          />
          </Tooltip>
          </ClickAwayListener>
          <TextField
            variant="outlined"
            focused={false}
            placeholder="username"
            {...register("username", { required: true, minLength: 3 })}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="start"
                  style={{
                    display: errors.username ? "flex" : "none",
                    marginRight: "-10px",
                  }}
                >
                  <Error style={{ color: "#be4b49" }} />
                </InputAdornment>
              ),
            }}
            className={classes.inputField}
            style={{
              width: "48.5%",
              marginLeft: "1.5%",
              borderRadius: "4px",
              border: errors.username ? "1px solid #be4b49" : "inherit",
            }}
          />
          <TextField
            variant="outlined"
            focused={false}
            placeholder="Mobile number or email address"
            fullWidth
            className={classes.inputField}
            style={{ margin: "10px 0" }}
          />
          <TextField
            variant="outlined"
            focused={false}
            placeholder="New password"
            fullWidth
            className={classes.inputField}
            style={{ margin: "0 0 10px 0" }}
          />

          <div
            style={{
              margin: "0 0 10px 0",
            }}
          >
            <Typography style={{ fontSize: "12px", color: "#5f5d5d" }}>
              Date of birth
            </Typography>

            <FormControl
              variant="outlined"
              className={[classes.formControl]}
              style={{
                marginRight: "1.75%",
              }}
            >
              {/* <InputLabel
                shrink
                style={{
                  marginLeft: "-15px",
                }}
              >
                Date of birth
              </InputLabel> */}
              <Select
                value={day}
                onChange={handleChangeDay}
                displayEmpty
                className={classes.selectEmpty}
              >
                <MenuItem value="">
                  <em>Day</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              variant="outlined"
              className={[classes.formControl]}
              style={{
                margin: " 0 1.75%",
              }}
            >
              <Select
                value={month}
                onChange={handleChangeMonth}
                displayEmpty
                className={classes.selectEmpty}
              >
                <MenuItem value="">
                  <em>Month</em>
                </MenuItem>
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              variant="outlined"
              className={[classes.formControl]}
              style={{
                marginLeft: "1.75%",
              }}
            >
              <Select
                value={year}
                onChange={handleChangeYear}
                displayEmpty
                className={classes.selectEmpty}
              >
                <MenuItem value="">
                  <em>Year</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
          <FormControl
            style={{
              width: "100%",
            }}
          >
            <Typography style={{ fontSize: "12px", color: "#5f5d5d" }}>
              Gender
            </Typography>{" "}
            <RadioGroup
              value={value}
              onChange={handleChangeRadio}
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <FormControlLabel
                className={[classes.formControlLabel]}
                style={{
                  marginRight: "1.75%",
                }}
                labelPlacement="start"
                value="male"
                control={
                  <Radio
                    color="primary"
                    style={{ padding: "2px 0" }}
                    size="small"
                  />
                }
                label="Male"
              />
              <FormControlLabel
                className={[classes.formControlLabel]}
                style={{
                  margin: "0px 1.75%",
                }}
                labelPlacement="start"
                value="female"
                control={
                  <Radio
                    color="primary"
                    style={{ padding: "2px 0" }}
                    size="small"
                  />
                }
                label="Female"
              />
              <FormControlLabel
                className={[classes.formControlLabel]}
                style={{
                  marginLeft: "1.75%",
                }}
                labelPlacement="start"
                value="common"
                control={
                  <Radio
                    color="primary"
                    style={{ padding: "2px 0" }}
                    size="small"
                  />
                }
                label="Common"
              />
            </RadioGroup>
          </FormControl>

          <Typography
            style={{
              fontSize: "11px",
              margin: "10px 0 20px 0",
            }}
          >
            By clicking Sign Up, you agree to our Terms, Data Policy and Cookie
            Policy. You may receive SMS notifications from us and can opt out at
            any time.
          </Typography>
          <Button
            type="submit"
            variant="contained"
            className={classes.submitButton}
          >
            Sing Up
          </Button>
        </form>
      </div>
    </Dialog>
  );
};

export default SingUp;
