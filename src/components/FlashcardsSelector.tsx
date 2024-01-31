import {
  faAngleDown,
  faArrowLeft,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import styled, { css } from "styled-components";
import { FlashcardsDeckMenu, FlashcardsDeck } from "./FlashcardsMenu";
import { Button } from "./Button";
import { v4 as uuid4 } from "uuid";
import { SETS_KEY } from "../constants";
import { UserTheme } from "../reducers/config.reducer";
import { useConfig } from "../context/config.context";

type FlashcardsDeckSelectorProps = {
  flashcards: FlashcardsDeck[];
  selectedFlashcards: FlashcardsDeck | null;
  selectFlashcard: (newValue: FlashcardsDeck) => void;
  setFlashcards: React.Dispatch<React.SetStateAction<FlashcardsDeck[]>>;
};

export const FlashcardsDeckSelector = ({
  flashcards,
  selectedFlashcards,
  selectFlashcard,
  setFlashcards,
}: FlashcardsDeckSelectorProps) => {
  const [displayOptions, setDisplayOptions] = useState(false);

  const { configState } = useConfig();

  const onSelectFlashcard = useCallback(
    (newValue: FlashcardsDeck) => {
      selectFlashcard(newValue);
      setDisplayOptions(false);
    },
    [selectFlashcard]
  );

  const onAddNewFlashcard = useCallback(
    () =>
      setFlashcards((prev) => {
        const currentDate = new Date().toISOString();
        const newSet: FlashcardsDeck = {
          id: uuid4(),
          label: "",
          values: "",
          createdAt: currentDate,
          updatedAt: currentDate,
        };
        return [...prev, newSet];
      }),
    [setFlashcards]
  );

  const onChangeFlashcardByIdx = useCallback(
    (flashcardIdx: number, newFlashcard: FlashcardsDeck) => {
      setFlashcards((prev) => {
        const newFlashcards = prev.map((c, i) =>
          i === flashcardIdx ? newFlashcard : c
        );
        localStorage.setItem(SETS_KEY, JSON.stringify(newFlashcards));
        return newFlashcards;
      });
    },
    [setFlashcards]
  );

  const FlashCardsDeckModal = useCallback(() => {
    return (
      <WrapperOverlay $theme={configState.theme}>
        <Modal $theme={configState.theme}>
          <ModalHeader>
            <Button
              onclick={() => {
                console.log("click clicked");
                setDisplayOptions(false);
              }}
            >
              <>
                Back <FontAwesomeIcon icon={faArrowLeft} />
              </>
            </Button>

            <p>
              You have <b>{flashcards.length}</b> flashcards deck
            </p>
          </ModalHeader>
          <ModalMain>
            <FlashcardsDeckMenu
              selectFlashcard={onSelectFlashcard}
              flashcardsDeck={flashcards}
              selectedFlashcard={selectedFlashcards}
              changeFlashcardByIdx={onChangeFlashcardByIdx}
            />
          </ModalMain>
          <ModalFooter>
            <HelpMessage>
              The Flashcards are saved in your browser, so you are able to use
              them at any moment.
            </HelpMessage>
            <Button
              onclick={onAddNewFlashcard}
              title="Add new Set"
              variant="solid"
            >
              New Flashcard <FontAwesomeIcon icon={faPlus} />
            </Button>
          </ModalFooter>
        </Modal>
      </WrapperOverlay>
    );
  }, [
    configState.theme,
    onAddNewFlashcard,
    onChangeFlashcardByIdx,
    onSelectFlashcard,
    selectedFlashcards,
    flashcards,
  ]);

  return (
    <ListSelectorWrapper>
      <SelectedItem
        onClick={() => setDisplayOptions((p) => !p)}
        role="button"
        $theme={configState.theme}
      >
        {selectedFlashcards
          ? selectedFlashcards.label
          : "Select a options to start to practice with random elements"}
        <FontAwesomeIcon icon={faAngleDown} size="sm" />
      </SelectedItem>
      {displayOptions && createPortal(<FlashCardsDeckModal />, document.body)}
    </ListSelectorWrapper>
  );
};

const ListSelectorWrapper = styled.div`
  border: none;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SelectedItem = styled.div<{ $theme: UserTheme }>`
  width: 100%;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => css`
      ${props.$theme === "dark"
        ? props.theme.colors.gray[900]
        : props.theme.colors.gray[100]}
    `};
  }
`;

const WrapperOverlay = styled.div<{ $theme: UserTheme }>`
  padding: 20px;
  position: absolute;
  inset: 0px;
  display: grid;
  place-items: center;
  background-color: ${(props) => css`
    ${props.$theme === "dark" ? "#4040409c" : "#bfbfbf98"}
  `};
  backdrop-filter: blur(10px);
`;

const Modal = styled.div<{ $theme: UserTheme }>`
  width: 100%;
  max-width: 600px;
  max-height: 600px;
  display: grid;
  grid-template-rows: 50px 1fr;
  color: ${(props) => css`
    ${props.$theme === "dark"
      ? props.theme.colors.light
      : props.theme.colors.dark}
  `};
  background-color: ${(props) => css`
    ${props.$theme === "dark"
      ? props.theme.colors.dark
      : props.theme.colors.light}
  `};
`;

const ModalHeader = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ModalMain = styled.div`
  padding: 8px;
  overflow-y: auto;
  color: inherit;
`;

const ModalFooter = styled.div`
  padding: 16px;
`;

const HelpMessage = styled.p`
  padding: 8px 0px;
  color: ${(props) => props.theme.colors.gray[500]};
`;
