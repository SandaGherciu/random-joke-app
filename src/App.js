import "./App.scss";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitterSquare } from "@fortawesome/free-brands-svg-icons";
import { faGrinSquintTears } from "@fortawesome/free-solid-svg-icons";
import { AnimateOnChange } from "react-animation";
import "react-animation/dist/keyframes.css";
import colours from "./colours";

function App() {
  const [joke, setJoke] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(getRandomIndex());
  const [colour, setColour] = useState(colours[0][index]);
  const [bgColour, setBgColour] = useState(colours[1][index]);

  const handleNewJoke = async () => {
    try {
      const result = await fetch("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" },
      });
      if (result.ok) {
        const data = await result.json();
        setJoke(data.joke);
        setIndex(getRandomIndex());
        setColour(colours[0][index]);
        setBgColour(colours[1][index]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    handleNewJoke();
  }, []);

  return (
    <div className="App">
      <header style={{ backgroundColor: colour }}>
        <AnimateOnChange durationIn={200} durationOut={200}>
          <h2 id="heading" style={{ color: bgColour }}>
            Get a random dad joke
          </h2>
        </AnimateOnChange>
      </header>
      <div
        id="container"
        style={{
          backgroundColor: bgColour,
          transitionDuration: 400,
        }}
      >
        <div
          id="content-box"
          style={{
            backgroundColor: colour,
            color: bgColour,
          }}
        >
          <AnimateOnChange durationIn={200} durationOut={200}>
            <FontAwesomeIcon icon={faGrinSquintTears} size="4x" />
          </AnimateOnChange>
          {isLoading ? (
            <h1>Loading...</h1>
          ) : (
            <AnimateOnChange durationIn={200} durationOut={200}>
              <h1 id="joke-text">{joke}</h1>
            </AnimateOnChange>
          )}

          <div id="buttons">
            <AnimateOnChange durationIn={200} durationOut={200}>
              <a
                id="tweet-joke"
                className="btn"
                target="_top"
                href={`https://twitter.com/intent/tweet?text="${joke}`}
              >
                <FontAwesomeIcon
                  icon={faTwitterSquare}
                  size="3x"
                  style={{ color: bgColour }}
                />
              </a>
            </AnimateOnChange>
            <AnimateOnChange durationIn={200} durationOut={200}>
              <button
                id="new-joke-button"
                className="btn"
                onClick={handleNewJoke}
                style={{ backgroundColor: bgColour, color: colour }}
              >
                Another one
              </button>
            </AnimateOnChange>
          </div>
        </div>
      </div>
    </div>
  );
}

const getRandomIndex = () => {
  return Math.floor(Math.random() * colours[0].length);
};

export default App;
