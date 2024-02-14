import {
  faAngleDown,
  faArrowLeft,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import styled, { css } from "styled-components";
import { Button } from "./Button";
import { v4 as uuid4 } from "uuid";
import {
  BASIC_CHORDS,
  ENGLISH_ADVANCED_VOCABULARY,
  ENGLISH_BASIC_VOCABULARY,
  ENGLISH_INTERMEDIATE_VOCABULARY,
  MUSICAL_NOTES,
  SETS_KEY,
} from "../constants";
import { UserTheme } from "../reducers/config.reducer";
import { useConfig } from "../context/config.context";
import { FlashcardForm } from "./FlashcardForm";

export type FlashcardsDeck = {
  id: string;
  values: string;
  label: string;
  createdAt: string;
  updatedAt: string;
};

const INITIAL_SETS: FlashcardsDeck[] = [
  MUSICAL_NOTES,
  BASIC_CHORDS,
  ENGLISH_BASIC_VOCABULARY,
  ENGLISH_INTERMEDIATE_VOCABULARY,
  ENGLISH_ADVANCED_VOCABULARY,
];

type FlashcardsSelectorProps = {
  selectedFlashcard: FlashcardsDeck | null;
  setSelectedFlashcard: (newValue: FlashcardsDeck) => void;
};

export const FlashcardsSelector = ({
  selectedFlashcard,
  setSelectedFlashcard,
}: FlashcardsSelectorProps) => {
  const [displayOptions, setDisplayOptions] = useState(false);
  const [flashcards, setFlashcards] = useState<FlashcardsDeck[]>([]);

  const { configState } = useConfig();

  const onSelectFlashcard = useCallback(
    (newValue: FlashcardsDeck) => {
      setSelectedFlashcard(newValue);
      setDisplayOptions(false);
    },
    [setSelectedFlashcard]
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

  const flashcardsSorted = useMemo(() => {
    console.log({ flashcards });
    return [...flashcards].sort(
      (a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
    );
  }, [flashcards]);

  const onChangeTitleByIdx = useCallback(
    (idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFlashcards((prev) => {
        const newFlashcards = prev.map((c, i) =>
          i === idx ? { ...c, label: e.target.value } : c
        );
        localStorage.setItem(SETS_KEY, JSON.stringify(newFlashcards));
        return newFlashcards;
      });
    },
    []
  );

  const onChangeValuesByIdx = useCallback(
    (idx: number) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setFlashcards((prev) => {
        const newFlashcards = prev.map((c, i) =>
          i === idx ? { ...c, values: e.target.value } : c
        );
        localStorage.setItem(SETS_KEY, JSON.stringify(newFlashcards));
        return newFlashcards;
      });
    },
    []
  );

  useEffect(() => {
    const setsFromLocalStorage = localStorage.getItem(SETS_KEY);
    if (setsFromLocalStorage) {
      return setFlashcards(JSON.parse(setsFromLocalStorage));
    }
    setFlashcards(INITIAL_SETS);
  }, []);

  return (
    <ListSelectorWrapper>
      <SelectedItem
        onClick={() => setDisplayOptions((p) => !p)}
        role="button"
        $theme={configState.theme}
      >
        {selectedFlashcard
          ? selectedFlashcard.label
          : "Select a options to start to practice with random elements"}
        <FontAwesomeIcon icon={faAngleDown} size="sm" />
      </SelectedItem>
      {displayOptions &&
        createPortal(
          <FlashCardsDeckModal
            changeLabelByIdx={onChangeTitleByIdx}
            changeValuesByIdx={onChangeValuesByIdx}
            flashcards={flashcardsSorted}
            selectedFlashcard={selectedFlashcard}
            selectFlashcard={onSelectFlashcard}
            addNewFlashcard={onAddNewFlashcard}
            closeModal={() => setDisplayOptions(false)}
          />,
          document.body
        )}
    </ListSelectorWrapper>
  );
};

type FlashCardsDeckModalProps = {
  flashcards: FlashcardsDeck[];
  changeLabelByIdx: (
    idx: number
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeValuesByIdx: (
    idx: number
  ) => (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  selectedFlashcard: FlashcardsDeck | null;
  selectFlashcard: (newValue: FlashcardsDeck) => void;
  addNewFlashcard: () => void;
  closeModal: () => void;
};

const FlashCardsDeckModal = ({
  flashcards,
  changeLabelByIdx,
  changeValuesByIdx,
  selectedFlashcard,
  selectFlashcard,
  addNewFlashcard,
  closeModal,
}: FlashCardsDeckModalProps) => {
  return (
    <WrapperOverlay $theme={"dark"}>
      <Modal $theme={"dark"}>
        <ModalHeader>
          <Button onclick={closeModal}>
            <>
              Back <FontAwesomeIcon icon={faArrowLeft} />
            </>
          </Button>
          <p>
            You have <b>{flashcards.length}</b> flashcards deck
          </p>
        </ModalHeader>
        <ModalMain>
          <List>
            {flashcards.map((cur, idx, src) => (
              <FlashcardForm
                key={cur.id}
                data={cur}
                changeLabel={changeLabelByIdx(idx)}
                changeValues={changeValuesByIdx(idx)}
                isFirst={idx === 0}
                isLast={src.length - 1 === idx}
                isSelected={cur.id === selectedFlashcard?.id}
                setSelectedFlashcard={selectFlashcard}
              />
            ))}
          </List>
        </ModalMain>
        <ModalFooter>
          <HelpMessage>
            The Flashcards are saved in your browser, so you are able to use
            them at any moment.
          </HelpMessage>
          <Button onclick={addNewFlashcard} title="Add new Set" variant="solid">
            New Flashcard <FontAwesomeIcon icon={faPlus} />
          </Button>
        </ModalFooter>
      </Modal>
    </WrapperOverlay>
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

const List = styled.ul`
  padding: 0px 20px;
  width: 100%;
  list-style-type: none;
  display: grid;
  gap: 30px;
  background-color: inherit;
  color: inherit;
`;
