/**
 * LoadStatusProps
 * @field loadStatus represents whether data is loaded, 0 true, 1 false
 * @field csvFile string of filepath
 */
interface LoadStatusProps {
    loadStatus: Number;
    csvFile: String
  }

/**
 * LoadStatus returns the status of data
 * @param props  
 * @returns jsx of the load status (data loaded or not) + current filepath if loaded
 */
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