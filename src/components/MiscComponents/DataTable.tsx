/**
 * DataTableProps Interface
 * @field data: 2D array of strings representing data 
 */
interface DataTableProps {
    data: string[][] | undefined
  }

  /**
   * DataTable 
   * @param props contains data in a string[][] array
   * @returns exports JSX element representing data table
   */
export function DataTable(props: DataTableProps){
    return(<div className = "tablecontainer">
    <table>
      <tbody>
        {props.data!.map((rowContent, rowID) => (
          <tr>
            {rowContent.map((val, rowID) => (
              <td key={rowID}>{val}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </div>)
}