import { useState } from "react";
import { Input, Button } from "antd";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import logo from "@/assets/Media/logo2.png";

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignup = async () => {
    try {
      setIsLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      localStorage.setItem("USER", userCredential.user.uid);
      navigate("/createprofile");
    } catch (error) {
      console.log(error);
      alert(`${error.code} - ${error.message}`);
    } finally {
      setIsLoading(false);
      console.log(setPassword);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen signup-container">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8 signup-form">
          <div className="flex justify-center items-center">
            <img src={logo} alt="logo" className="logo" />
          </div>
          <div className="mb-4">
            <h1 className="text-2xl font-bold mb-4 text-black pb-4 text-center">
              Sign Up
            </h1>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <Input
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="signup-input"
              autoComplete="off"
              autoFocus={false}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <Input.Password
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="signup-input"
              autoComplete="off"
              autoFocus={false}
            />
          </div>
          <div className="text-center flex justify-center items-center flex-row gap-6">
            <Button type="primary" onClick={onSignup} loading={isLoading}>
              Sign Up
            </Button>
            <br />
            <Button
              type="link"
              className="bg-white hover:bg-gray-600"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
