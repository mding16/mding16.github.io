interface ModeStatusProps {
    mode: Number;
  }

export function ModeStatus (props: ModeStatusProps) {
    if (props.mode === 0){
        return <div className="modestatus">YOU ARE CURRENTLY IN BRIEF MODE</div>
    }
    else{
        return <div className="modestatus">YOU ARE CURRENTLY IN VERBOSE MODE</div>
    }
}