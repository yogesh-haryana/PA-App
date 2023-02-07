import {
  Sidebar, Menu, MenuItem
} from "react-pro-sidebar";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import useStyles from "../Styles/SideBarStyles";

function SideBarComp(props) {
  const classes = useStyles();
  const { menuItemsForSideBar } = props;
  return (
    <Sidebar className={classes.sideBarContainer}>
      <Menu>
        {menuItemsForSideBar.map((elem) => (<MenuItem key={elem} component={<NavLink to={`/dashboard/?event=${elem}`} />}>{elem}</MenuItem>))}
      </Menu>
    </Sidebar>
  );
}

SideBarComp.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  menuItemsForSideBar: PropTypes.array.isRequired
  // eslint-disable-next-line react/forbid-prop-types
  // user: PropTypes.object.isRequired
};

export default SideBarComp;
