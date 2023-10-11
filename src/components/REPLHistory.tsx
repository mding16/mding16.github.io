import "../styles/main.css";


interface REPLHistoryProps {
  history: JSX.Element[];
}
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {/* This is where command history will go */}
      {/* TODO: To go through all the pushed commands... try the .map() function! */}
      {props.history.map((value) =>
      <div>{value}</div>
      )
      }
    </div>
  );
}
