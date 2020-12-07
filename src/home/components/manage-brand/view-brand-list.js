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
import Toggle from 'material-ui/Toggle';

class ViewBrandList extends React.Component {
  constructor() {
    super()

    this.state = {
      modifiedArray: [],
      mapArray: {},
      checked: false,
      isModified: false,
      presentationEnabled: false,
      brandEnabled: false,
      hideColumns: false,
      brandList: [],
    }

    this.updateBrandStatus = this.updateBrandStatus.bind(this)
    this.handleCheckboxes = this.handleCheckboxes.bind(this)
    this.handleSelectAll = this.handleSelectAll.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleSaveData = this.handleSaveData.bind(this)
    this.fnHideColumn = this.fnHideColumn.bind(this)
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
        ...b,
        is_checked:true
      }))
      this.setState({...this.state, brandList: newBrandList})
      // console.log("handleSelectAll", this.state.brandList);
    }
    else if (!e.target.checked) {
      const newBrandList = this.state.brandList.map((b) => ({
        ...b,
        is_checked:false
      }))
      this.setState({...this.state, brandList: newBrandList})
    }
  }

  fnHideColumn() {
    this.setState({
      ...this.state,
      hideColumns: !this.state.hideColumns,
    })
  }

  handleSave (stateKey) {
    let tempArray = {};
    const newArray = this.state.brandList.filter((b) => b.is_checked).map((b) => {
     
      if(stateKey === "presentation"){
        b.is_presentation_enabled = !this.state.presentationEnabled;
        tempArray[b.id] = {
          ...this.state.mapArray[b.id],
          is_presentation_enabled: b.is_presentation_enabled
        }
        return b;
      }
      if(stateKey === "brand"){
        b.is_brand_details_enabled = !this.state.brandEnabled;
        tempArray[b.id] = {
          ...this.state.mapArray[b.id],
          is_brand_details_enabled: b.is_brand_details_enabled
        }
        return b;
      }
    })

    if(stateKey === "presentation"){
      this.setState({
        ...this.state,
        presentationEnabled: !this.state.presentationEnabled,
        isModified: (newArray.length > 0 || this.state.modifiedArray.length > 0) ? true : false,
        modifiedArray: newArray.length > 0 ? [...this.state.modifiedArray, ...newArray] : this.state.modifiedArray,
        mapArray: newArray.length > 0 ? {...this.state.mapArray, ...tempArray} : this.state.mapArray,
      });
    } else {
      this.setState({
        ...this.state,
        brandEnabled: !this.state.brandEnabled,
        isModified: (newArray.length > 0 || this.state.modifiedArray.length > 0) ? true : false,
        modifiedArray: newArray.length > 0 ? [...this.state.modifiedArray, ...newArray] : this.state.modifiedArray,
        mapArray: newArray.length > 0 ? {...this.state.mapArray, ...tempArray} : this.state.mapArray,
      });
    }
  }

  handleSaveData () {
    this.setState({
      ...this.state,
      isModified: false,
    });

    let payload = {
      brand_details: this.state.modifiedArray
    }
    // console.log("payload data needs to be recreated");
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
        label=""
        onCheck={(e) => this.handleSelectAll(e)}
      />,
      'EDIT',
      'ID',
      'BRAND NAME',
      'BRAND TYPE',
      'GENRE ID',
      'COUNTRY OF ORIGIN',
      'TAGS',
      'BRAND LOGO HIGH RES',
      'ALCOHOL PERCENTAGE',
      'TEMPERATURE',
      'PRESENTATION',
      'BRAND DETAILS',
      'BRAND STATUS'
    ]

    let styles = this.state.hideColumns ? ([
      { width: '24px', padding: '10px' },
      { width: '60px', padding: '0', textAlign: 'center' },
      { width: '30px' },
      { width: '130px' },
      { width: '50px', display: 'none' },
      { width: '40px', display: 'none' },
      { width: '40px', display: 'none' },
      { width: '100px', 'word-break': 'break-word', display: 'none' },
      { width: '60px', display: 'none' },
      { width: '60px', textAlign: 'center', display: 'none' },
      { width: '60px', textAlign: 'center', display: 'none' },
      { width: '60px', textAlign: 'center' },
      { width: '60px', textAlign: 'center' },
      { width: '100px' }
    ]) : ([
      { width: '24px', padding: '10px' },
      { width: '60px', padding: '0', textAlign: 'center' },
      { width: '30px' },
      { width: '130px' },
      { width: '50px' },
      { width: '40px' },
      { width: '40px' },
      { width: '100px', 'word-break': 'break-word' },
      { width: '60px' },
      { width: '60px', textAlign: 'center' },
      { width: '60px', textAlign: 'center' },
      { width: '60px', textAlign: 'center' },
      { width: '60px', textAlign: 'center' },
      { width: '100px' }
    ])

    const buttonStyles = {
      width: "auto",
      padding: 0,
      minWidth: 0,
    }

    const checkboxStyles = {
      marginRight: 0,
    }

    return (
      <React.Fragment>
        <div>
          <div style={{width: "60%", float: "left"}}>
          <Toggle
            label="Presentation"
            style={{width:"15%", marginRight:"10px", float: "left"}}
            onToggle={() => this.handleSave("presentation")}
          />
          <Toggle
            label="Brands"
            style={{width:"15%", marginBottom:"10px"}}
            onToggle={() => this.handleSave("brand")}
          />
          </div>
          <div style={{width:"20%", float:"right"}}>
          <Toggle
            label="Hide Columns"
            onToggle={() => this.fnHideColumn()}
          />
          </div>
          <div style={{clear: "left", textAlign: "right"}}>
            <RaisedButton
              primary
              label="Save"
              onClick={this.handleSaveData}
              style={{ marginBottom: '20px' }}
              disabled={this.state.isModified === false}
            />
          </div>
        </div>
        <Table
          wrapperStyle={{ height: 'auto', clear: 'left' }}
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
                          name="isChanged"
                          iconStyle={checkboxStyles}
                        />
                      </TableRowColumn>
                      <TableRowColumn style={styles[1]}>
                        <FlatButton primary label="Edit" onClick={() => this.editBrand(item)} style={buttonStyles}/>
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
                      <TableRowColumn style={styles[11]}>{item.is_presentation_enabled === true ? "Enabled" : "Disabled" }</TableRowColumn>
                       <TableRowColumn style={styles[12]}>{item.is_brand_details_enabled === true ? "Enabled" : "Disabled" }</TableRowColumn>
                      <TableRowColumn style={styles[13]}>
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
      </React.Fragment>
    )
  }
}

export default ViewBrandList
