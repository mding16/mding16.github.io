import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { filepathToParsedCSVMap } from "./mockedJson";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

interface REPLInputProps {
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  history: string[];
  setHistory: Dispatch<SetStateAction<string[]>>;
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
  const [filepath, setFilepath] = useState<string>("");

  const [data, setData] = useState<string[][] | undefined>([]); // call setData in loadcsv, call data in view/search?

  // TODO WITH TA: build a handleSubmit function called in button onClick
  function handleSubmit(commandString: string) {
    if (commandString === "verbose") {
      setMode(1);
    } else if (commandString === "brief") {
      setMode(0);
    } else if (
      commandString.length >= 8 &&
      commandString.substring(0, 8) === "loadcsv "
    ) {
      if (
        filepathToParsedCSVMap.has(
          commandString.substring(8, commandString.length)
        )
      ) {
        setData(
          filepathToParsedCSVMap.get(
            commandString.substring(8, commandString.length)
          )
        );
        if (mode === 0) {
          // setFilepath(commandString.substring(8, commandString.length)); // maybe mock this to being a fixed
          props.setHistory([
            ...props.history,
            commandString.substring(8, commandString.length),
          ]);
        } else {
          props.setHistory([
            ...props.history,
            "Command: " + commandString,
            "Output: " + commandString.substring(8, commandString.length),
          ]);
        }
      }
    } else if (commandString === "viewcsv" && data !== undefined) {
      props.setHistory([...props.history, "viewing"]); //
    } else if (
      commandString.length >= 10 &&
      commandString.substring(0, 10) === "searchcsv " &&
      filepath.length != 0
    ) {
      props.setHistory([...props.history, "searching"]);
    }

    setCount(count + 1);
    setCommandString("");
  }
  // TODO: Once it increments, try to make it push commands... Note that you can use the `...` spread syntax to copy what was there before
  // add to it with new commands.
  /**
   * We suggest breaking down this component into smaller components, think about the individual pieces
   * of the REPL and how they connect to each other...
   */
  return (
    <div className="repl-input">
      {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
      {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      {/* TODO WITH TA: Build a handleSubmit function that increments count and displays the text in the button */}
      {/* TODO: Currently this button just counts up, can we make it push the contents of the input box to the history?*/}
      <button onClick={() => handleSubmit(commandString)}>
        Submitted {count} times
      </button>
    </div>
  );
}
