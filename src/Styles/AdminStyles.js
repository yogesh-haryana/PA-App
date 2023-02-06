import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  mainContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  dataContainer: {
    width: "40%",
    marginTop: "20px",
    marginBottom: "20px"

  },
  allDetails: {
    height: "70%",
    // textAlign: "left",
    padding: "10px"
  },
  buttonsContainer: {
    marginTop: "40px"
  }
});

export default useStyles;
