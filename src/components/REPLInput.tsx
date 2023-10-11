import "../styles/main.css";
import { ModeStatus } from "./StatusComponents/ModeStatus";
import { LoadStatus } from "./StatusComponents/LoadStatus";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { filepathToParsedCSVMap, queryToSearchedCSVMap } from "./mockedJson";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { getParsedCommandLineOfConfigFile } from "typescript";


interface REPLInputProps {
  history: JSX.Element[];
  setHistory: Dispatch<SetStateAction<JSX.Element[]>>;
}
export function REPLInput(props: REPLInputProps) {
  const searchLength = 7;
  const loadLength = 10;
  const [commandString, setCommandString] = useState<string>("");
  const [count, setCount] = useState<number>(0);
  const [mode, setMode] = useState<number>(0); // 0 is brief, 1 is verbose
  const [dataLoaded, setDataLoaded] = useState<number>(0); // 0 is data not loaded, 1 is data loaded
  const [data, setData] = useState<string[][] | undefined>(); // call setData in loadcsv, call data in view/search?
  const[csvFilePath, setFilePath] = useState<String>("");

  function handleSubmit(commandString: string) {
    {/* HANDLING COMMAND: mode */}
    if (commandString === "mode") {
      if (mode === 0) {
        setMode(1);
      } else {
        setMode(0);
      }
      
       {/* HANDLING COMMAND: load_file */}
    } else if ( 
      commandString.length >= loadLength &&
      commandString.substring(0, loadLength) === "load_file "
    ) {

      var filePath = commandString.substring(
        loadLength, commandString.length);
      if (filepathToParsedCSVMap.has(filePath)) {
        setData(filepathToParsedCSVMap.get(filePath));
        setDataLoaded(1);
        setFilePath(filePath);
        load_csv_success(props, mode, commandString);

      } else {load_csv_fail(props, mode, commandString)}

      {/* HANDLING COMMAND: view */}
    } else if (commandString === "view" && dataLoaded === 0) {
      view_fail(props, mode, commandString);
    } else if (commandString === "view" && dataLoaded === 1) {
      view_success(props, mode, commandString, data);

      {/* HANDLING COMMAND: search */}
    } else if (
      commandString.length >= searchLength &&
      commandString.substring(0, searchLength) === "search " &&
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
      commandString.length >= searchLength &&
      commandString.substring(0, searchLength) === "search " &&
      dataLoaded === 1
    ) {
      if (mode === 0) {
        if (
          queryToSearchedCSVMap.has(
            commandString.substring(searchLength, commandString.length)
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
          !commandString.substring(searchLength, commandString.length).includes(" ")
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
      error_message(props, mode, commandString)
    }
    setCount(count + 1);
    setCommandString("");
  }
  
  return (
    <div className="repl-input">
      <div className="container">
        <ModeStatus mode={mode}></ModeStatus>
        <LoadStatus loadStatus={dataLoaded} csvFile={csvFilePath}></LoadStatus>
      </div>
      <div className = "container1">
        <div className = "history">COMMANDS</div>
      </div>
      <div className="container2">
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
        <br></br>
        <button onClick={() => handleSubmit(commandString)}>
          <div className="buttontext">Submitted {count} time(s)</div>
        </button>
      </div>
      </div>
  );
}

function load_csv_success(props: REPLInputProps, mode: number, command: string){
  if (mode === 0) {
    props.setHistory([
      ...props.history,
      <div className={"success"}>Successfully loaded CSV</div>,
    ]);
  } else {
    props.setHistory([
      ...props.history,
      <div className={"command"}>Command: {command}</div>,
      <div className={"success"}>Output: successfully loaded csv</div>,
    ]);
  }
}

function load_csv_fail(props: REPLInputProps, mode: number, command: string){
  if (mode === 0) {
    props.setHistory([
      ...props.history, 
    <div className={"error"}>failed to load csv</div>]);
  } else {
    props.setHistory([
      ...props.history,
      <div className={"command"}>Command: {command}</div>,
      <div className={"error"}>Output: failed to load csv</div>,
    ]);
  }
}

function view_fail(props: REPLInputProps, mode: number, command: string){
  if (mode == 0) {
    props.setHistory([...props.history, <div className={"error"}>data not loaded</div>]);
  } else {
    props.setHistory([
      ...props.history,
      <div className={"command"}>Command: {command}</div>,
      <div className={"error"}>Output: data not loaded</div>,
  ]);
  }
}

function view_success(props: REPLInputProps, mode: number, command: string, data: string[][] | undefined){
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
      <div>Command: {command}</div>,
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
}

function error_message(props: REPLInputProps, mode: number, command: string){
  if (mode === 0) {
    props.setHistory([
      ...props.history,
      <div className={"error"}>Invalid command or arguments</div>,
    ]);
  } else {
    props.setHistory([
      ...props.history,
      <div className= {"command"}>Command: {command}</div>,
      <div className={"error"}>Output: Invalid command or arguments</div>,
    ]);
  }
}
