import "../styles/main.css";
import { ModeStatus } from "./StatusComponents/ModeStatus";
import { LoadStatus } from "./StatusComponents/LoadStatus";
import { DataTable } from "./MiscComponents/DataTable";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./MiscComponents/ControlledInput";
import {
  filepathToParsedCSVMap,
  queryToSearchedCSVMap,
} from "./Mock/mockedJson";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import {
  getParsedCommandLineOfConfigFile,
  isJSDocCommentContainingNode,
} from "typescript";

/**
 * REPLInputProps
 * @field history: list of JSX elements representing command hsitory
 * @field setHistory: history setter
 */
interface REPLInputProps {
  history: JSX.Element[];
  setHistory: Dispatch<SetStateAction<JSX.Element[]>>;
}

/** number representing num of characters in "search " command */
const searchLength = 7;
/** number representing num of characters in "load_file " command */
const loadLength = 10;

/**
 * REPLInput
 * @param props represents REPLInputProps
 * @returns REPL input UI (mode status & data load, command input bar, submit button)
 */
export function REPLInput(props: REPLInputProps) {
  const [commandString, setCommandString] = useState<string>(""); // represents command string
  const [count, setCount] = useState<number>(0); // represents number of times button submitted
  const [dataLoaded, setDataLoaded] = useState<number>(0); // 0 is data not loaded, 1 is data loaded
  const [data, setData] = useState<string[][] | undefined>(); // call setData in loadcsv, call data in view/search
  const [csvFilePath, setFilePath] = useState<String>(""); // used for accessing our mock data map's "CSVs"
  const [briefmode, setMode] = useState<boolean>(true); // briefmode = true, verbosemode = false


  function handleSubmit(commandString: string) {
    {
      /* HANDLING COMMAND: mode */
    }
    if (commandString === "mode") {
      setMode(!briefmode);

      {
        /* HANDLING COMMAND: load_file */
      }
    } else if (
      commandString.length >= loadLength &&
      commandString.substring(0, loadLength) === "load_file "
    ) {
      var filePath = commandString.substring(loadLength, commandString.length);
      if (filepathToParsedCSVMap.has(filePath)) {
        setData(filepathToParsedCSVMap.get(filePath));
        setDataLoaded(1);
        setFilePath(filePath);
        load_csv_success(props, briefmode, commandString);
      } else {
        load_csv_fail(props, briefmode, commandString);
      }

      {
        /* HANDLING COMMAND: view */
      }
    } else if (commandString === "view" && dataLoaded === 0) {
      view_fail(props, briefmode, commandString);
    } else if (commandString === "view" && dataLoaded === 1) {
      view_success(props, commandString, briefmode, data);

      {
        /* HANDLING COMMAND: search */
      }
    } else if (
      commandString.length >= searchLength &&
      commandString.substring(0, searchLength) === "search " &&
      dataLoaded === 0
    ) {
      search_not_loaded(props, briefmode, commandString);
    } else if (
      commandString.length >= searchLength &&
      commandString.substring(0, searchLength) === "search " &&
      dataLoaded === 1
    ) {
      search_loaded(props, briefmode, commandString);
    } else {
      error_message(props, briefmode, commandString);
    }

    {
      /* Updating Submit Button */
    }
    setCount(count + 1);
    setCommandString("");
  }

  {
    /* RETURNING REPL INPUT OUTPUT */
  }
  return (
    <div className="repl-input">
      <div className="container">
        {/* MODE STATUS & DATA LOAD STATUS BARS */}
        <ModeStatus mode={briefmode}></ModeStatus>
        <LoadStatus loadStatus={dataLoaded} csvFile={csvFilePath}></LoadStatus>
      </div>
      <div className="container1">
        <div className="history">COMMANDS</div>
      </div>

      {/* COMMAND INPUT BAR */}
      <div className="container2">
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
        <br></br>

        {/* SUBMIT BUTTON */}
        <button onClick={() => handleSubmit(commandString)}>
          <div className="buttontext">Submitted {count} time(s)</div>
        </button>
      </div>
    </div>
  );
}

/**
 * Function to update history based on mode for load_file command (SUCCESS)
 * @param props represents props
 * @param briefmode boolean representing if mode = briefmode 
 * @param command string represents current command
 */
function load_csv_success(
  props: REPLInputProps,
  briefmode: boolean,
  command: string
) {
  if (briefmode) {
    props.setHistory([
      ...props.history,
      <div className={"success"}>successfully loaded csv</div>,
    ]);
  } else {
    props.setHistory([
      ...props.history,
      <div className={"command"}>Command: {command}</div>,
      <div className={"success"}>Output: successfully loaded csv</div>,
    ]);
  }
}

