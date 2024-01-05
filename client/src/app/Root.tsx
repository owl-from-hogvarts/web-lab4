import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import Header from "./routes/header";
import { Outlet, useNavigate } from "react-router-dom";
import { setupInterceptors } from "./api/api";
import { LogoutButton } from "./components/logoutButton";
import useGlobalErrors from "./hooks/useGlobalErrors";

const Main = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem 0.5rem;
  height: 100%;
`;

export default function Root() {
  const [isInterceptorReady, setReady] = useState(false);

  const nav = useNavigate();
  const { put } = useGlobalErrors();
  useEffect(() => {
    const cleanup = setupInterceptors(nav, put);
    setReady(true)
    return cleanup;
  }, []);

  return (
    <>
      <Header
        name={{ first: "Костя", last: "Тернавский" }}
        group="P3206"
        variant={1910}
      >
        <LogoutButton />
      </Header>
      <Main>
        {isInterceptorReady && <Outlet />}
      </Main>
    </>
  );
}
