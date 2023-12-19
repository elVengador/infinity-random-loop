import React from "react";
import styled from "styled-components";
import { Button } from "./Button";
import { useConfig } from "../context/config.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faSun,
  faVolumeMute,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";

type HeaderProps = {
  canNarrate: boolean;
  setCanNarrate: React.Dispatch<React.SetStateAction<boolean>>;
};
export const Header = ({ canNarrate, setCanNarrate }: HeaderProps) => {
  const { configState, configDispatch } = useConfig();

  return (
    <HeaderStyled>
      <HeaderBrand>Infinity Random Loop</HeaderBrand>
      <HeaderOptions>
        <Button
          onclick={() =>
            configDispatch({
              type: "changeTheme",
              payload: configState.theme === "dark" ? "light" : "dark",
            })
          }
          // theme={configState.theme}
          style={{ padding: "0px", width: "36px", height: "36px" }}
          title={
            configState.theme ? "Change to light theme" : "Change to dark theme"
          }
        >
          {configState.theme === "dark" ? (
            <FontAwesomeIcon icon={faMoon} size="xs" />
          ) : (
            <FontAwesomeIcon icon={faSun} size="xs" />
          )}
        </Button>
        <Button
          onclick={() => setCanNarrate((prev) => !prev)}
          title={canNarrate ? "Disable narrator" : "Enable narrator"}
          style={{ padding: "0px", width: "36px", height: "36px" }}
        >
          {canNarrate ? (
            <FontAwesomeIcon icon={faVolumeUp} size="xs" />
          ) : (
            <FontAwesomeIcon icon={faVolumeMute} size="xs" />
          )}
        </Button>
      </HeaderOptions>
    </HeaderStyled>
  );
};

const HeaderStyled = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1000px;
  width: 100%;
  margin: 0px auto;
  padding: 4px 8px;
`;

const HeaderBrand = styled.h1`
  font-size: 20px;
  text-align: center;
  margin: 0px;
`;

const HeaderOptions = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;
