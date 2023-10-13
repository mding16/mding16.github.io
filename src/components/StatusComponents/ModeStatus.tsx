/**
 * ModeStatusProps
 * @field Mode represents boolean where true is brief, false is verbose
 */
interface ModeStatusProps {
    mode: boolean;
  }

  /**
   * Produce JSX object of mode status
   * @param props 
   * @returns jsx of mode (brief or verbose)
   */
export function ModeStatus (props: ModeStatusProps) {
    if (props.mode){
        return <div className="briefmode">BRIEF MODE 
        <br></br> 
        <div className = "smalltext">(type 'mode' to change to verbose)</div>
        </div>
    }
    else{
        return <div className="verbosemode">VERBOSE MODE 
        <br></br>
        <div className = "smalltext">(type 'mode' to change to brief)</div></div>
    }
}