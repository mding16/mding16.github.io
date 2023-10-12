import { clear } from "console";
import "../styles/main.css";

/**
 * REPLHistoryProps
 * @field history: array of JSX elements representing command history 
 */
interface REPLHistoryProps {
  history: JSX.Element[];
}

/**
 * REPLHistory
 * @param props contains command history
 * @returns each JSX element in history array 
 */
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="container">
      {/** LEFT OF REPL HISTORY UI: LIST OF VALID COMMANDS */}
      <div className="command-box">
        VALID COMMANDS:
        <hr></hr>
        load_file "filepath"
        <hr></hr>
        view
        <hr></hr>
        search "identifier" "tosearch"
        <hr></hr>
        mode
        <hr></hr>
      </div>

      {/** RIGHT OF REPL HISTORY UI: COMMAND HISTORY */}
      <div className="repl-history" data-testid="repl-history">
        {props.history.map((value) => (
          <div>{value}</div>
        ))}
      </div>
    </div>
  );
}
