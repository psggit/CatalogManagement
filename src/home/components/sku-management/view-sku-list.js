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
import CircularProgress from 'material-ui/CircularProgress'
import { NavLink } from 'react-router-dom'
import TableLoadingShell from './../table-loading-shell'
import '@sass/components/_table.scss'

const TableHeaderItems = [
  '',
  'SKU_ID',
  'BRAND NAME',
  'VOLUME',
  'STATUS',
  'CREATED AT'
]

const styles = [
  { width: '60px' },
  { width: '60px' },
  { width: '120px' },
  { width: '60px' },
  { width: '60px' },
  { width: '200px' }
]

function handleClick(e, item, props) {
  let queryObj = {}
  
  if(props.navigateTo !== "editSKU" && !item.is_active) {
    e.preventDefault()
  } else if(props.navigateTo === "editSKU") {
    queryObj = {
      brand_id: item.brand_id,
      sku_id: item.sku_id,
      is_active: item.is_active,
      volume: item.volume,
      image_url: item.image_url,
      high_res_image: item.high_res_image,
      low_res_image: item.low_res_image
    }
    props.history.push(`/home/manage-sku/edit-sku/${item.brand_name}?sku_id=${item.id}&brand_id=${item.brand_id}`, queryObj) 
  } else {
    queryObj = {
      brand_id: item.brand_id,
      brand_name: item.brand_name,
      sku_pricing_id: item.sku_pricing_id,
      is_active: item.is_active,
      volume: item.volume
    }
    props.history.push(`/home/sku-mapping/${item.id}`, queryObj)
  }
}

function ViewSKUList(data) {
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
            !data.loadingSkuList
              ? (
                data.skuList.map((item, i) => {
                  return (
                    <TableRow key={i}>
                      <TableRowColumn style={styles[0]}>
                        {
                          <FlatButton primary label={`${data.navigateTo === "editSKU" ? "EDIT" : "VIEW"}`}
                            onClick={(e) => handleClick(e, item, data)} 
                            style={ data.navigateTo !== 'editSKU' && !item.is_active ? {opacity: 0.55} : {}}  
                          /> 
                        }
                      </TableRowColumn>
                      <TableRowColumn style={styles[1]}>{item.id}</TableRowColumn>
                      <TableRowColumn style={styles[2]}>{item.brand_name}</TableRowColumn>
                      <TableRowColumn style={styles[3]}>{item.volume}</TableRowColumn>
                      <TableRowColumn style={styles[4]}>{item.is_active ? 'ACTIVE' : 'INACTIVE'}</TableRowColumn>
                      <TableRowColumn style={styles[5]}>{item.created_at}</TableRowColumn>
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
        </TableBody>
      </Table>
    </React.Fragment>
  )
}

export default ViewSKUList
