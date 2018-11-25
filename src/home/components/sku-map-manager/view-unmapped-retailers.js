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
  'RETAILER ID',
  'STATE SHORT NAME',
  'CITY NAME',
  ''
]

const styles = [
  // { width: '38px', textAlign: 'center' },
  { width: '100px', textAlign: 'center' },
  { width: '120px', textAlign: 'center' },
  { width: '120px', textAlign: 'center' },
  { width: '60px', textAlign: 'center' },
]

class ViewUnmappedRetailers extends React.Component {
  constructor() {
    super()
    this.state = {
      loadingUnmappedRetailers: true,
      retailerMap: {},
      mappedRetailersList: []
    }
    
    this.handleAddRetailer = this.handleAddRetailer.bind(this)
    //this.handleCheckboxes = this.handleCheckboxes.bind(this)
  }

  componentDidMount() {
    this.props.actions.fetchSkuUnmappedRetailers({
      sku_id: this.props.skuId
    }, (response) => {
      let retailerMap = {}
      const list = response.map((item) => {
        retailerMap[item.retailer_id] = {
          retailer_id: item.retailer_id,
          //state_name: item.state_name,
          sku_id: this.props.skuId,
          city_name: item.city_name,
          is_active: true,
          state_short_name: item.state_short_name
        }
      })
      this.setState({retailerMap, mappedRetailersList: Object.values(retailerMap), loadingUnmappedRetailers: false })
    })
  }

  handleAddRetailer(retailerId) {
    this.props.handleClose()
    this.props.handleAddRetailerToSku(this.state.retailerMap[retailerId])
  }
  
  // handleCheckboxes(e, retailerId) {
  //   let updatedMap = Object.assign({}, this.state.retailerMap)
  //   updatedMap[retailerId].is_active = (e.target.checked)
  //   this.setState({retailerMap: updatedMap, mappedRetailersList: Object.values(updatedMap)})
  // }

  render() {
    const {
      loadingUnmappedRetailers, 
      mappedRetailersList
    } = this.state
   
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
              !loadingUnmappedRetailers && this.state.retailerMap && Object.keys(this.state.retailerMap).length > 0
              ? (
                mappedRetailersList.map((item, i) => (
                  <TableRow key={item.retailer_id}>
                    {/* <TableRowColumn style={styles[0]}>
                      <Checkbox
                        onCheck={(e) => this.handleCheckboxes(e, item.retailer_id)}
                        checked={this.state.retailerMap[item.retailer_id].is_active}
                        name="is_active"
                      />
                    </TableRowColumn> */}
                    <TableRowColumn style={styles[0]}>{item.retailer_id}</TableRowColumn>
                    <TableRowColumn style={styles[1]}>{item.state_short_name}</TableRowColumn>
                    <TableRowColumn style={styles[2]}>{item.city_name}</TableRowColumn>
                    <TableRowColumn style={styles[3]}>
                      <FlatButton
                        label="add"
                        primary
                        onClick={() => {
                          this.handleAddRetailer(item.retailer_id)
                        }}
                      />
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
)(ViewUnmappedRetailers)
