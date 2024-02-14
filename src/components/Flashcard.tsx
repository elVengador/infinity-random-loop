import { CSSProperties } from "react";
import styled, { css } from "styled-components";
import { UserTheme } from "../reducers/config.reducer";
import { useConfig } from "../context/config.context";

type FlashcardProps = {
  value: string;
  style?: CSSProperties;
};

export const Flashcard = ({ value, style }: FlashcardProps) => {
  const { configState } = useConfig();
  return (
    <FlashcardWrapper $theme={configState.theme} style={style}>
      <p
        style={{
          fontSize: value.length > 12 ? "70px" : "100px",
          textAlign: "center",
        }}
      >
        {value}
      </p>
    </FlashcardWrapper>
  );
};

const FlashcardWrapper = styled.article<{ $theme: UserTheme }>`
  padding: 16px;
  background-color: ${(props) => css`
    ${props.$theme === "dark"
      ? props.theme.colors.gray[800]
      : props.theme.colors.gray[100]}
  `};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 3px 3px 5px #0000004a;
  width: 100%;
  height: 100%;
`;
