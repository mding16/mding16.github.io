import { useState } from "react";
import "../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";

/**
 * REPL function
 * @returns JSX of REPL UI 
 */
export default function REPL() {
  const [history, setHistory] = useState<JSX.Element[]>([]);

  return (
    <div className="repl">
      <div className = "container1">
        <div className = "history">COMMAND HISTORY</div>
        </div>
      <REPLHistory history={history} />
      <div className = "container1">
        <div className = "history">COMMAND STATUS</div>
      </div>
      <REPLInput history={history} setHistory={setHistory} />
    </div>
  );
}