/**
 * Function to update history based on mode for load_file command (FAIL)
 * @param props represents props
 * @param briefmode boolean representing if mode = briefmode 
 * @param command string represents current command
 */
function load_csv_fail(
  props: REPLInputProps,
  briefmode: boolean,
  command: string
) {
  if (briefmode) {
    props.setHistory([
      ...props.history,
      <div className={"error"}>failed to load csv</div>,
    ]);
  } else {
    props.setHistory([
      ...props.history,
      <div className={"command"}>Command: {command}</div>,
      <div className={"error"}>Output: failed to load csv</div>,
    ]);
  }
}

/**
 * Function to update history based on mode for view command (FAIL)
 * @param props represents props
 * @param briefmode boolean representing if mode = briefmode 
 * @param command string represents current command
 */
function view_fail(props: REPLInputProps, briefmode: boolean, command: string) {
  if (briefmode) {
    props.setHistory([
      ...props.history,
      <div className={"error"}>data not loaded</div>,
    ]);
  } else {
    props.setHistory([
      ...props.history,
      <div className={"command"}>Command: {command}</div>,
      <div className={"error"}>Output: data not loaded</div>,
    ]);
  }
}

/**
 * Function to update history based on mode for view command (SUCCESS)
 * @param props represents props
 * @param briefmode boolean representing if mode = briefmode 
 * @param command string represents current command
 */
function view_success(
  props: REPLInputProps,
  command: string,
  briefmode: boolean,
  data: string[][] | undefined
) {
  if (briefmode) {
    props.setHistory([...props.history, <DataTable data={data}></DataTable>]);
  } else {
    props.setHistory([
      ...props.history,
      <div className={"command"}>Command: {command}</div>,
      <div className={"success"}>Output:</div>,
      <DataTable data={data}></DataTable>,
    ]);
  }
}

/**
 * Function to update history for error messages
 * @param props represents props
 * @param briefmode boolean representing if mode = briefmode 
 * @param command string represents current command
 */
function error_message(
  props: REPLInputProps,
  briefmode: boolean,
  command: string
) {
  if (briefmode) {
    props.setHistory([
      ...props.history,
      <div className={"error"}>invalid command or arguments</div>,
    ]);
  } else {
    props.setHistory([
      ...props.history,
      <div className={"command"}>Command: {command}</div>,
      <div className={"error"}>Output: invalid command or arguments</div>,
    ]);
  }
}

/**
 * Function to update history for search command (if data is not loaded)
 * @param props represents props
 * @param briefmode boolean representing if mode = briefmode 
 * @param command string represents current command
 */
function search_not_loaded(
  props: REPLInputProps,
  briefmode: boolean,
  command: string
) {
  if (briefmode) {
    props.setHistory([
      ...props.history,
      <div className={"error"}>data not loaded</div>,
    ]);
  } else {
    props.setHistory([
      ...props.history,
      <div className={"command"}>Command: {command}</div>,
      <div className={"error"}>Output: data not loaded</div>,
    ]);
  }
}

/**
 * Function to update history for search command (if data is loaded)
 * @param props represents props
 * @param briefmode boolean representing if mode = briefmode 
 * @param command string represents current command
 */
function search_loaded(
  props: REPLInputProps,
  briefmode: boolean,
  command: string
) {
  var searchString = command.substring(searchLength, command.length);
  var validArguments = command
    .substring(searchLength, command.length)
    .includes(" ");
  var searchValid = queryToSearchedCSVMap.has(searchString);

  if (validArguments) {
    if (searchValid) {
      if (briefmode) {
        var data = queryToSearchedCSVMap.get(searchString);
        props.setHistory([
          ...props.history,
          <DataTable data={data}></DataTable>,
        ]);
      }

      if (!briefmode) {
        var data = queryToSearchedCSVMap.get(searchString);
        props.setHistory([
          ...props.history,
          <div className={"command"}>Command: {command}</div>,
          <div className={"success"}>Output:</div>,
          <DataTable data={data}></DataTable>,
        ]);
      }
    }

    if (!searchValid) {
      if (briefmode) {
        props.setHistory([
          ...props.history,
          <div className={"error"}>query not found in given column</div>,
        ]);
      }

      if (!briefmode) {
        props.setHistory([
          ...props.history,
          <div className={"command"}>Command: {command}</div>,
          <div className={"error"}>
            Output: query not found in given column
          </div>,
        ]);
      }
    }
  }

  if (!validArguments) {
    if (briefmode) {
      props.setHistory([
        ...props.history,
        <div className={"error"}>invalid number of arguments</div>,
      ]);
    }

    if (!briefmode) {
      props.setHistory([
        ...props.history,
        <div className={"command"}>Command: {command}</div>,
        <div className={"error"}>Output: invalid number of arguments</div>,
      ]);
    }
  }
}
