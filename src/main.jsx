import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { Signup, Signin, CreateProfile, Home, UserPost } from "@/screens";
import "@/utils/firebase";
import Protected from "./utils/Protected/Protected";
import Navbar from "./components/Navbar/Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/createprofile",
    element: (
      <Protected>
        <CreateProfile />
      </Protected>
    ),
  },
  {
    path: "/homepage",
    element : (
      <Protected>
        <Home />
      </Protected>
    )
  },
  {
    path: "/posts",
    element : (
      <Protected>
        <UserPost />
      </Protected>
    )
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
