import React from 'react'
import {
  TableRow,
  TableRowColumn
} from 'material-ui/Table'

function TableLoadingShell(data) {
  return (
    <TableRow className="table-loading-shell">
      {
        [1, 2, 3, 4].map(() => (
          <TableRowColumn></TableRowColumn>
        ))
      }
    </TableRow>
  )
}

export default TableLoadingShell
