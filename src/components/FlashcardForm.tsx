import styled, { css } from "styled-components";
import { UserTheme } from "../reducers/config.reducer";
import { useConfig } from "../context/config.context";
import { Button } from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FlashcardsDeck } from "./FlashcardsSelector";

type FlashcardFormProps = {
  data: FlashcardsDeck;
  isFirst: boolean;
  isLast: boolean;
  isSelected: boolean;
  setSelectedFlashcard: (newValue: FlashcardsDeck) => void;
  changeLabel: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeValues: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const FlashcardForm = ({
  data,
  isFirst,
  isLast,
  isSelected,
  setSelectedFlashcard,
  changeLabel,
  changeValues,
}: FlashcardFormProps) => {
  const { configState } = useConfig();

  return (
    <ListItem
      $isFirst={isFirst}
      $isLast={isLast}
      $isSelected={isSelected}
      $theme={configState.theme}
    >
      <ListItemHeader>
        <LabelInput
          value={data.label}
          placeholder="Flashcard name"
          onChange={changeLabel}
          $theme={configState.theme}
        />
        <Button
          onclick={() => setSelectedFlashcard(data)}
          title="Chose this flashcard"
        >
          <FontAwesomeIcon icon={faArrowAltCircleRight} />
        </Button>
      </ListItemHeader>
      <DescriptionInput
        value={data.values}
        placeholder="Items separated by commas, ex: one, two, three"
        onChange={changeValues}
        $theme={configState.theme}
      />
    </ListItem>
  );
};

const ListItem = styled.li<{
  $isFirst: boolean;
  $isLast: boolean;
  $isSelected: boolean;
  $theme: UserTheme;
}>`
  ${(props) => {
    if (props.$isFirst) {
      return css`
        border-top-right-radius: 8px;
        border-top-left-radius: 8px;
      `;
    }
    if (props.$isLast) {
      return css`
        border-bottom-right-radius: 8px;
        border-bottom-left-radius: 8px;
      `;
    }
  }}
  ${(props) => {
    if (props.$isSelected) {
      return css`
        background-color: ${props.$theme === "dark"
          ? props.theme.colors.dark
          : props.theme.colors.light};
      `;
    }
  }}
`;

const ListItemHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
`;

const LabelInput = styled.input<{ $theme: UserTheme }>`
  padding: 4px 8px;
  width: 100%;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  color: ${(props) => css`
    ${props.$theme === "dark"
      ? props.theme.colors.light
      : props.theme.colors.dark}
  `};
  background-color: ${(props) => css`
    ${props.$theme === "dark"
      ? props.theme.colors.gray[900]
      : props.theme.colors.gray[100]}
  `};
`;

const DescriptionInput = styled.textarea<{ $theme: UserTheme }>`
  padding: 4px 8px;
  width: 100%;
  font-size: 14px;
  color: ${(props) => css`
    ${props.$theme === "dark"
      ? props.theme.colors.light
      : props.theme.colors.dark}
  `};
  background-color: ${(props) => css`
    ${props.$theme === "dark"
      ? props.theme.colors.gray[900]
      : props.theme.colors.gray[100]}
  `};
  border: none;
  border-radius: 4px;
`;
