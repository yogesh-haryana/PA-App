import { makeStyles } from "@mui/styles";

const registrationStyles = makeStyles({
  heading: {
    width: "50%",
    textAlign: "left",
    margin: "40px auto 0 auto",
    fontSize: "30px",
    fontWeight: 600
  },
  signUpComp: {
    "& hr": {
      width: "50%",
      fontSize: "xx-large"
    },
    "& form": {
      width: "50%",
      margin: "50px auto",
      "& div": {
        width: "70%",
        margin: "0 auto",
        "& div": {
          width: "100%",
          "& div": {
            textAlign: "initial"
          }
        }
      }
    }
  },
  buttonsContainer: {

  }
});

export default registrationStyles;
