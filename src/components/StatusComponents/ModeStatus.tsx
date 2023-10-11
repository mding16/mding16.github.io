interface ModeStatusProps {
    mode: boolean;
  }

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