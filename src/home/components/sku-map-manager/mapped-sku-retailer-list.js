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
import Checkbox from 'material-ui/Checkbox'

const styles = [
  { width: '38px', textAlign: 'center' },
  { width: '60px', textAlign: 'center' },
  { width: '120px', textAlign: 'center' },
  { width: '120px', textAlign: 'center' },
  { width: '60px', textAlign: 'center' }
  // { width: '38px', textAlign: 'center' }
]

class MappedStatesList extends React.Component {
  constructor() {
    super()
    this.state = {
      mappedRetailersList: [],
      mappedRetailersMap: {},
      selectedRetailerId: 0
    }

    this.unMapRetailer = this.unMapRetailer.bind(this)
  }

  componentDidMount() {
    this.mapRetailers()
  }

  componentDidUpdate(prevProps) {
    if (this.props.mappedRetailersData !== prevProps.mappedRetailersData) {
      this.mapRetailers()
    }
    // } else if (prevProps.disableSave !== this.props.disableSave && !this.props.disableSave) {
    //   let updatedRetailerMap = Object.assign({}, this.state.mappedRetailersMap)
    //   updatedRetailerMap[this.state.selectedRetailerId].modified = false
    //   this.setState({ mappedRetailersMap: updatedRetailerMap })
    // }
  }

  mapRetailers() {
    let mappedRetailers = {}
    let mappedRetailersData = this.props.mappedRetailersData.map((item) => {
      mappedRetailers[item.retailer_id] = {
        retailer_id: item.retailer_id,
        state_short_name: item.state_short_name,
        city_name: item.city_name,
        is_active: item.is_active,
        is_modified: false
      }
    })
    this.setState({mappedRetailersMap: mappedRetailers, mappedRetailersList: Object.values(mappedRetailers)})
  }

  enableInputBox(retailerId) {
    let updatedRetailerMap = Object.assign({}, this.state.mappedRetailersMap)
    if (!updatedRetailerMap[retailerId].modified) {
      updatedRetailerMap[retailerId].modified = true
      this.setState({ selectedRetailerId: retailerId, mappedRetailersMap: updatedRetailerMap })
    } else {
      this.props.handleUpdateRetailerDetails({
        retailer_id: updatedRetailerMap[retailerId].retailer_id,
        is_active: updatedRetailerMap[retailerId].is_active,
      })
    }
  }

  unMapRetailer(retailerId) {
    let updatedRetailerMap = Object.assign({}, this.state.mappedRetailersMap)
    this.props.handleUpdateRetailerDetails({
      retailer_id: retailerId,
      is_active: false,
    })

    delete updatedRetailerMap[retailerId]

    this.setState({mappedRetailersMap: updatedRetailerMap, mappedRetailersList: Object.values(updatedRetailerMap)})
  }
  
  handleCheckboxes(e, retailerId) {
    let updatedMap = Object.assign({}, this.state.mappedRetailersMap)
    updatedMap[retailerId].is_active = (e.target.checked)
    this.setState({ mappedRetailersMap: updatedMap, mappedRetailersList: Object.values(updatedMap) })
  }

  render() {
    const {mappedRetailersMap} = this.state
    return (
        <Table
        className="bordered--table"
        selectable={false}
        fixedHeader
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn style={styles[0]}/>
              <TableHeaderColumn style={styles[1]}>RETAILER ID</TableHeaderColumn>
              <TableHeaderColumn style={styles[2]}>STATE SHORT NAME</TableHeaderColumn>
              <TableHeaderColumn style={styles[3]}>CITY NAME</TableHeaderColumn>
              {/* <TableHeaderColumn>SKU PRICING ID</TableHeaderColumn> */}
              <TableHeaderColumn style={styles[4]}>STATUS</TableHeaderColumn>
              {/* <TableHeaderColumn style={styles[5]}/> */}
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            showRowHover
          >
            {
              !this.props.loadingMappedRetailers && mappedRetailersMap && Object.keys(mappedRetailersMap).length > 0
              ? this.state.mappedRetailersList.map(item => (
                <TableRow key={item.retailer_id}>
                  {/* <TableRowColumn style={styles[0]}>
                    <Checkbox
                      onCheck={(e) => this.handleCheckboxes(e, item.retailer_id)}
                      checked={mappedRetailersMap[item.retailer_id].is_active}
                      name="isActive"
                      disabled={!mappedRetailersMap[item.retailer_id].modified}
                    />
                  </TableRowColumn> */}
                  <TableRowColumn style={styles[0]}>
                    <button
                      onClick={() => this.unMapRetailer(item.retailer_id)}
                      //style={this.props.disableSave ? { opacity: '0.55', pointerEvents: 'none', fontSize: '13px', textTransform: 'none', width: '50px' } : { fontSize: '13px', textTransform: 'none', width: '50px' }}
                    >
                      Delete
                    </button>
                  </TableRowColumn>
                  <TableRowColumn style={styles[1]}>{item.retailer_id}</TableRowColumn>
                  <TableRowColumn style={styles[2]}>{item.state_short_name}</TableRowColumn>
                  <TableRowColumn style={styles[3]}>{item.city_name}</TableRowColumn>
                  <TableRowColumn style={styles[4]}>{item.is_active ? 'Active' : 'Inactive'}</TableRowColumn>
                  {/* <TableRowColumn style={styles[5]}>
                    <button
                      onClick={() => this.enableInputBox(item.retailer_id)}
                      style={this.props.disableSave ? { opacity: '0.55', pointerEvents: 'none', fontSize: '13px', textTransform: 'none', width: '50px' } : { fontSize: '13px', textTransform: 'none', width: '50px' }}
                    >
                      {!mappedRetailersMap[item.retailer_id].modified ? 'Edit' : 'Save'}
                    </button>
                  </TableRowColumn> */}
                  {/* <TableRowColumn >{item.sku_pricing_id}</TableRowColumn> */}
                </TableRow>
              ))
              : [1, 2, 3, 4].map(i => (
                <TableLoadingShell key={i} />
              ))
            }
          </TableBody>
        </Table>
    )
  }
}

export default MappedStatesList