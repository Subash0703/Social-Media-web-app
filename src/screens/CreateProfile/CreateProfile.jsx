import { useState } from "react";
import { Input, Button, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { storage, db } from "@/utils/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

import logo from "@/assets/Media/logo2.png";
import "./CreateProfile.css";

const CreateProfile = () => {
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState({});
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");

  const navigate = useNavigate();

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const onUploadFileChange = ({ file }) => {
    setImage(file);
  };

  const handleSubmit = async () => {
    try {
      const uid = localStorage.getItem("USER");
      const profileImgRef = ref(storage, `profile/${uid}`);
      const snapshot = uploadBytes(profileImgRef, image.originFileObj);
      console.log("snapshot", snapshot);
      const docRef = await addDoc(collection(db, "users"), {
        uid,
        name,
        username,
        mobile,
      });
      navigate("/homepage");
    } catch (error) {
      console.log(error);
      alert(`${error.code} - ${error.message}`);
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen profile-container">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8 profile-form">
          <div className="flex justify-center items-center">
            <img src={logo} alt="logo" className="logo" />
          </div>
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold mb-4">Create Profile</h1>
            <Upload
              fileList={[image]}
              name="avatar"
              listType="picture-circle"
              className="avatar-uploader"
              onChange={onUploadFileChange}
            >
              {!image?.originFileObj ? uploadButton : null}
            </Upload>
          </div>
          <div className="mb-4">
            <Input
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
              className="profile-input"
            />
          </div>
          <div className="mb-4">
            <Input
              placeholder="User Name"
              onChange={(e) => setUsername(e.target.value)}
              className="profile-input"
            />
          </div>

          <div className="mb-4">
            <Input
              placeholder="Mobile"
              onChange={(e) => setMobile(e.target.value)}
              className="profile-input"
            />
          </div>
          <div className="text-center">
            <Button type="primary" loading={isLoading} onClick={handleSubmit}>
              Explore
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
