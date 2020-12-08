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

class ViewBrandList extends React.Component {
  constructor() {
    super()
    this.updateBrandStatus = this.updateBrandStatus.bind(this)
  }

  componentDidMount() {
    this.overrideTableStyle()
  }

  overrideTableStyle() {
    overrideTableStyle()
  }

  editBrand(brandDetails) {
    this.props.history.push(`/admin/manage-brand/edit/${brandDetails.brand_name}`, brandDetails)
  }
  
  updateBrandStatus(item, isInputClicked) {
    this.props.showDialog({newStatus: isInputClicked, brandName: item.brand_name, brandId: item.id, brandType: item.type})
  }

  render() {  
    const TableHeaderItems = [
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

    const styles = [
      { width: '60px', textAlign: 'center' },
      { width: '30px' },
      { width: '130px' },
      { width: '100px' },
      { width: '100px' },
      { width: '100px' },
      { width: '100px', 'word-break': 'break-word' },
      { width: '60px' },
      { width: '60px', textAlign: 'center' },
      { width: '130px', textAlign: 'center' },
      { width: '90px', textAlign: 'center' },
      { width: '60px', textAlign: 'center' },
      { width: '100px' }
    ];

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
                      {/* <TableRowColumn style={styles[0]}>
                        <Checkbox
                          onCheck={(e) => this.handleCheckboxes(e, item.id)}
                          checked={item.is_checked}
                          name="isChanged"
                          iconStyle={checkboxStyles}
                        />
                      </TableRowColumn> */}
                      <TableRowColumn style={styles[0]}>
                        <FlatButton primary label="Edit" onClick={() => this.editBrand(item)} style={buttonStyles}/>
                      </TableRowColumn>
                      <TableRowColumn style={styles[1]}>{item.id}</TableRowColumn>
                      <TableRowColumn style={styles[2]}>{item.brand_name}</TableRowColumn>
                      <TableRowColumn style={styles[3]}>{item.brand_type}</TableRowColumn>
                      <TableRowColumn style={styles[4]}>{item.genre_id}</TableRowColumn>
                      <TableRowColumn style={styles[5]}>{item.country_of_origin}</TableRowColumn>
                      <TableRowColumn style={styles[6]}>{item.tag}</TableRowColumn>
                      {/* <TableRowColumn style={styles[5]}>{item.is_active ? 'ACTIVE' : 'INACTIVE'}</TableRowColumn> */}
                      <TableRowColumn style={styles[7]}>
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
                      <TableRowColumn style={styles[8]}>{item.alcohol_per}</TableRowColumn>
                      <TableRowColumn style={styles[9]}>{item.temperature}</TableRowColumn>
                      <TableRowColumn style={styles[10]}>{item.is_presentation_enabled === true ? "Enabled" : "Disabled" }</TableRowColumn>
                       <TableRowColumn style={styles[11]}>{item.is_brand_details_enabled === true ? "Enabled" : "Disabled" }</TableRowColumn>
                      <TableRowColumn style={styles[12]}>
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
      </React.Fragment>
    )
  }
}

export default ViewBrandList
