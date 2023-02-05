import React, { useState, useEffect } from "react";
import axios from "axios";
import useStyles from "../Styles/AdminStyles";
import SelectComp from "../helpers/SelectComp";

const initialState = {
  role: "",
  designation: ""
};

const initialErrs = {
  role: "",
  designation: ""
};
function Admin() {
  const classes = useStyles();
  const [fetchedData, setFetchedData] = useState([]);
  const [selectData, setSelectData] = useState(initialState);
  const [formErrors, setFormErrors] = useState(initialErrs);
  const rolesArr = ["Management", "Manager", "Engineer"];
  const desigArr = ["Project Lead", "Sr Software Engineer", "Software Engineer", "Software Trainee"];

  const handler = (e, index) => {
    console.log(index);
    const { name, value } = e.target;
    setSelectData({ ...selectData, [name]: value });
    if (value) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const fatchDataToVerify = async () => {
    const response = await axios.get("http://localhost:8080/api/users/");
    const { data } = response;
    setFetchedData(data);
  };

  useEffect(() => {
    fatchDataToVerify();
  }, []);

  const deleteProfile = async (ind) => {
    const targetElement = fetchedData[ind];
    const { _id } = targetElement;
    await axios.delete(`http://localhost:8080/api/users/${_id}`);
  };

  const verifyAndDeleteProfile = async (ind) => {
    const targetElement = fetchedData[ind];
    const {
      fullName, email, empId, officeLoc, department, password
    } = targetElement;
    const dataToBePost = {
      fullName,
      email,
      empId,
      officeLoc,
      department,
      password,
      role: selectData.role,
      designation: selectData?.designation
    };
    await fetch("http://localhost:8080/api/users/verified", {
      method: "post",
      body: JSON.stringify(dataToBePost),
      headers: {
        "Content-Type": "application/json"
      }
    });
  };

  return (
    <div>
      {fetchedData.map((item, index) => (
        // eslint-disable-next-line no-underscore-dangle
        <div key={item._id}>
          <div className={classes.allDetails}>
            <p>
              Full Name -
              {" "}
              {item?.fullName}
            </p>
            <p>
              {" "}
              Email -
              {" "}
              {item?.email}
            </p>
            <p>
              {" "}
              Employee Id -
              {" "}
              {item?.empId}
            </p>
            <p>
              {" "}
              Office Location -
              {" "}
              {item?.officeLoc}
            </p>
            <p>
              Department -
              {" "}
              {item?.department}
            </p>
            <div>
              Role -
              {" "}
              <SelectComp label="role" name="role" value={selectData.role} formErrors={formErrors?.role} handler={(e) => handler(e, index)} options={rolesArr} />
            </div>
            {selectData.role === "Engineer" && (
              <div>
                designation -
                {" "}
                <SelectComp label="designation" name="designation" value={selectData.designation} formErrors={formErrors?.designation} handler={(e) => handler(e, index)} options={desigArr} />
              </div>
            )}
          </div>
          <button type="button" onClick={() => deleteProfile(index)}>Remove</button>
          <button type="button" onClick={() => verifyAndDeleteProfile(index)}>Verify</button>
        </div>
      ))}
    </div>
  );
}

export default Admin;
