import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import displaySectionStyles from "../Styles/displaySectionStyles";
import InfoContainer from "./InfoContainer";
import SideBarComp from "./SideBarComp";

function DisplaySection(props) {
  const classes = displaySectionStyles();
  const [isFormAvaliable, setFormAvailable] = useState();
  const menuItemsForManagement = ["Employee List", "KRA List", "Goal List", "Performance Report", "Settings"];
  const menuItemsForEngineersOn = ["Performance Report", "Appraisal Form"];
  const menuItemsForManagerOn = ["Performance Report", "Appraisal Rating"];
  const menuItemsForEngineersOff = ["Performance Report"];
  const menuItemsForManagerOff = ["Performance Report"];

  const getSetting = async () => {
    const resp = await axios.get("http://localhost:8080/api/settings");
    const { data } = resp;
    if (data.length === 1) {
      setFormAvailable(data[0].toggle);
    }
  };

  useEffect(() => {
    getSetting();
  }, []);

  const { user } = props;
  const { role } = user;

  return (
    <div className={classes.mainContainer}>
      {role === "Management" && <SideBarComp menuItemsForSideBar={menuItemsForManagement} user={user} />}
      {role === "Manager" && <SideBarComp menuItemsForSideBar={isFormAvaliable ? menuItemsForManagerOn : menuItemsForManagerOff} user={user} />}
      {role === "Engineer" && <SideBarComp menuItemsForSideBar={isFormAvaliable ? menuItemsForEngineersOn : menuItemsForEngineersOff} user={user} />}
      <InfoContainer />
    </div>
  );
}

DisplaySection.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired
};

export default DisplaySection;
