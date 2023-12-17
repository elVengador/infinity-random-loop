import "./App.css";
import { useEffect, useState } from "react";
import { Card } from "./components/Card";
import { SetSelector } from "./components/ListsSelector";
import { Button } from "./components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Set} from "./components/OptionsMenu"
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
import { BASIC_CHORDS, ENGLISH_ADVANCED_VOCABULARY, ENGLISH_BASIC_VOCABULARY, ENGLISH_INTERMEDIATE_VOCABULARY, MUSICAL_NOTES, SETS_KEY } from "./constants";

const INITIAL_SETS: Set[] = [
  MUSICAL_NOTES,BASIC_CHORDS,ENGLISH_BASIC_VOCABULARY,ENGLISH_INTERMEDIATE_VOCABULARY,ENGLISH_ADVANCED_VOCABULARY
];

function App() {
  const [randomValue, setRandomValue] = useState<string>("");
  const [sets, setSets] = useState<Set[]>([]);
  const [selectedOptions, setSelectedOption] = useState<Set | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [canNarrate, setCanNarrate] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [displaySpeedController, setDisplaySpeedController] = useState(false);

  const getRandomValue = (option:Set)=>{
    const items = option.values.split(',').map(c=>c.trim())
    const randomIndex = getRandomInteger(items.length - 1);
    const newRandomValue = items[randomIndex];
    return newRandomValue
  }

  const onSelectSet = (newValue:Set)=>{
    setSelectedOption(newValue)
    setIsPlaying(true)
  }

  useEffect(() => {
    const setsFromLocalStorage = localStorage.getItem(SETS_KEY)
    if(setsFromLocalStorage){
      return setSets(JSON.parse(setsFromLocalStorage))
    }
    setSets(INITIAL_SETS)
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    if (!selectedOptions) return;
    const intervalId = setInterval(() => {
      const newRandomValue = getRandomValue(selectedOptions)
      setRandomValue(newRandomValue);
      if (canNarrate) narrateText(newRandomValue.toLowerCase());
    }, speed);
    return () => clearInterval(intervalId);
  }, [canNarrate, isPlaying, selectedOptions, speed]);

  const backgroundColor = isDarkMode ? "rgb(206,206,206)" : "#1E1E1E";
  const color = isDarkMode ? "#1E1E1E" : "rgb(206,206,206)";
  const backgroundCard = isDarkMode ? "#FBFBFB" : "#6C6C6C";

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "grid",
        gridTemplateRows: "50px 1fr 30px",
        gridTemplateColumns: "1fr",
        background: backgroundColor,
        color: color,
      }}
    >
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
            onclick={() => setIsDarkMode((visual) => !visual)}
            theme={isDarkMode ? "dark" : "light"}
            style={{ padding: "0px", width: "36px", height: "36px" }}
            title={
              isDarkMode ? "Change to light theme" : "Change to dark theme"
            }
          >
            {isDarkMode ? (
              <FontAwesomeIcon icon={faMoon} size="xs" />
            ) : (
              <FontAwesomeIcon icon={faSun} size="xs" />
            )}
          </Button>
          <Button
            onclick={() => setCanNarrate((prev) => !prev)}
            theme={isDarkMode ? "dark" : "light"}
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
          {selectedOptions && randomValue && (
            <Card
              value={randomValue}
              backgroundColor={backgroundCard}
              color={color}
              style={{ maxWidth: "500px", maxHeight: "300px" }}
            />
          )}

          {!selectedOptions && <p>Select a list please</p>}

          {/* controls */}
          <div
            style={{
              width:"100%",
              maxWidth: "400px",
              display: "grid",
              gridTemplateColumns: "auto 1fr auto",
              gap: "12px",
              alignItems: "center",
            }}
          >
            <Button
              onclick={() => setDisplaySpeedController((prev) => !prev)}
              theme={isDarkMode ? "dark" : "light"}
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
            <SetSelector
              sets={sets}
              selectSet={onSelectSet}
              selectedSet={selectedOptions}
              setSets={setSets}
            />
            <Button
              onclick={() => setIsPlaying((prev) => !prev)}
              theme={isDarkMode ? "dark" : "light"}
              title={isPlaying ? "Stop loop" : "Play loop"}
              style={{ width: "36px", height: "36px", padding: "0px" }}
            >
              {isPlaying ? (
                <FontAwesomeIcon icon={faPause} size="xs" />
              ) : (
                <FontAwesomeIcon icon={faPlay} size="xs" />
              )}
            </Button>
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
          display: "grid",
          placeItems: "center",
          maxWidth: "1000px",
          width: "100%",
          margin: "0px auto",
        }}
      >
        By elVengador & Lachicagladiadora - 2023
      </footer>
    </div>
  );
}

export default App;
