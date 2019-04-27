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
import {overrideTableStyle} from '@utils'

const styles = [
  { width: '38px', textAlign: 'left' },
  { width: '38px', textAlign: 'left' },
  { width: '100px', textAlign: 'left' },
  { width: '80px', textAlign: 'left' },
  { width: '80px', textAlign: 'left' },
  { width: '100px', textAlign: 'left' },
  { width: '200px', textAlign: 'left' },
]

class MappedStatesList extends React.Component {
  constructor() {
    super()
    this.state = {
      mappedStatesList: [],
      stateMap: {},
      selectedPricingId: 0,
      selectStateShortName: ''
    }
    this.handleCheckboxes = this.handleCheckboxes.bind(this)
    this.enableInputBox = this.enableInputBox.bind(this)
    this.handleTagChange = this.handleTagChange.bind(this)
  }

  componentDidMount() {
    this.overrideTableStyle()
    this.mapStates()
  }

  componentDidUpdate(prevProps) {
    if (this.props.skuMappedData !== prevProps.skuMappedData) {
      this.mapStates()
    }
    else if (prevProps.disableSave !== this.props.disableSave && !this.props.disableSave) {
      let updatedStateMap = Object.assign({}, this.state.stateMap)
      updatedStateMap[this.state.selectStateShortName].is_modified = false
      this.setState({ stateMap: updatedStateMap })
    }
  }

  overrideTableStyle() {
    overrideTableStyle()
  }

  mapStates() {
    if(this.props.skuMappedData) {
      this.setState({ mappedStatesList: this.props.skuMappedData, stateMap: this.props.skuStateMap })
    }
  }

  enableInputBox(stateShortName) {
    let updatedStateMap = Object.assign({}, this.state.stateMap)
    if (!this.state.stateMap[stateShortName].is_modified) {
      updatedStateMap[stateShortName].is_modified = true
      this.setState({ 
        selectedPricingId: this.state.stateMap[stateShortName].sku_pricing_id, 
        stateMap: updatedStateMap,
        selectStateShortName: stateShortName
      })
    } 
    else {
      //If sku price is greater than 0, then update sku price
      if(updatedStateMap[stateShortName].price > 0) {
        this.props.handleSaveStateDetails({
          is_active: updatedStateMap[stateShortName].is_active,
          price: updatedStateMap[stateShortName].price,
          tag: updatedStateMap[stateShortName].tag,
          id: this.state.stateMap[stateShortName].sku_pricing_id,
        })
      }
    }
  }

  handleChange(e, stateShortName) {
    //console.log("e.tag", e.target.value, parseInt(e.target.value))
    //const value =  e.target.value ?  e.target.value : 0
    let updatedMap = Object.assign({}, this.state.stateMap)
    updatedMap[stateShortName].price = parseInt(e.target.value)
    this.setState({ stateMap: updatedMap, mappedStatesList: Object.values(updatedMap) })
  }

  handleTagChange(e, stateShortName) {
    let updatedMap = Object.assign({}, this.state.stateMap)
    updatedMap[stateShortName].tag = (e.target.value)
    this.setState({ stateMap: updatedMap, mappedStatesList: Object.values(updatedMap) })
  }

  handleCheckboxes(e, stateShortName) {
    let updatedMap = Object.assign({}, this.state.stateMap)
    updatedMap[stateShortName].is_active = (e.target.checked)
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
      width: '200px',
      padding: '0px 10px'
    }
    return (
      <Table
        wrapperStyle={{ height: 'auto' }}
        className="bordered--table"
        selectable={false}
        fixedHeader
      >
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow>
            <TableHeaderColumn style={styles[0]} />
            <TableHeaderColumn style={styles[1]}>IS_ACTIVE</TableHeaderColumn>
            <TableHeaderColumn style={styles[2]}>STATE SHORT NAME</TableHeaderColumn>
            <TableHeaderColumn style={styles[3]}>STATE NAME</TableHeaderColumn>
            <TableHeaderColumn style={styles[4]}>SKU PRICE</TableHeaderColumn>
            <TableHeaderColumn style={styles[5]}>SKU PRICING ID</TableHeaderColumn>
            <TableHeaderColumn style={styles[6]}>TAG</TableHeaderColumn>
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
                  <button
                    onClick={() => this.enableInputBox(item.state_short_name)}
                    style={this.props.disableSave ? { opacity: '0.55', pointerEvents: 'none', fontSize: '13px', textTransform: 'none', width: '50px' } : { fontSize: '13px', textTransform: 'none', width: '50px' }}
                  >
                    {!this.state.stateMap[item.state_short_name].is_modified ? 'Edit' : 'Save'}
                  </button>
                </TableRowColumn>
                <TableRowColumn style={styles[1]}>
                  <Checkbox
                    onCheck={(e) => this.handleCheckboxes(e, item.state_short_name)}
                    checked={this.state.stateMap[item.state_short_name].is_active}
                    name="isActive"
                    disabled={!this.state.stateMap[item.state_short_name].is_modified}
                  />
                </TableRowColumn>
                <TableRowColumn style={styles[2]}>{item.state_short_name}</TableRowColumn>
                <TableRowColumn style={styles[3]}>{item.state_name}</TableRowColumn>
                <TableRowColumn style={styles[4]}>
                  <input
                    type="number"
                    value={this.state.stateMap[item.state_short_name].price}
                    onChange={(e) => this.handleChange(e, item.state_short_name)}
                    style={!this.state.stateMap[item.state_short_name].is_modified ? editInputStyle : { width: '60px', padding: '0px 10px' }}
                    disabled={!this.state.stateMap[item.state_short_name].is_modified}
                  />
                </TableRowColumn>
                <TableRowColumn style={styles[5]}>{item.sku_pricing_id}</TableRowColumn>
                <TableRowColumn style={styles[6]}>
                  <input
                    type="text"
                    value={this.state.stateMap[item.state_short_name].tag}
                    onChange={(e) => this.handleTagChange(e, item.state_short_name)}
                    style={!this.state.stateMap[item.state_short_name].is_modified ? editInputStyle : { width: '200px', padding: '0px 10px' }}
                    disabled={!this.state.stateMap[item.state_short_name].is_modified}
                  />
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
