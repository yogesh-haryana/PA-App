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
  //   const sessionExpireTime = 60 * 60 * 1000; // one Hour
  // useEffect(() => {
  //   localStorage.setItem("lastActiveTime", Date.now());
  // }, [userData]);

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
      <DisplaySection user={user} />
    </>
  );
}

export default Dashboard;
