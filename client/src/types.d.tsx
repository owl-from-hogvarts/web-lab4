import React from "react"

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [key: string]: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >;
    }
  }
}

