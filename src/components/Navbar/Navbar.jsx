import React from "react";
import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";

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
    <div>
      <div className="bg-black p-8 flex justify-between">
        <h1 className="text-5xl text-white">STARCHAT</h1>
        <div className="flex gap-12 items-center">
          <Button type="primary" onClick={handlePost}>
            View Posts
          </Button>
          <Button type="primary" danger onClick={onSignout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
