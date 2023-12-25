import styled from '@emotion/styled';
import React, { useEffect } from 'react'
import Header from './routes/header';
import { Outlet, useNavigate } from 'react-router-dom';
import { setupInterceptors } from './api/api';

const Main = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem 0.5rem;
`;

export default function Root() {
  const nav = useNavigate()
  useEffect(() => setupInterceptors(nav), [])
  
  return (
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
  )
}
