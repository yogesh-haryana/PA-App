/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import axios from "axios";
import { departmentArr } from "./Registration";
import TableListing from "./TableListing";
import AccordionListings from "./AccordianListing";

function DepartmentTabs(props) {
  const { eventClicked } = props;
  const [value, setValue] = useState("FE");
  const [usersData, setUsersData] = useState();
  const [isLoading, setIsLoding] = useState(false);

  const getDatabyDepartment = async () => {
    const resp = await axios.get(`http://localhost:8080/api/users/verified/${value}`);
    const { data } = resp;
    setUsersData(data);
    setIsLoding(false);
  };

  useEffect(() => {
    setIsLoding(true);
    getDatabyDepartment();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="basic tabs example">
            {departmentArr.map((dept) => (
              <Tab key={dept} label={dept} value={`${dept}`} />
            ))}
          </TabList>
        </Box>
        {departmentArr.map((dept) => (
          <TabPanel key={dept} value={`${dept}`}>
            {eventClicked === "Employee List" && (<TableListing usersData={usersData} isLoading={isLoading} />)}
            {eventClicked === "KRA List" && (<AccordionListings dept={value} />)}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
}

DepartmentTabs.propTypes = {
  eventClicked: PropTypes.string
};

DepartmentTabs.defaultProps = {
  eventClicked: "Employee List"
};

export default DepartmentTabs;
