import "./App.css";
import { useEffect, useState } from "react";
import { Flashcard } from "./components/Flashcard";
import { FlashcardsDeckSelector } from "./components/FlashcardsSelector";
import { Button } from "./components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FlashcardsDeck } from "./components/FlashcardsMenu";
import { faPause, faPlay, faRunning } from "@fortawesome/free-solid-svg-icons";
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
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { useSound } from "./hooks/useSound";

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

  const { configState } = useConfig();
  const playStartSound = useSound("/start.mp3");

  const getRandomValue = (option: FlashcardsDeck) => {
    const items = option.values.split(",").map((c) => c.trim());
    const randomIndex = getRandomInteger(items.length - 1);
    const newRandomValue = items[randomIndex];
    return newRandomValue;
  };

  const onSelectSet = (newValue: FlashcardsDeck) => {
    setSelectedFlashcardsDeck(newValue);
    setIsPlaying(true);
    if (canNarrate) playStartSound();
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
      <Header canNarrate={canNarrate} setCanNarrate={setCanNarrate} />

      <Main>
        {/* cards */}
        <CenteredSection>
          {selectedFlashcardsDeck && randomValue && (
            <Flashcard
              value={randomValue}
              style={{ maxWidth: "500px", maxHeight: "300px" }}
            />
          )}

          {!selectedFlashcardsDeck && <p>Select a list please</p>}

          {/* controls */}
          <Controls>
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
          </Controls>
          {/* other controls */}
          <MoreControls>
            {displaySpeedController && (
              <SpeedInput speed={speed} setSpeed={setSpeed} />
            )}
          </MoreControls>
        </CenteredSection>
      </Main>

      <Footer />
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

const Main = styled.main`
  padding: 4px 8px;
  position: relative;
  max-width: 1000px;
  width: 100%;
  margin: 0px auto;
  display: grid;
`;

const CenteredSection = styled.section`
  width: 100%;
  height: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
`;

const Controls = styled.div`
  width: 100%;
  max-width: 400px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 12px;
  align-items: center;
`;

const MoreControls = styled.div`
  width: 100%;
  max-width: 300px;
  min-height: 40px;
`;
