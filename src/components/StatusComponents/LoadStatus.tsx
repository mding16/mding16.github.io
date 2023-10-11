interface LoadStatusProps {
    loadStatus: Number;
    csvFile: String
  }

export function LoadStatus (props: LoadStatusProps) {
    if (props.loadStatus === 0){
        return <div className="notloaded">
            DATA NOT LOADED
            <br></br>
            <div className="smalltext">
                (type 'load_file filePath' to load data)
            </div>
            </div>
    }
    else{
        return <div className="loaded">
            DATA LOADED: 
            <br></br>
            <div className="smalltext">{props.csvFile}</div>
            </div>
    }
}