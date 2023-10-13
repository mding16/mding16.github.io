import '../../styles/main.css';
import { Dispatch, SetStateAction } from 'react';

/**
 * ControlledInputProps interface
 */
interface ControlledInputProps {
    value: string, 
    setValue: Dispatch<SetStateAction<string>>,
    ariaLabel: string 
  }
  

  /**
   * returns controlled input from command input box
   * @param param0 
   * @returns jsx of the input 
   */
  export function ControlledInput({value, setValue, ariaLabel}: ControlledInputProps) {
    return (
      <input type="text" className="repl-command-box"
            value={value} 
            placeholder="start typing command..."
            onChange={(ev) => setValue(ev.target.value)}
            aria-label={ariaLabel}>
      </input>
    );
  }