import React from "react";
import { createBrowserRouter, RouterProvider, Outlet, redirect } from "react-router-dom";
import Intersector from "./routes/intersector/intersector";
import { Provider } from "react-redux";
// import { store } from "./store/store";
import { Global } from "@emotion/react";
import { rounded, topElementStyles, globalDefaults } from "./styles/globalStyles";
import Login from "./routes/login";
import Signin from "./routes/signin";
import Header from "./routes/header";
import fonts from "./styles/fonts";
import styled from "@emotion/styled";
import ProtectedRoute from "./components/protected";
import axios from "axios";
import { AreaCheckResult } from "old/display-points";

const Main = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem 0.5rem;
`;

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header
          name={{ first: "Костя", last: "Тернавский" }}
          group="P3206"
          variant={1910}
        />
        <Main>
          <Outlet />
        </Main>
      </>
    ),

    children: [
      {
        path: "",
        element: <Intersector />,
        loader: async () => {
           return (await axios.get("/points")).data as AreaCheckResult[]
        }
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signin",
        element: <Signin />,
      },
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
