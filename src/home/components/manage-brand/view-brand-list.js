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
import Switch from '@components/switch'

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

// function editBrand(brandDetails, data) {
//   data.history.push(`/admin/manage-brand/edit/${brandDetails.brand_name}`, brandDetails)
// }

// function updateBrandStatus(item, isInputClicked) {
//   data.showDialog({newStatus: isInputClicked, brandName: item.brand_name, volume: item.volume})
// }

class ViewBrandList extends React.Component {
  constructor() {
    super()
    this.updateBrandStatus = this.updateBrandStatus.bind(this)
  }

  editBrand(brandDetails) {
    this.props.history.push(`/admin/manage-brand/edit/${brandDetails.brand_name}`, brandDetails)
  }
  
  updateBrandStatus(item, isInputClicked) {
    this.props.showDialog({newStatus: isInputClicked, brandName: item.brand_name, brandId: item.id, brandType: item.type})
  }

  render() {
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
              !this.props.loadingBrandList
                ? (
                  this.props.brandList && this.props.brandList.map(item => (
                    <TableRow key={item.id}>
                      <TableRowColumn style={styles[0]}>
                        <FlatButton primary label="Edit" onClick={() => this.editBrand(item)}/>
                      </TableRowColumn>
                      <TableRowColumn style={styles[1]}>{item.id}</TableRowColumn>
                      <TableRowColumn style={styles[2]}>{item.brand_name}</TableRowColumn>
                      <TableRowColumn style={styles[3]}>{item.alcohol_per}</TableRowColumn>
                      <TableRowColumn style={styles[4]}>{item.temperature}</TableRowColumn>
                      {/* <TableRowColumn style={styles[5]}>{item.is_active ? 'ACTIVE' : 'INACTIVE'}</TableRowColumn> */}
                      <TableRowColumn style={styles[5]}>
                        <Switch toggled={item.is_active} onToggle={this.updateBrandStatus} value={item} />
                      </TableRowColumn>
                    </TableRow>
                  ))
                )
                : (
                  [1, 2, 3, 4, 5].map(() => (
                    <TableLoadingShell />
                  ))
                )
            }
            {
              !this.props.loadingBrandList && this.props.brands && this.props.brands.length === 0 &&
              <tr>
                <td style={{ textAlign: 'center' }} colSpan='7'>
                  <p style={{fontWeight: '16px'}}>No brands found</p>
                </td>
              </tr>
            }
          </TableBody>
        </Table>
      </React.Fragment>
    )
  }
}

export default ViewBrandList
