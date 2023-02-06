import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

function Dashboard() {
  const { userData, setUserData } = useState();
  const navigate = useNavigate();
  //   const sessionExpireTime = 60 * 60 * 1000; // one Hour

  const user = JSON.parse(localStorage.getItem("user"));

  const logOutUser = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  //   useEffect(() => {
  //     localStorage.setItem("lastActiveTime", Date.now());
  //   }, [userData]);

  //   useEffect(() => {
  //     const lastActiveTime = localStorage.getItem("lastActiveTime");
  //     if (lastActiveTime) {
  //       const elapsedTime = Date.now() - lastActiveTime;
  //       if (elapsedTime > sessionExpireTime) {
  //         logOutUser();
  //       }
  //     }
  //   });

  return (
    <>
      <NavBar name={user?.fullName} logOutUser={logOutUser} />
      <SideBar />
    </>
  );
}

export default Dashboard;
