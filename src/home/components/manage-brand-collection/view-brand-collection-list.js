import React from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'

import FlatButton from 'material-ui/FlatButton'
import TableLoadingShell from './../table-loading-shell'
import '@sass/components/_table.scss'
import Switch from '@components/switch'
import { overrideTableStyle } from '@utils'

const TableHeaderItems = [
  '',
  'ID',
  'COLLECTION_ID',
  'BRAND_ID',
  'LISTING_ORDER',
  'STATUS'
]

const styles = [
  { width: '60px' },
  { width: '30px' },
  { width: '130px' },
  { width: '100px' },
  { width: '100px' },
  { width: '100px' }
]

class ViewBrandCollection extends React.Component {
  constructor() {
    super()
    this.updateBrandCollectionStatus = this.updateBrandCollectionStatus.bind(this)
  }

  componentDidMount() {
    this.overrideTableStyle()
  }

  overrideTableStyle() {
    overrideTableStyle()
  }

  editBrandCollection(brandCollectionDetails) {
    this.props.history.push(`/admin/manage-brand-collection/edit/${brandCollectionDetails.id}`, brandCollectionDetails)
  }

  updateBrandCollectionStatus(item, isInputClicked) {
    console.log("status", isInputClicked)
    this.props.showDialog({ newStatus: isInputClicked, id: item.id })
  }

  render() {
    return (
      <React.Fragment>
        <Table
          wrapperStyle={{ height: 'auto' }}
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
              !this.props.loadingBrandCollectionList
                ? (
                  this.props.brandCollectionList && this.props.brandCollectionList.map(item => (
                    <TableRow key={item.id}>
                      <TableRowColumn style={styles[0]}>
                        <FlatButton primary label="Edit" onClick={() => this.editBrandCollection(item)} />
                      </TableRowColumn>
                      <TableRowColumn style={styles[1]}>{item.id}</TableRowColumn>
                      <TableRowColumn style={styles[2]}>{item.collection_id}</TableRowColumn>
                      <TableRowColumn style={styles[3]}>{item.brand_id}</TableRowColumn>
                      <TableRowColumn style={styles[4]}>{item.listing_order}</TableRowColumn>
                      <TableRowColumn style={styles[5]}>
                        <Switch toggled={item.is_active} onToggle={this.updateBrandCollectionStatus} value={item} />
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
              !this.props.loadingBrandCollectionList && this.props.brandCollectionList.length === 0 &&
              <tr>
                <td style={{ textAlign: 'center' }} colSpan='10'>
                  <p style={{ fontWeight: '16px' }}>No brand collections found</p>
                </td>
              </tr>
            }
          </TableBody>
        </Table>
      </React.Fragment>
    )
  }
}

export default ViewBrandCollection
