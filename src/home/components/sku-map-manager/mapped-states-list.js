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
  { width: '80px', textAlign: 'center' },
  { width: '80px', textAlign: 'center' },
  { width: '80px', textAlign: 'center' },
  // { width: '60px', textAlign: 'center' },
  { width: '38px', textAlign: 'center' }
]

class MappedStatesList extends React.Component {
  constructor() {
    super()
    this.state = {
      mappedStatesList: [],
      stateMap: {},
      selectedPricingId: 0
    }
    this.handleCheckboxes = this.handleCheckboxes.bind(this)
    this.enableInputBox = this.enableInputBox.bind(this)
    //this.unMapState = this.unMapState.bind(this)
  }

  componentDidMount() {
    this.mapStates()
  }

  componentDidUpdate(prevProps) {
    if (this.props.skuMappedData !== prevProps.skuMappedData) {
      this.mapStates()
    }
    else if (prevProps.disableSave !== this.props.disableSave && !this.props.disableSave) {
      let updatedStateMap = Object.assign({}, this.state.stateMap)
      updatedStateMap[this.state.selectedPricingId].modified = false
      this.setState({ stateMap: updatedStateMap })
    }
  }

  mapStates() {
    let mappedStates = {}
    if(this.props.skuMappedData) {
      this.props.skuMappedData.map((item) => {
        mappedStates[item.sku_pricing_id] = {
          state_name: item.state_name,
          state_short_name: item.state_short_name,
          sku_price: item.sku_price,
          sku_pricing_id: item.sku_pricing_id,
          is_active: item.is_active,
          is_modified: false
        }
      })
    }
    const mappedSkuStates = Object.values(mappedStates)
    this.setState({ mappedStatesList: mappedSkuStates, stateMap: mappedStates })
  }

  enableInputBox(pricingId) {
    let updatedStateMap = Object.assign({}, this.state.stateMap)
    if (!this.state.stateMap[pricingId].modified) {
      updatedStateMap[pricingId].modified = true
      this.setState({ selectedPricingId: pricingId, stateMap: updatedStateMap })
    } 
    else {
      this.props.handleSaveStateDetails({
        //state_short_name: updatedStateMap[pricingId].state_short_name,
        is_active: updatedStateMap[pricingId].is_active,
        sku_price: updatedStateMap[pricingId].sku_price,
        sku_pricing_id: pricingId
      })
    }
  }

  // unMapState(pricingId) {
  //   let updatedStateMap = Object.assign({}, this.state.stateMap)
  //   this.props.handleUnmapState({ 
  //     state_name: updatedStateMap[pricingId].state_short_name,
  //     is_active: false,
  //     sku_price: updatedStateMap[pricingId].sku_price
  //   })

  //   delete updatedStateMap[pricingId]

  //   this.setState({ mappedStatesList: Object.values(updatedStateMap), stateMap: updatedStateMap })
 
  // }

  handleChange(e, pricingId) {
    let updatedMap = Object.assign({}, this.state.stateMap)
    updatedMap[pricingId].sku_price = parseInt(e.target.value)
    this.setState({ stateMap: updatedMap, mappedStatesList: Object.values(updatedMap) })
  }

  handleCheckboxes(e, pricingId) {
    let updatedMap = Object.assign({}, this.state.stateMap)
    updatedMap[pricingId].is_active = (e.target.checked)
    this.setState({ stateMap: updatedMap, mappedStatesList: Object.values(updatedMap) })
  }

  render() {
    const notificationStyle = {
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.08)',
      display: 'flex',
      justifyContent: 'center',
      padding: '20px'
    }
    const editInputStyle = {
      border: 0,
      borderWidth: 0,
      width: '60px',
      padding: '0px 10px'
    }
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
            <TableHeaderColumn style={styles[0]}>IS_ACTIVE</TableHeaderColumn>
            <TableHeaderColumn style={styles[1]}>STATE NAME</TableHeaderColumn>
            <TableHeaderColumn style={styles[2]}>STATE NAME</TableHeaderColumn>
            <TableHeaderColumn style={styles[3]}>SKU PRICE</TableHeaderColumn>
            <TableHeaderColumn style={styles[4]}>SKU PRICING ID</TableHeaderColumn>
            {/* <TableHeaderColumn style={styles[5]}>STATUS</TableHeaderColumn> */}
            <TableHeaderColumn style={styles[5]} />
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
          showRowHover
        >
          {
            this.props.loadingStatesMappedToSku &&
            [1, 2, 3, 4, 5].map(() => {
              return <TableLoadingShell/>
            })
          }
          {
            !this.props.loadingStatesMappedToSku && this.state.stateMap && Object.keys(this.state.stateMap).length > 0
            &&
            this.state.mappedStatesList && this.state.mappedStatesList.map((item, i) => {
              return <TableRow key={i}>
                <TableRowColumn style={styles[0]}>
                  <Checkbox
                    onCheck={(e) => this.handleCheckboxes(e, item.sku_pricing_id)}
                    checked={this.state.stateMap[item.sku_pricing_id].is_active}
                    name="isActive"
                    disabled={!this.state.stateMap[item.sku_pricing_id].modified}
                  />
                </TableRowColumn>
                {/* <TableRowColumn style={styles[0]}>
                  <button
                    onClick={() => this.unMapState(item.sku_pricing_id)}
                    //style={this.props.disableSave ? { opacity: '0.55', pointerEvents: 'none', fontSize: '13px', textTransform: 'none', width: '50px' } : { fontSize: '13px', textTransform: 'none', width: '50px' }}
                  >
                    Delete
                  </button>
                </TableRowColumn> */}
                <TableRowColumn style={styles[1]}>{item.state_short_name}</TableRowColumn>
                <TableRowColumn style={styles[2]}>{item.state_name}</TableRowColumn>
                <TableRowColumn style={styles[3]}>
                  <input
                    type="number"
                    value={this.state.stateMap[item.sku_pricing_id].sku_price}
                    onChange={(e) => this.handleChange(e, item.sku_pricing_id)}
                    style={!this.state.stateMap[item.sku_pricing_id].modified ? editInputStyle : { width: '60px', padding: '0px 10px' }}
                    disabled={!this.state.stateMap[item.sku_pricing_id].modified}
                  />
                </TableRowColumn>
                <TableRowColumn style={styles[4]}>{item.sku_pricing_id}</TableRowColumn>
                {/* <TableRowColumn style={styles[5]}>{item.is_active ? 'Active' : 'Inactive'}</TableRowColumn> */}
                <TableRowColumn style={styles[5]}>
                  <button
                    onClick={() => this.enableInputBox(item.sku_pricing_id)}
                    style={this.props.disableSave ? { opacity: '0.55', pointerEvents: 'none', fontSize: '13px', textTransform: 'none', width: '50px' } : { fontSize: '13px', textTransform: 'none', width: '50px' }}
                  >
                    {!this.state.stateMap[item.sku_pricing_id].modified ? 'Edit' : 'Save'}
                  </button>
                </TableRowColumn>
              </TableRow>
            })
          }
          {
            !this.props.loadingStatesMappedToSku && this.state.stateMap && Object.keys(this.state.stateMap).length === 0
            &&
            <div style={notificationStyle}> No states mapped </div>
          }
        </TableBody>
      </Table>


    )
  }
}

export default MappedStatesList
