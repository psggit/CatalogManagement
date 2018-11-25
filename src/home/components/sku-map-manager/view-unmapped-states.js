import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions'
import FlatButton from 'material-ui/FlatButton'
import Checkbox from 'material-ui/Checkbox'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import TableLoadingShell from './../table-loading-shell'
import '@sass/components/_table.scss'

const TableHeaderItems = [
  // '',
  'STATE NAME',
  'STATE SHORT NAME',
  'SKU PRICE',
  ''
]

const styles = [
  // { width: '38px', textAlign: 'center' },
  { width: '100px', textAlign: 'center' },
  { width: '120px', textAlign: 'center' },
  { width: '70px', textAlign: 'center' },
  { width: '60px', textAlign: 'center' },
]

class ViewUnmappedStates extends React.Component {
  constructor() {
    super()
    this.state = {
      loadingUnmappedStates: true,
      stateMap: {},
      unmappedStatesList: []
    }
    
    this.handleAddState = this.handleAddState.bind(this)
    //this.handleCheckboxes = this.handleCheckboxes.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.actions.fetchSkuUnmappedStates({
      sku_id: parseInt(this.props.skuId)
    }, (response) => {
      let stateMap = {}
      //console.log("response", response)
      const list = response.map((item) => {
        stateMap[item.short_name] = {
          state_name: item.state_name,
          sku_id: parseInt(this.props.skuId),
          sku_price: 0,
          is_active: true,
          state_short_name: item.short_name
        }
      })
      this.setState({stateMap, unmappedStatesList: Object.values(stateMap), loadingUnmappedStates: false })
    })
  }

  handleAddState(state_short_name) {
    this.props.handleClose()
    this.props.handleAddStateToSku(this.state.stateMap[state_short_name])
  }

  handleChange(e, stateShortName) {
    let updatedMap = Object.assign({}, this.state.stateMap)
    updatedMap[stateShortName].sku_price = parseInt(e.target.value)
    this.setState({stateMap: updatedMap, unmappedStatesList: Object.values(updatedMap)})
  }

  // handleCheckboxes(e, stateShortName) {
  //   let updatedMap = Object.assign({}, this.state.stateMap)
  //   updatedMap[stateShortName].is_active = (e.target.checked)
  //   this.setState({stateMap: updatedMap, mappedStatesList: Object.values(updatedMap)})
  // }

  render() {
    const {
      loadingUnmappedStates, 
      unmappedStatesList
    } = this.state

    const notificationStyle = {
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.08)',
      display: 'flex',
      justifyContent: 'center',
      padding: '20px'
    }
   
    return (
      <div>
        <Table
          onCellClick={this.expandColumn}
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
              this.props.loadingUnmappedStates &&
              [1, 2, 3, 4, 5].map(() => {
                return <TableLoadingShell/>
              })
            }
            {
              !this.props.loadingUnmappedStates && this.state.stateMap && Object.keys(this.state.stateMap).length > 0
              &&
              this.state.unmappedStatesList.map((item, i) => {
                return <TableRow key={item.state_short_name}>
                  {/* <TableRowColumn style={styles[0]}>
                    <Checkbox
                      onCheck={(e) => this.handleCheckboxes(e, item.state_short_name)}
                      checked={this.state.stateMap[item.state_short_name].is_active}
                      name="is_active"
                    />
                  </TableRowColumn> */}
                  <TableRowColumn style={styles[0]}>{item.state_name}</TableRowColumn>
                  <TableRowColumn style={styles[1]}>{item.state_short_name}</TableRowColumn>
                  <TableRowColumn style={styles[2]}>
                    <input 
                      type="number" 
                      value={this.state.stateMap[item.state_short_name].sku_price} 
                      onChange={(e) => this.handleChange(e, item.state_short_name)} 
                      style = {{ width: '60px', padding: '0 10px'}}
                    />
                  </TableRowColumn>
                  <TableRowColumn style={styles[3]}>
                    <FlatButton
                      disabled={this.state.stateMap[item.state_short_name].sku_price==0}
                      label="add"
                      primary
                      onClick={() => {
                        this.handleAddState(item.state_short_name)
                      }}
                    />
                  </TableRowColumn>
                </TableRow>
              })
            }
            {
              !this.props.loadingUnmappedStates && this.state.stateMap && Object.keys(this.state.stateMap).length === 0
              &&
              <div style={notificationStyle}> No other states to map </div>
            }
          </TableBody>
        </Table>
      </div>
    )
  }
}

const mapStateToProps = state => state.main

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewUnmappedStates)
