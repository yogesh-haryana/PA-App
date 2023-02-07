import React, { useState } from "react";
import SelectComp from "../helpers/SelectComp";

function PerformanceReport() {
  const [selectFY, setSelectFY] = useState("");

  const selectHandler = (e) => {
    setSelectFY(e.target.value);
  };

  const options = [2020, 2021, 2022];
  return (
    <div>
      <SelectComp name="fy" handler={selectHandler} formErrors="" value={selectFY} options={options} label="Select financial year" />
    </div>
  );
}

export default PerformanceReport;
