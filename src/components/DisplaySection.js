import PropTypes from "prop-types";
import displaySectionStyles from "../Styles/displaySectionStyles";
import InfoContainer from "./InfoContainer";
import SideBarComp from "./SideBarComp";

function DisplaySection(props) {
  const classes = displaySectionStyles();
  const menuItemsForManagement = ["Employee List", "KRA List", "Goal List", "Performance Report", "Settings"];
  const menuItemsForEngineers = ["Performance Report", "Appraisal Form"];
  const menuItemsForManager = ["Performance Report", "Appraisal Rating"];

  const { user } = props;
  const { role } = user;

  return (
    <div className={classes.mainContainer}>
      {role === "Management" && <SideBarComp menuItemsForSideBar={menuItemsForManagement} user={user} />}
      {role === "Manager" && <SideBarComp menuItemsForSideBar={menuItemsForManager} user={user} />}
      {role === "Engineer" && <SideBarComp menuItemsForSideBar={menuItemsForEngineers} user={user} />}
      <InfoContainer />
    </div>
  );
}

DisplaySection.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired
};

export default DisplaySection;
