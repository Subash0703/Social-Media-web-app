import React, { useState } from "react";
import { Input, Button, message, FloatButton, Modal } from "antd";
import UserCard from "@/components/UserCard/UserCard";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { db } from "@/utils/firebase";
import { collection, addDoc } from "firebase/firestore";
import Navbar from "../../components/Navbar/Navbar";

const { Search } = Input;

const Home = () => {
  const navigate = useNavigate();
  const [searchUser, setSearchUSer] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("");
  const [posttitle, setPosttitle] = useState("");
  const [postcontent, setPostcontent] = useState("");

 

  const handleSearchClick = (e) => {
    const searchUser = e.target.value;
    setSearchUSer(searchUser);
  };

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = async () => {
    try {
      setModalText("Posting.....");
      setLoading(true);
      setTimeout(() => {
        setOpen(false);
        setLoading(false);
      }, 2000);
      const uid = localStorage.getItem("USER");
      const docRef = await addDoc(collection(db, "posts"), {
        uid,
        posttitle,
        postcontent,
      });
      setPosttitle("");
      setPostcontent("");
      setTimeout(() => {
        setOpen(false);
        setLoading(false);
        setModalText("");
      }, 2000);
    } catch (error) {
      console.log(error);
      alert(`${error.code} - ${error.message}`);
    }
  };
  const handleCancel = () => {
    setOpen(false);
  };
 

  return (
    <>
      <Navbar />
      <div className="max-w-[520px] mx-auto p-5">
        <Search
          placeholder="@username"
          enterButton="Search"
          size="large"
          className="p-5"
          value={searchUser}
          onChange={handleSearchClick}
        />
        <FloatButton onClick={showModal} type="primary" icon={<IoMdAdd />} />
        <Modal
          title="Create New Post"
          centered
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          footer={[
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={handleOk}
            >
              Submit
            </Button>,
          ]}
        >
          <form className="flex flex-col gap-10 mt-5">
            <input
              type="text"
              placeholder="POST TITLE"
              className="p-3 outline-none border-b-2 border-blue-400 mx-8"
              value={posttitle}
              onChange={(e) => setPosttitle(e.target.value)}
            />
            <textarea
              placeholder="POST CONTENT"
              rows={2}
              cols={1}
              className="p-3 outline-none border-b-2 border-blue-400 mx-8 mb-5"
              value={postcontent}
              onChange={(e) => setPostcontent(e.target.value)}
            />
          </form>
        </Modal>
      </div>
      <div className="p-5 mx-auto gap-12">
        <UserCard searchUser={searchUser} />
      </div>
    </>
  );
};

export default Home;
