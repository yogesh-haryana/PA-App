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
  }
});

export default loginStyles;
