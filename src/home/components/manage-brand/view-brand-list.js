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

class ViewBrandList extends React.Component {
  constructor() {
    super()

    this.state = {
      newArray: [],
      checked: false,
      brandList: [],
    }

    this.updateBrandStatus = this.updateBrandStatus.bind(this)
    this.handleCheckboxes = this.handleCheckboxes.bind(this)
    this.handleSelectAll = this.handleSelectAll.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  componentDidMount() {
    this.overrideTableStyle()
  }

  componentDidUpdate(prevProps) {
    if (this.props.brandList !== prevProps.brandList) {
      this.setState({brandList: this.props.brandList});
    }
  }

  overrideTableStyle() {
    overrideTableStyle()
  }

  handleCheckboxes (e,id) {
    this.setState({brandList: this.state.brandList.map(b => {
      if(b.id === id) {
        let data = {}
       data = b
       data.is_checked = !b.is_checked
       return data
      }
      return b;
    })
  })
}

  handleSelectAll(e) {
    if (e.target.checked) {
      const newBrandList = this.state.brandList.map((b) => ({
        ...b,is_checked:true
      }))
      this.setState({brandList: newBrandList})
      console.log("handleSelectAll", this.state.newArray);
    }
  }

  handleSave () {
    let newArray = this.state.brandList.filter((b) => b.is_checked).map(b => b.id)
    console.log("handleSave",newArray);
  }

  editBrand(brandDetails) {
    this.props.history.push(`/admin/manage-brand/edit/${brandDetails.brand_name}`, brandDetails)
  }
  
  updateBrandStatus(item, isInputClicked) {
    this.props.showDialog({newStatus: isInputClicked, brandName: item.brand_name, brandId: item.id, brandType: item.type})
  }

  render() {  
    const TableHeaderItems = [
      <Checkbox
        label="Enabled"
        onCheck={(e) => this.handleSelectAll(e)}
      />,
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
                  this.state.brandList && this.state.brandList.map(item => (
                    <TableRow key={item.id}>
                      <TableRowColumn style={styles[0]}>
                        <Checkbox
                          onCheck={(e) => this.handleCheckboxes(e, item.id)}
                          checked={item.is_checked}
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
              !this.props.loadingBrandList && !this.state.brandList && 
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
