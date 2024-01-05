import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Intersector from "./routes/intersector/intersector";
import { Global } from "@emotion/react";
import {
  rounded,
  topElementStyles,
  globalDefaults,
} from "./styles/globalStyles";
import Login from "./routes/auth/login";
import Signin from "./routes/auth/signin";
import fonts from "./styles/fonts";
import Root from "./Root";
import ErrorBanner from "./routes/errors/error-banner";
import { GlobalErrorProvider } from "./hooks/useGlobalErrors";
import GlobalErrorsDisplayer from "./routes/errors/global-errors";

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
        element: <ErrorBanner />,
      },
    ],
  },
]);

export default function App() {
  return (
    <React.StrictMode>
      <GlobalErrorProvider>
        <Global styles={fonts} />
        <Global styles={globalDefaults} />
        <Global styles={topElementStyles} />
        <Global styles={rounded} />
        <RouterProvider router={router} />
        <GlobalErrorsDisplayer />
      </GlobalErrorProvider>
    </React.StrictMode>
  );
}
