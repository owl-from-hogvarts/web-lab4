import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Intersector from "./routes/intersector/intersector";
import { Global } from "@emotion/react";
import { rounded, topElementStyles, globalDefaults } from "./styles/globalStyles";
import Login from "./routes/login";
import Signin from "./routes/signin";
import fonts from "./styles/fonts";
import Root from "./Root";
import ErrorDisplayer from "./routes/error";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Intersector />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "forbidden",
        element: <ErrorDisplayer />
      }
    
    ],
  },
]);

export default function App() {  
  return (
    <React.StrictMode>
      <Global styles={fonts} />
      <Global styles={globalDefaults} />
      <Global styles={topElementStyles} />
      <Global styles={rounded} />
        <RouterProvider router={router} />
    </React.StrictMode>
  );
}
