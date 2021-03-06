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
import {overrideTableStyle} from '@utils'

const TableHeaderItems = [
  '',
  'ID',
  'GENRE NAME',
  // 'GENRE SHORT NAME',
  'ORDINAL POSITION',
  'DISPLAY NAME',
  'IMAGE',
  'STATUS',
]

const styles = [
  { width: '60px' },
  { width: '30px' },
  { width: '130px' },
  // { width: '100px' },
  { width: '100px' }, 
  { width: '130px' }, 
  { width: '90px' },
  { width: '60px' },
]

class ViewGenreList extends React.Component {
  constructor() {
    super()
    this.updateGenreStatus = this.updateGenreStatus.bind(this)
  }

  componentDidMount() {
    this.overrideTableStyle()
  }

  overrideTableStyle() {
    overrideTableStyle()
  }

  editGenre(genreDetails) {
    this.props.history.push(`/admin/manage-genre/edit/${genreDetails.genre_name}`, genreDetails)
  }
  
  updateGenreStatus(item, isInputClicked) {
    this.props.showDialog({newStatus: isInputClicked, genreName: item.genre_name, genreId: item.id})
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
              !this.props.loadingGenreList
                ? (
                  this.props.genreList && this.props.genreList.map(item => (
                    <TableRow key={item.id}>
                      <TableRowColumn style={styles[0]}>
                        <FlatButton primary label="Edit" onClick={() => this.editGenre(item)}/>
                      </TableRowColumn>
                      <TableRowColumn style={styles[1]}>{item.id}</TableRowColumn>
                      <TableRowColumn style={styles[2]}>{item.genre_name}</TableRowColumn>
                      {/* <TableRowColumn style={styles[3]}>{item.short_name}</TableRowColumn> */}
                      <TableRowColumn style={styles[3]}>{item.ordinal_position}</TableRowColumn>
                      <TableRowColumn style={styles[4]}>{item.display_name}</TableRowColumn>
                      <TableRowColumn style={styles[5]}>
                        <a target="_blank" href={item.image}>
                          <img
                            alt="_logo"
                            style={{
                              width: '40px',
                              height: '40px',
                              objectFit: 'contain'
                            }}
                            src={item.image}
                          />
                        </a>
                      </TableRowColumn>
                      <TableRowColumn style={styles[6]}>
                        <Switch toggled={item.is_active} onToggle={this.updateGenreStatus} value={item} />
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
              !this.props.loadingGenreList && !this.props.genreList && 
              <tr>
                <td style={{ textAlign: 'center' }} colSpan='6'>
                  <p style={{fontWeight: '16px'}}>No genres found</p>
                </td>
              </tr>
            }
          </TableBody>
        </Table>
      </React.Fragment>
    )
  }
}

export default ViewGenreList
