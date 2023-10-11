import { clear } from "console";
import "../styles/main.css";

interface REPLHistoryProps {
  history: JSX.Element[];
}
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className = "container">
      <div className = "command-box">
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
      <div className="repl-history">
      {/* This is where command history will go */}
      {/* TODO: To go through all the pushed commands... try the .map() function! */}
        {props.history.map((value) => <div>{value}</div>)}
      </div>
    </div>
  );}

