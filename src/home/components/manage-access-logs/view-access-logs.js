import React from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'

import TableLoadingShell from './../table-loading-shell'
import '@sass/components/_table.scss'
import Moment from "moment"
import {overrideTableStyle} from '@utils'

const TableHeaderItems = [
  'USER ID',
  'CREATED AT',
  'UPDATED AT',
  'REQUEST TYPE',
  'REQUEST PARAMS',
]

const styles = [
  { width: '60px', 'wordBreak': 'break-word' },
  { width: '130px', 'wordBreak': 'break-word' },
  { width: '130px', 'wordBreak': 'break-word' },
  { width: '100px', 'wordBreak': 'break-word' },
  { width: '500px', 'wordBreak': 'break-word' }
]

class ViewAccessLogs extends React.Component {
  constructor() {
    super()
    //this.updateBrandStatus = this.updateBrandStatus.bind(this)
  }

  componentDidMount() {
    this.overrideTableStyle()
  }

  overrideTableStyle() {
    overrideTableStyle()
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
          >
            {
              !this.props.loadingAccessLogs
                ? (
                  this.props.accessLogs && this.props.accessLogs.map(item => (
                    <TableRow key={item.id}>
                      <TableRowColumn style={styles[0]}>{item.user_id}</TableRowColumn>
                      <TableRowColumn style={styles[1]}>{Moment(item.created_at).format('DD-MM-YYYY h:mm:ss A')}</TableRowColumn>
                      <TableRowColumn style={styles[2]}>{Moment(item.updated_at).format('DD-MM-YYYY h:mm:ss A')}</TableRowColumn>
                      <TableRowColumn style={styles[3]}>{item.request_type}</TableRowColumn>
                      <TableRowColumn style={styles[4]}>{item.request_params}</TableRowColumn>
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
              !this.props.loadingAccessLogs && !this.props.accessLogs && 
              <tr>
                <td style={{ textAlign: 'center' }} colSpan='10'>
                  <p style={{fontWeight: '16px'}}>No logs found</p>
                </td>
              </tr>
            }
          </TableBody>
        </Table>
      </React.Fragment>
    )
  }
}

export default ViewAccessLogs
