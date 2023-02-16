import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import NavBar from "./NavBar";
import DisplaySection from "./DisplaySection";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    }
  });

  const logOutUser = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <NavBar name={user?.fullName} logOutUser={logOutUser} />
      <DisplaySection user={user} />
    </>
  );
}

export default Dashboard;
