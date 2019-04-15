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
import {overrideTableStyle} from '@utils'

const TableHeaderItems = [
  // '',
  'STATE NAME',
  'STATE SHORT NAME',
  'SKU PRICE',
  'TAG',
  ''
]

const styles = [
  { width: '100px', textAlign: 'center' },
  { width: '120px', textAlign: 'center' },
  { width: '70px', textAlign: 'center' },
  { width: '120px', textAlign: 'center' },
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
    this.handleChange = this.handleChange.bind(this)
    this.handleTagChange = this.handleTagChange.bind(this)
  }

  componentDidMount() {
    this.overrideTableStyle()
    this.mapStates()
  }

  overrideTableStyle() {
    overrideTableStyle()
  }

  componentDidUpdate(prevProps) {
    if (this.props.skuMappedData !== prevProps.skuMappedData) {
      this.mapStates()
    }
  }
  
  mapStates() {
    let stateMap = {}
    const {
      skuMappedData,
      loadingStatesMappedToSku
    } = this.props
    if(skuMappedData && skuMappedData.length === 0 && !loadingStatesMappedToSku) {
      this.props.statesList.map((item) => {
        stateMap[item.state_short_name] = {
          state_id: parseInt(item.state_id),
          state_name: item.state_name,
          sku_id: parseInt(this.props.skuId),
          price: 0,
          tag: '',
          is_active: true,
          state_short_name: item.state_short_name
        }
      })
    } else {
      const statesMap = {}
      this.props.statesList.map((item) => {
        return statesMap[item.state_id] = {
          state_id: item.state_id,
          state_name: item.state_name,
          state_short_name: item.state_short_name
        }
      })

      this.props.statesList.map((stateDetails) => {
        if(this.props.skuMappedData.map(item => parseInt(item.state_id)).indexOf((parseInt(stateDetails.state_id))) === -1) {
          stateMap[statesMap[stateDetails.state_id].state_short_name] = {
            state_id: parseInt(stateDetails.state_id),
            state_name: statesMap[stateDetails.state_id].state_name,
            sku_id: parseInt(this.props.skuId),
            price: 0,
            tag: '',
            is_active: true,
            state_short_name: statesMap[stateDetails.state_id].state_short_name
          }
        } 
      })
    }
    this.setState({
      stateMap, 
      unmappedStatesList: Object.values(stateMap), 
      loadingUnmappedStates: false 
    })
  }

  handleAddState(state_short_name) {
    this.props.handleClose()
    this.props.handleAddStateToSku(this.state.stateMap[state_short_name])
  }

  handleChange(e, stateShortName) {
    console.log("e.tag", e.target.value, parseInt(e.target.value))
    let updatedMap = Object.assign({}, this.state.stateMap)
    updatedMap[stateShortName].price = parseInt(e.target.value)
    this.setState({stateMap: updatedMap, unmappedStatesList: Object.values(updatedMap)})
  }

  handleTagChange(e, stateShortName) {
    let updatedMap = Object.assign({}, this.state.stateMap)
    updatedMap[stateShortName].tag = (e.target.value)
    this.setState({stateMap: updatedMap, unmappedStatesList: Object.values(updatedMap)})
  }

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
      <div style={{ height: 'auto'}}>
        <Table
          wrapperStyle={{ height: 'auto' }}
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
              loadingUnmappedStates &&
              [1, 2, 3, 4, 5].map(() => {
                return <TableLoadingShell/>
              })
            }
            {
              !loadingUnmappedStates && this.state.stateMap && Object.keys(this.state.stateMap).length > 0
              &&
              this.state.unmappedStatesList.map((item, i) => {
                return (
                  <TableRow key={item.state_short_name}>
                    <TableRowColumn style={styles[0]}>{item.state_name}</TableRowColumn>
                    <TableRowColumn style={styles[1]}>{item.state_short_name}</TableRowColumn>
                    <TableRowColumn style={styles[2]}>
                      <input 
                        type="number" 
                        value={this.state.stateMap[item.state_short_name].price} 
                        onChange={(e) => this.handleChange(e, item.state_short_name)} 
                        style = {{ width: '60px', padding: '0 10px'}}
                      />
                    </TableRowColumn>
                    <TableRowColumn style={styles[3]}>
                      <input 
                        type="text" 
                        value={this.state.stateMap[item.state_short_name].tag} 
                        onChange={(e) => this.handleTagChange(e, item.state_short_name)} 
                        style = {{ width: '120px', padding: '0 10px'}}
                      />
                    </TableRowColumn>
                    <TableRowColumn style={styles[4]}>
                      <FlatButton
                        disabled={this.state.stateMap[item.state_short_name].price==0}
                        label="add"
                        primary
                        onClick={() => {
                          this.handleAddState(item.state_short_name)
                        }}
                      />
                    </TableRowColumn>
                  </TableRow>
                )
              })
            }
            {
              !loadingUnmappedStates && this.state.stateMap && Object.keys(this.state.stateMap).length === 0
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
