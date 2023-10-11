interface LoadStatusProps {
    loadStatus: Number;
  }

export function LoadStatus (props: LoadStatusProps) {
    if (props.loadStatus === 0){
        return <div className="notloaded">DATA NOT LOADED</div>
    }
    else{
        return <div className="loaded">DATA LOADED</div>
    }
}