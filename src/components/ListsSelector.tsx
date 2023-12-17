import {
  faAngleDown,
  faArrowLeft,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { SetMenu, Set } from "./OptionsMenu";
import { Button } from "./Button";
import { v4 as uuid4 } from "uuid";
import { SETS_KEY } from "../constants";

type ListsSelectorProps = {
  sets: Set[];
  selectedSet: Set | null;
  selectSet: (newValue: Set) => void;
  setSets: React.Dispatch<React.SetStateAction<Set[]>>;
};

export const SetSelector = ({
  sets,
  selectedSet,
  selectSet,
  setSets,
}: ListsSelectorProps) => {
  const [displayOptions, setDisplayOptions] = useState(false);

  const onSelectSet = useCallback(
    (newValue: Set) => {
      selectSet(newValue);
      setDisplayOptions(false);
    },
    [selectSet]
  );

  const onAddNewSet = useCallback(
    () =>
      setSets((prev) => {
        const currentDate = new Date().toISOString()
        const newSet: Set = { id: uuid4(), label: "", values: "",createdAt:currentDate,updatedAt:currentDate };
        return [...prev, newSet];
      }),
    [setSets]
  );

  const onChangeOptionByIdx = useCallback(
    (optionIdx: number, newOption: Set) => {
      setSets((prev) => {
        const newSets = prev.map((c, i) => (i === optionIdx ? newOption : c));
        localStorage.setItem(SETS_KEY, JSON.stringify(newSets));
        return newSets;
      });
    },
    [setSets]
  );

  const OptionsModal = useMemo(() => {
    return (
      <WrapperOverlay>
        <Modal>
          <ModalHeader>
            <Button
              onclick={() => {
                console.log("click clicked");
                setDisplayOptions(false);
              }}
              theme="dark"
              style={{color:"white"}}
            >
              <>
                Back <FontAwesomeIcon icon={faArrowLeft} />
              </>
            </Button>

            <Info>You have <b>{sets.length}</b> sets</Info>
          </ModalHeader>
          <ModalMain>
            <SetMenu
              selectSet={onSelectSet}
              set={sets}
              selectedSet={selectedSet}
              changeSetByIdx={onChangeOptionByIdx}
            />
          </ModalMain>
          <ModalFooter>
            <Button onclick={onAddNewSet} theme="dark" title="Add new Set" style={{ backgroundColor: "#cdcdcd" }}>
              Add <FontAwesomeIcon icon={faPlus} />
            </Button>
          </ModalFooter>
        </Modal>
      </WrapperOverlay>
    );
  }, [onAddNewSet, onChangeOptionByIdx, onSelectSet, selectedSet, sets]);

  return (
    <ListSelectorWrapper>
      <SelectedItem onClick={() => setDisplayOptions((p) => !p)} role="button">
        {selectedSet
          ? selectedSet.label
          : "Select a options to start to practice with random elements"}
        <FontAwesomeIcon icon={faAngleDown} size="sm" />
      </SelectedItem>
      {displayOptions && createPortal(OptionsModal, document.body)}
    </ListSelectorWrapper>
  );
};

const ListSelectorWrapper = styled.div`
  border: none;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SelectedItem = styled.div`
  width: 100%;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background-color: rgb(62, 62, 62);
  }
`;

const WrapperOverlay = styled.div`
  padding: 20px;
  position: absolute;
  inset: 0px;
  display: grid;
  place-items: center;
  background-color: #6a6a6a9c;
  backdrop-filter: blur(10px);
`;

const Modal = styled.div`
  width: 100%;
  max-width: 600px;
  max-height: 600px;
  display: grid;
  grid-template-rows: 50px 1fr;
  background-color: #3e3e3e;
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
`;

const ModalFooter = styled.div`
  padding: 16px;
`;

const Info = styled.p`
  color:white
`