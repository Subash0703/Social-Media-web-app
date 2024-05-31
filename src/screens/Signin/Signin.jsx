import { useState } from "react";
import { Input, Button } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const onSignin = async (user) => {
    try {
      setIsLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("USER",userCredential.user.uid);
      navigate("/homepage");
    } catch (error) {
      console.log(error);
      alert(`${error.code} - ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Sign in</h1>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <Input
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <Input.Password
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-center">
            <Button type="primary" onClick={onSignin} loading={isLoading}>
              Sign in
            </Button>
            <br />
            <Button type="link" onClick={() => navigate("/")}>Sign Up</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;