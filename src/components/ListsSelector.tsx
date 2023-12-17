import { faAngleDown, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { SetMenu, Set } from "./OptionsMenu";
import { Button } from "./Button";

type ListsSelectorProps = {
  set: Set[];
  selectedSet: Set | null;
  selectSet: (newValue: Set) => void;
  editSetByIdx: (idx: number, newValue: Set) => void;
};

export const SetSelector = ({
  set,
  selectedSet,
  selectSet,
  editSetByIdx,
}: ListsSelectorProps) => {
  const [displayOptions, setDisplayOptions] = useState(false);

  const onSelectSet = useCallback(
    (newValue: Set) => {
      selectSet(newValue);
      setDisplayOptions(false);
    },
    [selectSet]
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
              style={{ backgroundColor: "#cdcdcd" }}
            >
              <>
                Back <FontAwesomeIcon icon={faArrowLeft} />
              </>
            </Button>
          </ModalHeader>
          <ModalMain>
            <SetMenu
              selectSet={onSelectSet}
              set={set}
              selectedSet={selectedSet}
              changeSetByIdx={editSetByIdx}
            />
          </ModalMain>
        </Modal>
      </WrapperOverlay>
    );
  }, [editSetByIdx, onSelectSet, selectedSet, set]);

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
`;

const ModalHeader = styled.div`
  padding: 8px;
`;

const ModalMain = styled.div`
  padding: 8px;
`;
