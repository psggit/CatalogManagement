import React from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  //Scrollbars
} from 'material-ui/Table'

import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Switch from '@components/switch'
import CircularProgress from 'material-ui/CircularProgress'
import { NavLink } from 'react-router-dom'
import TableLoadingShell from './../table-loading-shell'
import '@sass/components/_table.scss'

const TableHeaderItems = [
  '',
  'SKU_ID',
  'BRAND NAME',
  'VOLUME',
  // 'STATUS',
  'BRAND ID',
  'SKU STATUS'
]

const styles = [
  { width: '60px' },
  { width: '60px' },
  { width: '120px' },
  { width: '60px' },
  // { width: '60px' },
  { width: '100px' },
  { width: '60px' }
]

class ViewSKUList extends React.Component {

  constructor() {
    super()
    this.updateSKUStatus = this.updateSKUStatus.bind(this)
  }

  handleClick(e, item) {
    let queryObj = {}
    if(this.props.navigateTo !== "editSKU" && !item.is_active) {
      e.preventDefault()
    } 
    if(this.props.navigateTo === "editSKU") {
      queryObj = {
        brand_id: item.brand_id,
        sku_id: item.sku_id,
        is_active: item.is_active,
        volume: item.sku_volume,
        image_url: item.image_url,
        high_res_image: item.high_res_image,
        low_res_image: item.low_res_image
      }
      this.props.history.push(`/admin/manage-sku/edit/${item.brand_name}?sku_id=${item.sku_id}&brand_id=${item.brand_id}`, queryObj) 
    } else {
      queryObj = {
        brand_id: item.brand_id,
        brand_name: item.brand_name,
        //sku_pricing_id: item.sku_pricing_id,
        is_active: item.is_active,
        volume: item.sku_volume
      }
      this.props.history.push(`/admin/sku-mapping/${item.sku_id}`, queryObj)
    }
  }

  updateSKUStatus(item, isInputClicked) {
    //console.log("item switch", item)
    this.props.showDialog({newStatus: isInputClicked, skuId: item.sku_id, brandName: item.brand_name, volume: item.sku_volume})
  }

  render() {
    const NoSKUsNotification = (!this.props.loadingSkuList && !this.props.skuList) || 
    (!this.props.loadingSkuList && this.props.skuList && this.props.skuList.length === 0)
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
              !this.props.loadingSkuList
                ? (
                  this.props.skuList && this.props.skuList.map((item, i) => {
                    return (
                      <TableRow key={i}>
                        <TableRowColumn style={styles[0]}>
                          {
                            <FlatButton primary label={`${this.props.navigateTo === "editSKU" ? "EDIT" : "VIEW"}`}
                              onClick={(e) => this.handleClick(e, item)} 
                              // style={ data.navigateTo !== 'editSKU' && !item.is_active ? {opacity: 0.55} : {}}  
                            /> 
                          }
                        </TableRowColumn>
                        <TableRowColumn style={styles[1]}>{item.sku_id}</TableRowColumn>
                        <TableRowColumn style={styles[2]}>{item.brand_name}</TableRowColumn>
                        <TableRowColumn style={styles[3]}>{item.sku_volume}</TableRowColumn>
                        {/* <TableRowColumn style={styles[4]}>{item.is_active ? 'ACTIVE' : 'INACTIVE'}</TableRowColumn> */}
                        <TableRowColumn style={styles[4]}>{item.brand_id}</TableRowColumn>
                        <TableRowColumn style={styles[5]}>
                            <Switch toggled={item.is_active} onToggle={this.updateSKUStatus} value={item} />
                        </TableRowColumn>
                      </TableRow>
                    )
                  })
                )
                : (
                  [1, 2, 3, 4, 5].map(() => (
                    <TableLoadingShell />
                  ))
                )
            }
            {
              !this.props.loadingSkuList && !this.props.skuList && 
              <tr>
                <td style={{ textAlign: 'center' }} colSpan='7'>
                  <p style={{fontWeight: '16px'}}>No SKUs found</p>
                </td>
              </tr>
            }
          </TableBody>
        </Table>
      </React.Fragment>
    )
  }
  
}

export default ViewSKUList
