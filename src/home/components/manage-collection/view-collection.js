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
  'NAME',
  'DISPLAY NAME',
  'STATUS',
]

const styles = [
  { width: '60px' },
  { width: '30px' },
  { width: '80px' },
  { width: '80px' },
  { width: '80px' },
]

class ViewCollection extends React.Component {
  constructor() {
    super()
    this.updateCollectionStatus = this.updateCollectionStatus.bind(this)
  }

  componentDidMount() {
    this.overrideTableStyle()
  }

  overrideTableStyle() {
    overrideTableStyle()
  }

  editCollection(collectionDetails) {
    this.props.history.push(`/admin/manage-collection/edit/${collectionDetails.id}`, collectionDetails)
  }

  updateCollectionStatus(item, isInputClicked) {
    this.props.showDialog({ newStatus: isInputClicked, collectionName: item.name, id: item.id })
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
              !this.props.loadingCollection
                ? (
                  this.props.collection && this.props.collection.map(item => (
                    <TableRow key={item.id}>
                      <TableRowColumn style={styles[0]}>
                        <FlatButton primary label="Edit" onClick={() => this.editCollection(item)} />
                      </TableRowColumn>
                      <TableRowColumn style={styles[1]}>{item.id}</TableRowColumn>
                      <TableRowColumn style={styles[2]}>{item.name}</TableRowColumn>
                      <TableRowColumn style={styles[3]}>{item.display_name}</TableRowColumn>
                      {/* <TableRowColumn style={styles[4]}>{item.short_name}</TableRowColumn> */}
                      <TableRowColumn style={styles[4]}>
                        <Switch toggled={item.is_active} onToggle={this.updateCollectionStatus} value={item} />
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
              !this.props.loadingCollection && this.props.collection.length === 0 &&
              <tr>
                <td style={{ textAlign: 'center' }} colSpan='6'>
                  <p style={{ fontWeight: '16px' }}>No Collection Found</p>
                </td>
              </tr>
            }
          </TableBody>
        </Table>
      </React.Fragment>
    )
  }
}

export default ViewCollection
