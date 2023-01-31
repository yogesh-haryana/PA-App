import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { selectDesig } from "../Redux/actions";

function DesignationSelect() {
  const selectDesignation = useRef("");
  const dispatch = useDispatch();

  const onselectDesignation = () => {
    const { value } = selectDesignation.current;
    dispatch(selectDesig(value));
  };
  return (
    <div>
      <select ref={selectDesignation} onChange={onselectDesignation}>
        <option value="">Select</option>
        <option value="Project Lead">Project Lead</option>
        <option value="Sr Software Engineer">Sr Software Engineer</option>
        <option value="Software Engineer">Software Engineer</option>
        <option value="Software Trainee">Software Trainee</option>
      </select>

    </div>
  );
}

export default DesignationSelect;
