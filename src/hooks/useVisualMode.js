import { useState } from "react";

// return an object with a property mode
export default function useVisualMode(initial) {
  const [ mode, setMode ] = useState(initial);
  const [ history, setHistory ] = useState([initial]);

  // returns current mode
  function transition(change, replace) {
    if (!replace) {
      setHistory(history => ([...history, change]));
    }
    return setMode(change);
  }

  // returns the last mode
  function back() {
    history.pop();
    return setMode(history[history.length - 1]);
  }

  return { mode , transition, back }
}