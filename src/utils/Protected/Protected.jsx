import React from "react";
import { Navigate} from "react-router-dom";

const Protected = ({children}) => {
  const auth = localStorage.getItem("USER")
  return auth ? <>{children}</> : <Navigate to="/" />; 
};

export default Protected;
