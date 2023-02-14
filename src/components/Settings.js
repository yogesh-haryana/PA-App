/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from "react";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
import request from "../helpers/httpHelper";

function Settings() {
  const [toggle, setToggle] = useState();
  const [toggleId, setToggleId] = useState("");

  const getSetting = async () => {
    const resp = await axios.get("http://localhost:8080/api/settings");
    const { data } = resp;
    if (data.length === 1) {
      setToggle(data[0].toggle);
      setToggleId(data[0]._id);
    }
  };

  const updateSetting = async () => {
    if (toggleId) {
      const url = `http://localhost:8080/api/settings/${toggleId}`;
      const method = "PUT";
      const data = { toggle };
      await request(url, method, data);
    }
  };

  useEffect(() => {
    getSetting();
  }, []);

  useEffect(() => {
    updateSetting();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggle]);

  return (
    <div>
      Allow Engineers and Managers to fill the form for current FY-
      <FormControlLabel
        control={(
          <Switch
            checked={toggle}
            value={toggle}
            onChange={() => setToggle(!toggle)}
          />
        )}
      />
    </div>

  );
}

export default Settings;
