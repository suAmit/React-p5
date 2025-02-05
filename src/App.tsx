import { useState } from "react";
import SketchLoader from "./components/SketchLoader";
import { sketchIndex } from "./sketches";
import "./App.css";

function App() {
  const [selectedSketch, setSelectedSketch] = useState<string | null>(null);
  const [viewSketchList, setViewSketchList] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "light" : "dark",
    );
  };

  const handleSketchSelect = (filepath: string) => {
    setSelectedSketch(filepath);
  };

  return (
    <div className="app-body">
      <div className={`sketch-list ${viewSketchList ? "visible" : "hidden"}`}>
        {sketchIndex.map((sketch) => (
          <div
            className={`sketch ${selectedSketch === sketch.filepath && "selected"}`}
            key={sketch.filepath}
            onClick={() => handleSketchSelect(sketch.filepath)}
          >
            <div className="title">{sketch.title}</div>
            <span className="desc">{sketch.desc}</span>
          </div>
        ))}
      </div>

      <div className="main-body">
        <div className="header">
          <div
            className={viewSketchList ? "sidebar-close" : "menu"}
            onClick={() => setViewSketchList(!viewSketchList)}
          >
            <span>{viewSketchList ? "Close" : "Menu"}</span>
          </div>

          <div className="theme-toggle" onClick={handleThemeToggle}>
            <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
          </div>
        </div>

        <div className="sketch-container">
          {selectedSketch ? (
            <SketchLoader sketch={selectedSketch} />
          ) : (
            <div style={{ fontSize: "1.5rem", fontWeight: "500" }}>
              Select Sketch
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
