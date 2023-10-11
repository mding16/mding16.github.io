interface DataTableProps {
    data: string[][] | undefined
  }

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