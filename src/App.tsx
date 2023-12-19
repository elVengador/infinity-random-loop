import "./App.css";
import { useEffect, useState } from "react";
import { Flashcard } from "./components/Flashcard";
import { FlashcardsDeckSelector } from "./components/FlashcardsSelector";
import { Button } from "./components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FlashcardsDeck } from "./components/FlashcardsMenu";
import {
  faMoon,
  faPause,
  faPlay,
  faRunning,
  faSun,
  faVolumeMute,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import { getRandomInteger, narrateText } from "./utils";
import { SpeedInput } from "./components/SpeedInput";
import {
  BASIC_CHORDS,
  ENGLISH_ADVANCED_VOCABULARY,
  ENGLISH_BASIC_VOCABULARY,
  ENGLISH_INTERMEDIATE_VOCABULARY,
  MUSICAL_NOTES,
  SETS_KEY,
} from "./constants";
import { useConfig } from "./context/config.context";
import styled, { css } from "styled-components";
import { UserTheme } from "./reducers/config.reducer";

const INITIAL_SETS: FlashcardsDeck[] = [
  MUSICAL_NOTES,
  BASIC_CHORDS,
  ENGLISH_BASIC_VOCABULARY,
  ENGLISH_INTERMEDIATE_VOCABULARY,
  ENGLISH_ADVANCED_VOCABULARY,
];

function App() {
  const [randomValue, setRandomValue] = useState<string>("");
  const [sets, setSets] = useState<FlashcardsDeck[]>([]);
  const [selectedFlashcardsDeck, setSelectedFlashcardsDeck] =
    useState<FlashcardsDeck | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [canNarrate, setCanNarrate] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [displaySpeedController, setDisplaySpeedController] = useState(false);

  const { configState, configDispatch } = useConfig();

  const getRandomValue = (option: FlashcardsDeck) => {
    const items = option.values.split(",").map((c) => c.trim());
    const randomIndex = getRandomInteger(items.length - 1);
    const newRandomValue = items[randomIndex];
    return newRandomValue;
  };

  const onSelectSet = (newValue: FlashcardsDeck) => {
    setSelectedFlashcardsDeck(newValue);
    setIsPlaying(true);
  };

  useEffect(() => {
    const setsFromLocalStorage = localStorage.getItem(SETS_KEY);
    if (setsFromLocalStorage) {
      return setSets(JSON.parse(setsFromLocalStorage));
    }
    setSets(INITIAL_SETS);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    if (!selectedFlashcardsDeck) return;
    const intervalId = setInterval(() => {
      const newRandomValue = getRandomValue(selectedFlashcardsDeck);
      setRandomValue(newRandomValue);
      if (canNarrate) narrateText(newRandomValue.toLowerCase());
    }, speed);
    return () => clearInterval(intervalId);
  }, [canNarrate, isPlaying, selectedFlashcardsDeck, speed]);

  return (
    <Wrapper $theme={configState.theme}>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1000px",
          width: "100%",
          margin: "0px auto",
          padding: "4px 8px",
        }}
      >
        <h1 style={{ fontSize: "20px", textAlign: "center", margin: "0px" }}>
          Infinity Random Loop
        </h1>
        <section
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
          }}
        >
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
              configState.theme
                ? "Change to light theme"
                : "Change to dark theme"
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
        </section>
      </header>

      <main
        style={{
          padding: "4px 8px",
          position: "relative",
          maxWidth: "1000px",
          width: "100%",
          margin: "0px auto",
          display: "grid",
          placeItems: "center",
        }}
      >
        {/* cards */}
        <section
          style={{
            width: "100%",
            height: "100%",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
          }}
        >
          {selectedFlashcardsDeck && randomValue && (
            <Flashcard
              value={randomValue}
              style={{ maxWidth: "500px", maxHeight: "300px" }}
            />
          )}

          {!selectedFlashcardsDeck && <p>Select a list please</p>}

          {/* controls */}
          <div
            style={{
              width: "100%",
              maxWidth: "400px",
              display: "grid",
              gridTemplateColumns: "auto 1fr auto",
              gap: "12px",
              alignItems: "center",
            }}
          >
            {selectedFlashcardsDeck && (
              <Button
                onclick={() => setDisplaySpeedController((prev) => !prev)}
                title={"Change speed"}
                style={{
                  width: "36px",
                  height: "36px",
                  padding: "0px",
                  color: displaySpeedController ? "#3d9eff" : "inherit",
                }}
              >
                <FontAwesomeIcon icon={faRunning} size="xs" />
              </Button>
            )}
            <FlashcardsDeckSelector
              flashcards={sets}
              selectFlashcard={onSelectSet}
              selectedFlashcards={selectedFlashcardsDeck}
              setFlashcards={setSets}
            />
            {selectedFlashcardsDeck && (
              <Button
                onclick={() => setIsPlaying((prev) => !prev)}
                title={isPlaying ? "Stop loop" : "Play loop"}
                style={{ width: "36px", height: "36px", padding: "0px" }}
              >
                {isPlaying ? (
                  <FontAwesomeIcon icon={faPause} size="xs" />
                ) : (
                  <FontAwesomeIcon icon={faPlay} size="xs" />
                )}
              </Button>
            )}
          </div>
          {/* other controls */}
          <div style={{ width: "100%", maxWidth: "300px", minHeight: "40px" }}>
            {displaySpeedController && (
              <SpeedInput speed={speed} setSpeed={setSpeed} />
            )}
          </div>
        </section>
      </main>

      <footer
        style={{
          padding: "4px 8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "1000px",
          width: "100%",
          margin: "0px auto",
        }}
      >
        By elVengador & Lachicagladiadora - 2023
      </footer>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div<{ $theme: UserTheme }>`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 50px 1fr 30px;
  grid-template-columns: 1fr;
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
