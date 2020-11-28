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
import Checkbox from "material-ui/Checkbox"
import RaisedButton from 'material-ui/RaisedButton'

const TableHeaderItems = [
  <Checkbox label="Enabled"/>,
  '',
  'ID',
  'BRAND NAME',
  'BRAND TYPE',
  'GENRE_ID',
  'COUNTRY OF ORIGIN',
  'TAGS',
  'BRAND_LOGO_HIGH_RES',
  'ALCOHOL PERCENTAGE',
  'TEMPERATURE',
  'BRAND STATUS'
]

const styles = [
  { width: '20px' },
  { width: '40px' },
  { width: '30px' },
  { width: '130px' },
  { width: '100px' },
  { width: '100px' },
  { width: '100px' }, 
  { width: '100px' }, 
  { width: '130px' }, 
  { width: '90px' },
  { width: '60px' },
  { width: '100px' }
]

class ViewBrandList extends React.Component {
  constructor() {
    super()

    this.state = {
      newArray: [],
      checked: false,
    }

    this.updateBrandStatus = this.updateBrandStatus.bind(this)
    this.handleCheckboxes = this.handleCheckboxes.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  componentDidMount() {
    this.overrideTableStyle()
  }

  overrideTableStyle() {
    overrideTableStyle()
  }

  handleCheckboxes(e, id) {
    if(e.target.checked) {
      this.setState({newArray: [...this.state.newArray,id]})
      console.log("checked", id);
    }
    else {
      console.log("unchecked", id);
      newArray.remove(id)
    }
    this.setState({ [e.target.name]: e.target.checked })
    console.log("handleCheckboxes", this.state.newArray);
  }

  handleSave () {
    console.log("handleSave");
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
              !this.props.loadingBrandList
                ? (
                  this.props.brandList && this.props.brandList.map(item => (
                    <TableRow key={item.id}>
                      <TableRowColumn style={styles[0]}>
                        <Checkbox
                          onCheck={(e) => this.handleCheckboxes(e, item.id)}
                          name="isModified"
                        />
                      </TableRowColumn>
                      <TableRowColumn style={styles[1]}>
                        <FlatButton primary label="Edit" onClick={() => this.editBrand(item)}/>
                      </TableRowColumn>
                      <TableRowColumn style={styles[2]}>{item.id}</TableRowColumn>
                      <TableRowColumn style={styles[3]}>{item.brand_name}</TableRowColumn>
                      <TableRowColumn style={styles[4]}>{item.brand_type}</TableRowColumn>
                      <TableRowColumn style={styles[5]}>{item.genre_id}</TableRowColumn>
                      <TableRowColumn style={styles[6]}>{item.country_of_origin}</TableRowColumn>
                      <TableRowColumn style={styles[7]}>{item.tag}</TableRowColumn>
                      {/* <TableRowColumn style={styles[5]}>{item.is_active ? 'ACTIVE' : 'INACTIVE'}</TableRowColumn> */}
                      <TableRowColumn style={styles[8]}>
                        <a target="_blank" href={item.brand_logo_high_res_image}>
                          <img
                            alt="brand_logo"
                            style={{
                              width: '40px',
                              height: '40px',
                              objectFit: 'contain'
                            }}
                            src={item.brand_logo_high_res_image}
                          />
                        </a>
                      </TableRowColumn>
                      <TableRowColumn style={styles[9]}>{item.alcohol_per}</TableRowColumn>
                      <TableRowColumn style={styles[10]}>{item.temperature}</TableRowColumn>
                      <TableRowColumn style={styles[11]}>
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
              !this.props.loadingBrandList && !this.props.brandList && 
              <tr>
                <td style={{ textAlign: 'center' }} colSpan='10'>
                  <p style={{fontWeight: '16px'}}>No brands found</p>
                </td>
              </tr>
            }
          </TableBody>
        </Table>
        <RaisedButton
          primary
          label="Save"
          onClick={this.handleSave}
          style={{ marginTop: '40px' }}
        />
      </React.Fragment>
    )
  }
}

export default ViewBrandList
