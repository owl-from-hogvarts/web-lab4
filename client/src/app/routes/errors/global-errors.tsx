import styled from "@emotion/styled";
import { TServerErrorPayload } from "app/api/api";
import BigText from "app/components/bigText";
import useGlobalErrors from "app/hooks/useGlobalErrors";
import { colors } from "app/styles/colors";
import React, { useEffect, useState } from "react";

const ModalContainer = styled.div`
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  gap: 1rem;
`;

const ErrorCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: ${colors.error};
  border: 0.3rem solid ${colors.errorAccent};
  color: ${colors.errorAccent};
  border-radius: 1rem;
`;

const ERROR_DISPLAY_TIME_DURATION_SEC = 5;

export default function GlobalErrorsDisplayer() {
  const { take } = useGlobalErrors();

  const [currentErrors, setCurrentErrors] = useState<TServerErrorPayload[]>([]);

  useEffect(() => {
    const newError = take();
    if (newError != undefined) {
      setCurrentErrors([...currentErrors, newError]);
      // set timer once for every added error
      // do not cancel
      // effect clean up runs for every except last effect
      // while timer is possible to undo
      // take function could not be canceled, so clean up neither
      // possible nor necessary here
      setTimeout(
        () => setCurrentErrors((errors) => errors.slice(1)),
        ERROR_DISPLAY_TIME_DURATION_SEC * 1000
      );
    }
  }, [take]);

  return (
    // <ModalContainer>
    <ErrorContainer>
      {currentErrors.map((error) => (
        <ErrorCard>
          <BigText style={{ color: colors.errorAccent }}>Error!</BigText>
          {error.message}
        </ErrorCard>
      ))}
    </ErrorContainer>
    /* </ModalContainer> */
  );
}
