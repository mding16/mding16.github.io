import "../styles/main.css";
import { ModeStatus } from "./StatusComponents/ModeStatus";
import { LoadStatus } from "./StatusComponents/LoadStatus";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { filepathToParsedCSVMap, queryToSearchedCSVMap } from "./mockedJson";
import { unstable_renderSubtreeIntoContainer } from "react-dom";


interface REPLInputProps {
  history: JSX.Element[];
  setHistory: Dispatch<SetStateAction<JSX.Element[]>>;
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  // TODO WITH TA : add a count state
  const [count, setCount] = useState<number>(0);

  const [mode, setMode] = useState<number>(0); // 0 is brief, 1 is verbose

  const [dataLoaded, setDataLoaded] = useState<number>(0); // 0 is data not loaded, 1 is data loaded

  const [data, setData] = useState<string[][]>(); // call setData in loadcsv, call data in view/search?

  // TODO WITH TA: build a handleSubmit function called in button onClick
  function handleSubmit(commandString: string) {
    if (commandString === "mode") {
      if (mode === 0) {
        setMode(1);
      } else {
        setMode(0);
      }
    } else if (
      commandString.length >= 10 &&
      commandString.substring(0, 10) === "load_file "
    ) {
      if (
        filepathToParsedCSVMap.has(
          commandString.substring(10, commandString.length)
        )
      ) {
        setData(
          filepathToParsedCSVMap.get(
            commandString.substring(10, commandString.length)
          )
        );
        setDataLoaded(1);
        if (mode === 0) {
          // setFilepath(commandString.substring(8, commandString.length)); // maybe mock this to being a fixed
          props.setHistory([
            ...props.history,
            <div className={"success"}>Successfully loaded CSV</div>,
          ]);
        } else {
          props.setHistory([
            ...props.history,
            <div className={"command"}>Command: {commandString}</div>,
            <div className={"success"}>Output: successfully loaded csv</div>,
          ]);
        }
      } else {
        if (mode === 0) {
          props.setHistory([
            ...props.history, 
          <div className={"command"}>failed to load csv</div>]);
        } else {
          props.setHistory([
            ...props.history,
            <div className={"command"}>Command: {commandString}</div>,
            <div className={"error"}>Output: failed to load csv</div>,
          ]);
        }
      }
    } else if (commandString === "view" && dataLoaded === 0) {
      if (mode == 0) {
        props.setHistory([...props.history, <div className={"error"}>data not loaded</div>]);
      } else {
        props.setHistory([
          ...props.history,
          <div className={"command"}>Command: {commandString}</div>,
          <div className={"error"}>Output: data not loaded</div>,
        ]);
      }
    } else if (commandString === "view" && dataLoaded === 1) {
      if (mode === 0) {
        props.setHistory([
          ...props.history,
          <table style={{ width: 500 }}>
            <tbody>
              {data!.map((rowContent, rowID) => (
                <tr>
                  {rowContent.map((val, rowID) => (
                    <td key={rowID}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>,
        ]);
      } else {
        props.setHistory([
          ...props.history,
          <div>Command: {commandString}</div>,
          <div>
            Output:
            <table style={{ width: 500 }}>
              <tbody>
                {data!.map((rowContent, rowID) => (
                  <tr>
                    {rowContent.map((val, rowID) => (
                      <td key={rowID}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>,
        ]);
      }
    } else if (
      commandString.length >= 7 &&
      commandString.substring(0, 7) === "search " &&
      dataLoaded === 0
    ) {
      if (mode == 0) {
        props.setHistory([...props.history, <div>data not loaded</div>]);
      } else {
        props.setHistory([
          ...props.history,
          <div className={"command"}>Command: {commandString}</div>,
          <div className={"error"}>Output: data not loaded</div>,
        ]);
      }
    } else if (
      commandString.length >= 7 &&
      commandString.substring(0, 7) === "search " &&
      dataLoaded === 1
    ) {
      if (mode === 0) {
        if (
          queryToSearchedCSVMap.has(
            commandString.substring(7, commandString.length)
          )
        ) {
          props.setHistory([
            ...props.history,
            <table style={{ width: 500 }}>
              <tbody>
                {queryToSearchedCSVMap
                  .get(commandString.substring(7, commandString.length))! // ! to assert it's not undefined
                  .map((rowContent, rowID) => (
                    <tr>
                      {rowContent.map((val, rowID) => (
                        <td key={rowID}>{val}</td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>,
          ]);
        } else if (
          !commandString.substring(7, commandString.length).includes(" ")
        ) {
          props.setHistory([
            ...props.history,
            <div className={"error"}>missing input parameter</div>,
          ]);
        } else {
          props.setHistory([
            ...props.history,
            <div className={"error"}>no such value in given column</div>,
          ]);
        }
      } else {
        if (
          queryToSearchedCSVMap.has(
            commandString.substring(7, commandString.length)
          )
        ) {
          props.setHistory([
            ...props.history,
            <div>Command: {commandString}</div>,
            <div>
              Output:
              <table style={{ width: 500 }}>
                <tbody>
                  {queryToSearchedCSVMap
                    .get(commandString.substring(7, commandString.length))! // ! to assert it's not undefined
                    .map((rowContent, rowID) => (
                      <tr>
                        {rowContent.map((val, rowID) => (
                          <td key={rowID}>{val}</td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>,
          ]);
        } else if (
          !commandString.substring(7, commandString.length).includes(" ")
        ) {
          props.setHistory([
            ...props.history,
            <div>Command: {commandString}</div>,
            <div className={"error"}>Output: missing input parameter</div>,
          ]);
        } else {
          props.setHistory([
            ...props.history,
            <div>Command: {commandString}</div>,
            <div className={"error"}>Output: no such value in given column</div>,
          ]);
        }
      }
    } else {
      if (mode === 0) {
        props.setHistory([
          ...props.history,
          <div className={"error"}>invalid command or forgetting arguments</div>,
        ]);
      } else {
        props.setHistory([
          ...props.history,
          <div>Command: {commandString}</div>,
          <div className={"error"}>Output: invalid command or forgetting arguments</div>,
        ]);
      }
    }
    setCount(count + 1);
    setCommandString("");
  }
  
  return (
    <div className="repl-input">
      <p><ModeStatus mode={mode}></ModeStatus></p>
      <p><LoadStatus loadStatus={dataLoaded}></LoadStatus></p>
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      <button onClick={() => handleSubmit(commandString)}>
        Submitted {count} times
      </button>
    </div>
  );
}
