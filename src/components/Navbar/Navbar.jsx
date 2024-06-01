import React from "react";
import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "@/assets/Media/logo2.png";

const Navbar = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();
  const handlePost = () => {
    navigate("/posts");
  };
  const onSignout = () => {
    try {
      localStorage.clear("USER");
      const key = "updatable";
      messageApi.open({
        key,
        type: "loading",
        content: "Logging out....",
      });

      setTimeout(() => {
        messageApi.open({
          key,
          type: "success",
          content: "Logged out!",
          duration: 2,
        });
        navigate("/signin");
      }, 1000);
    } catch (error) {
      alert("Something Went Wrong !!");
    }
  };

  return (
    <div className="bg-black px-8 flex flex-col md:flex-row justify-between items-center head-container">
      <img src={logo} alt="logo" className="logo" />
      <div className="flex gap-4 md:gap-12 items-center w-full md:w-auto justify-center md:justify-end">
        <Button type="primary" onClick={handlePost} className="w-full md:w-auto">
          View Posts
        </Button>
        <Button type="primary" danger onClick={onSignout} className="w-full md:w-auto">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
