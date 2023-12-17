import { CSSProperties } from "react";

type SpeedInputProps = {
  speed: number;
  setSpeed: (newValue: number) => void;
  style?: CSSProperties;
};

export const SpeedInput = ({ speed, setSpeed }: SpeedInputProps) => {
  return (
    <div style={{ width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"center"}}>
      <label
        htmlFor="speed-controller"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bottom: "0px",
          right: "0px",
        }}
      >
        <span style={{ fontSize: "12px" }}>0.5 s</span>
        <span style={{ fontSize: "16px", fontWeight: "bold" }}>
          {speed / 1000} s
        </span>
        <span style={{ fontSize: "12px" }}>5 s</span>
      </label>

      <input
        id="speed-controller"
        type="range"
        min={500}
        max={5000}
        step={500}
        value={speed}
        onChange={(e) => setSpeed(Number(e.target.value))}
        style={{
        width:"100%"  
        }}
      />
    </div>
  );
};
