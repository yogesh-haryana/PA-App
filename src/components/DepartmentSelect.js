import React, { useRef } from "react";
import PropTypes from "prop-types";

function DepartmentSelect(props) {
  const {
    styleClass, formDetails, setFormDetails, errormsg, handleSelectBlur, setErrorMsg
  } = props;
  const departmentRef = useRef("");

  const onSelectDept = () => {
    const { value } = departmentRef.current;
    setFormDetails((prevState) => ({
      ...prevState,
      department: value
    }));
    if (value) {
      setErrorMsg((prevState) => ({
        ...prevState,
        department: ""
      }));
    }
  };
  return (
    <div className={styleClass}>
      <label htmlFor="department">Department</label>
      <select id="department" ref={departmentRef} onChange={onSelectDept} onBlur={(e) => handleSelectBlur(e)} value={formDetails.department}>
        <option value="">Select</option>
        <option value="FE">FE</option>
        <option value="BE">BE</option>
        <option value="QA">QA</option>
        <option value="Devops">Devops</option>
        <option value="HR">HR</option>
        <option value="Operation">Operation</option>
        <option value="IT">IT</option>
      </select>
      <span>{errormsg}</span>
    </div>
  );
}

DepartmentSelect.propTypes = {
  styleClass: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  formDetails: PropTypes.object.isRequired,
  setFormDetails: PropTypes.func.isRequired,
  errormsg: PropTypes.string.isRequired,
  handleSelectBlur: PropTypes.func.isRequired,
  setErrorMsg: PropTypes.func.isRequired
};

DepartmentSelect.defaultProps = {
  styleClass: "inputContainer"
};

export default DepartmentSelect;
