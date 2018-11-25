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
  'ID',
  'BRAND NAME',
  'ALCOHOL PERCENTAGE',
  'TEMPERATURE',
  'STATUS'
]

const styles = [
  { width: '60px' },
  { width: '30px' },
  { width: '130px' },
  { width: '130px' },
  { width: '60px' }, 
  { width: '70px' }
]

function editBrand(brandDetails, data) {
  data.history.push(`/home/manage-brand/edit-brand/${brandDetails.brand_name}`, brandDetails)
}

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
                      <FlatButton primary label="Edit" onClick={() => editBrand(item, data)}/>
                    </TableRowColumn>
                    <TableRowColumn style={styles[1]}>{item.brand_id}</TableRowColumn>
                    <TableRowColumn style={styles[2]}>{item.brand_name}</TableRowColumn>
                    <TableRowColumn style={styles[3]}>{item.alcohol_per}</TableRowColumn>
                    <TableRowColumn style={styles[4]}>{item.temperature}</TableRowColumn>
                    <TableRowColumn style={styles[5]}>{item.is_active ? 'ACTIVE' : 'INACTIVE'}</TableRowColumn>
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
