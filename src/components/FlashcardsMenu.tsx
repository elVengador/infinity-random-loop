import styled, { css } from "styled-components";
import { Button } from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { UserTheme } from "../reducers/config.reducer";
import { useConfig } from "../context/config.context";

export type FlashcardsDeck = {
  id: string;
  values: string;
  label: string;
  createdAt: string;
  updatedAt: string;
};

type FlashcardsMenuProps = {
  flashcardsDeck: FlashcardsDeck[];
  selectFlashcard: (newValue: FlashcardsDeck) => void;
  selectedFlashcard: FlashcardsDeck | null;
  changeFlashcardByIdx: (idx: number, newValue: FlashcardsDeck) => void;
  style?: React.CSSProperties;
};

export const FlashcardsDeckMenu = ({
  flashcardsDeck,
  selectFlashcard,
  selectedFlashcard,
  changeFlashcardByIdx,
  style,
}: FlashcardsMenuProps) => {
  const { configState } = useConfig();

  return (
    <List style={{ ...style }}>
      {flashcardsDeck
        .sort(
          (a, b) =>
            Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
        )
        .map((cur, idx, src) => (
          <ListItem
            key={cur.id}
            $idx={idx}
            $length={src.length}
            $isSelected={cur.id == selectedFlashcard?.id}
            $theme={configState.theme}
          >
            <ListItemHeader>
              <LabelInput
                value={cur.label}
                placeholder="Flashcard name"
                onChange={(e) =>
                  changeFlashcardByIdx(idx, {
                    ...flashcardsDeck[idx],
                    label: e.target.value,
                  })
                }
                $theme={configState.theme}
              />
              <Button
                onclick={() => selectFlashcard(cur)}
                title="Chose this flashcard"
              >
                <FontAwesomeIcon icon={faArrowAltCircleRight} />
              </Button>
            </ListItemHeader>
            <DescriptionInput
              value={cur.values}
              placeholder="Items separated by commas, ex: one, two, three"
              onChange={(e) =>
                changeFlashcardByIdx(idx, {
                  ...flashcardsDeck[idx],
                  values: e.target.value,
                })
              }
              $theme={configState.theme}
            />
          </ListItem>
        ))}
    </List>
  );
};

const List = styled.ul`
  padding: 0px 20px;
  width: 100%;
  list-style-type: none;
  display: grid;
  gap: 30px;
  background-color: inherit;
  color: inherit;
`;

const ListItem = styled.li<{
  $idx: number;
  $length: number;
  $isSelected: boolean;
  $theme: UserTheme;
}>`
  ${(props) => {
    if (props.$idx === 0) {
      return css`
        border-top-right-radius: 8px;
        border-top-left-radius: 8px;
      `;
    }
    if (props.$idx === props.$length - 1) {
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
