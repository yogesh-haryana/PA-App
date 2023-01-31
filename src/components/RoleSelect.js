import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { selectRole, setRoleStatus } from "../Redux/actions";

function RoleSelect() {
  const selectRef = useRef("");
  const dispatch = useDispatch();

  const onSelectRole = () => {
    const { value } = selectRef.current;
    if (value.trim() === "engineer") {
      dispatch(setRoleStatus(true));
    } else {
      dispatch(setRoleStatus(false));
    }
    dispatch(selectRole(value));
  };
  return (
    <div>
      <select ref={selectRef} onChange={onSelectRole}>
        <option value="">Select</option>
        <option value="admin">Administration</option>
        <option value="manager">Manager</option>
        <option value="engineer">Engineer</option>
      </select>
    </div>
  );
}

export default RoleSelect;
