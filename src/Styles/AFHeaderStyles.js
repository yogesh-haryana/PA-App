import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  headerContainer: {
    textAlign: "start",
    padding: "10px"
  },
  heading1: {
    fontSize: "17px",
    fontWeight: 700
  },
  heading2: {
    fontSize: "13px",
    fontWeight: 500
  },
  flexDetails: {
    display: "flex"
  },
  flexControl: {
    width: "33.33%",
    paddingLeft: "10px",
    "& p": {
      fontSize: "15px",
      fontWeight: 700
    },
    "& span": {
      fontSize: "12px",
      fontWeight: 400
    }
  },
  self: {
    fontSize: "18px",
    fontWeight: 600
  },
  rating: {
    width: "70%",
    display: "flex",
    justifyContent: "space-around",
    "& div": {
      width: "50%"
    }
  },
  KraVsGoals: {
    display: "flex",
    justifyContent: "space-around",
    "& div": {
      width: "50%",
      fontWeight: 700
    }
  }

});

export default useStyles;
