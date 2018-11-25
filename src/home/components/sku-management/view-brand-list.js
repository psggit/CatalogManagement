import React from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'

import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import CircularProgress from 'material-ui/CircularProgress'
import { NavLink } from 'react-router-dom'
import TableLoadingShell from './../table-loading-shell'
import '@sass/components/_table.scss'

const TableHeaderItems = [
  '',
  'BRAND ID',
  'BRAND NAME',
  'STATUS'
]

const styles = [
  { width: '60px' },
  { width: '60px' },
  { width: '120px' },
  { width: '60px' }
]

function ViewBrandList(data) {
  return (
    <React.Fragment>
      <Table
        className="bordered--table"
        selectable={false}
        fixedHeader
      >
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            {
              TableHeaderItems.map((item, i) => <TableHeaderColumn style={styles[i]} key={`table-head-col-${i}`}>{item}</TableHeaderColumn>)
            }
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
          showRowHover
        >
          {
            !data.loadingBrandList
              ? (
                data.brandList.map(item => (
                  <TableRow key={item.brand_id}>
                    <TableRowColumn style={styles[0]}>
                      <NavLink
                        // target="_blank"
                        // exact
                        // to={`/home/manage-cities/${item.name}?id=${item.id}`}
                        to={`/home/manage-sku/list-sku/${item.brand_name}?brand_id=${item.brand_id}`}
                      >
                        <FlatButton primary label="View" />
                      </NavLink>
                    </TableRowColumn>
                    <TableRowColumn style={styles[1]}>{item.brand_id}</TableRowColumn>
                    <TableRowColumn style={styles[2]}>{item.brand_name}</TableRowColumn>
                    <TableRowColumn style={styles[3]}>{item.is_active ? 'ACTIVE' : 'INACTIVE'}</TableRowColumn>
                  </TableRow>
                ))
              )
              : (
                [1, 2, 3, 4, 5].map(() => (
                  <TableLoadingShell />
                ))
              )
          }
        </TableBody>
      </Table>
    </React.Fragment>
  )
}

export default ViewBrandList
