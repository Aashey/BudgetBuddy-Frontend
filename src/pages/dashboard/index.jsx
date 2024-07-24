import React from "react";
import { logout } from "../../services/auth";
import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const onLogout = () => {
    logout();
    setTimeout(() => {
      message.success("Logged out successfully.");
      navigate("/login");
    }, [500]);
  };
  return (
    <div>
      Dashboard
      <Button onClick={onLogout}>Logout</Button>
    </div>
  );
};

export default Dashboard;
