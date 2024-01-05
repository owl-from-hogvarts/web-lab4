import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";

const Banner = styled.div`
  font-size: 3.5rem;
`;

const BannerContainer = styled.div`
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function ErrorBanner() {
  return (
    <BannerContainer>
      <Banner>Forbidden</Banner>
      <Link to="/">Back</Link>
    </BannerContainer>
  );
}
