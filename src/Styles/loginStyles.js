import { makeStyles } from "@mui/styles";

const loginStyles = makeStyles({
  loginForm: {
    "& form": {
      width: "50%",
      margin: "50px auto",
      "& div": {
        width: "70%",
        margin: "0 auto",
        "& div": {
          width: "100%"
        }
      }
    },
    "& button": {
      width: "70%",
      margin: "0 auto",
      "& div": {
        width: "100%"
      }
    }
  },
  heading: {
    fontSize: "22px",
    fontWeight: "600",
    marginTop: "50px",
    letterSpacing: "1.5px"
  },
  adminLoginBtn: {
    width: "100px",
    position: "absolute",
    top: "40px",
    right: "60px"
  }
});

export default loginStyles;
