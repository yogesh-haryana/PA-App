import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAppraisalStatus } from "../Redux/actions";
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
  const dispatch = useDispatch();

  const getSetting = async () => {
    const resp = await axios.get("http://localhost:8080/api/settings");
    const { data } = resp;
    const d = new Date();
    const year = d.getFullYear();
    if (data.length === 1) {
      if (year === data[0].fy) {
        setFormAvailable(data[0].toggle);
        dispatch(setAppraisalStatus(data[0]));
      }
    }
  };

  useEffect(() => {
    getSetting();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { user } = props;
  const { role } = user;

  return (
    <div className={classes.mainContainer}>
      {role === "Management" && <SideBarComp menuItemsForSideBar={menuItemsForManagement} user={user} />}
      {role === "Manager" && <SideBarComp menuItemsForSideBar={isFormAvaliable ? menuItemsForManagerOn : menuItemsForManagerOff} user={user} />}
      {role === "Engineer" && <SideBarComp menuItemsForSideBar={isFormAvaliable ? menuItemsForEngineersOn : menuItemsForEngineersOff} user={user} />}
      <InfoContainer user={user} />
    </div>
  );
}

DisplaySection.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired
};

export default DisplaySection;
