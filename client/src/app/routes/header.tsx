import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useIsAuthorized } from "app/hooks/user";
import { colors } from "app/styles/colors";
import { fantasyFontName } from "app/styles/fonts";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export type HeaderProps = React.PropsWithChildren<{
  name: {
    first: string;
    last: string;
  };
  group: string;
  variant: number;
}>;

const StyledHeader = styled.div`
  font-size: 1.5rem;
  display: flex;
  width: 100%;
  background-color: ${colors.backgroundDark};
  padding: 1rem;
  justify-content: space-between;
`;

const Author = styled.div`
  display: flex;
  font-family: "${fantasyFontName}";
  flex-direction: column;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`

export const HeaderButtonStyles = css`
  display: flex;
  text-align: center;
  align-items: center;
  cursor: pointer;
  padding: 0 2rem;

  &:hover {
    background-color: ${colors.backgroundLight};
    transition: background-color 0.2s;
  }
`;

export default function Header({ name, group, variant, children }: HeaderProps) {
  return (
    <StyledHeader>
      <Author>
        <name>
          {" "}
          {name.last} {name.first}{" "}
        </name>
        <Info>
          <group> {group.toUpperCase()} </group>
          <variant> {variant} </variant>
        </Info>
      </Author>
      <ButtonsContainer>
        {children}
      </ButtonsContainer>
    </StyledHeader>
  );
}
