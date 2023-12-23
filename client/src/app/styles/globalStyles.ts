import { GlobalProps, css } from "@emotion/react";
import { colors } from "./colors";

export const rounded = css`
  .rounded {
    border-radius: 0.5rem;
    box-shadow: 0 0 0.2rem ${colors.backgroundDark};
  }
`;

export const globalDefaults = css`
  * {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    color: ${colors.accent};
    box-sizing: border-box;
  }
`;
export const topElementStyles = css`
  html,
  body {
    font-size: 16px;
    width: 100%;
    background-color: ${colors.background};
  }
`;
