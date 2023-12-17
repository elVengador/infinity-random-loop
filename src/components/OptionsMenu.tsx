import styled, { css } from "styled-components";
import { Button } from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";

export type Set = { id: string; values: string; label: string,createdAt:string,updatedAt:string };

type SetMenuProps = {
  set: Set[];
  selectSet: (newValue: Set) => void;
  selectedSet: Set | null;
  changeSetByIdx: (idx: number, newValue: Set) => void;
  style?: React.CSSProperties;
};

export const SetMenu = ({
  set,
  selectSet,
  selectedSet,
  changeSetByIdx,
  style,
}: SetMenuProps) => {
  return (
    <List style={{ ...style }}>
      {set.sort((a,b)=>Number(new Date(b.createdAt))-Number(new Date(a.createdAt))).map((cur, idx, src) => (
        <ListItem
          key={cur.id}
          $idx={idx}
          $length={src.length}
          $isSelected={cur.id == selectedSet?.id}
        >
          <ListItemHeader>
            <LabelInput
              value={cur.label}
              onChange={(e) =>
                changeSetByIdx(idx, {
                  ...set[idx],
                  label: e.target.value,
                })
              }
            />
            <Button
              onclick={() => selectSet(cur)}
              theme="dark"
              style={{ color: "white" }}
              title="Chose this set"
            >
              <FontAwesomeIcon icon={faArrowAltCircleRight} />
            </Button>
          </ListItemHeader>
          <DescriptionInput
            value={cur.values}
            onChange={(e) =>
              changeSetByIdx(idx, {
                ...set[idx],
                values: e.target.value,
              })
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

const List = styled.ul`
padding:0px 20px;
  width: 100%;
  list-style-type: none;
  color: #ffffff;
  display: grid;
  gap: 30px;
  background-color: inherit;
`;

const ListItem = styled.li<{
  $idx: number;
  $length: number;
  $isSelected: boolean;
}>`
  /* padding: 10px; */
  /* border: solid 1px #ffffff; */
  /* background-color: #000000; */
  
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
        background-color: #525252;
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

const LabelInput = styled.input`
  padding: 4px 8px;
  width: 100%;
  font-size: 14px;
  color: white;
  border: none;
  background-color: inherit;
  background-color: #1d1d1d;
`;

const DescriptionInput = styled.textarea`
  padding: 4px 8px;
  width: 100%;
  font-size: 14px;
  background-color: #2d2d2d;
  color: white;
  border: none;
  border-radius: 4px;
`;
