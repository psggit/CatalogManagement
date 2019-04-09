import React from "react"
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'
import { overrideTableStyle } from '@utils'
import RaisedButton from 'material-ui/RaisedButton'

const TableHeaderItems = [
  'ID',
  'BRAND NAME',
  'STATUS',
  'LISTING ORDER'
]

const styles = [
  { width: '30px' },
  { width: '100px' },
  { width: '60px' },
  { width: '100px' }
]

class BrandList extends React.Component {
  constructor() {
    super()

    this.state = {
      genreBasedBrandList: [],
      genreBasedBrandMap: {},
      buttonLabel: "Edit",
      isSavingDetails: false,
      enableEdit: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.enableEdit = this.enableEdit.bind(this)
  }

  componentDidMount() {
    console.log("props", this.props)
    this.overrideTableStyle()
    this.setState({
      genreBasedBrandList: this.props.brandList,
      genreBasedBrandMap: this.props.brandMap
    })
  }

  componentWillReceiveProps(newProps) {
    console.log("new props", newProps)
    if (this.props.brandList !== newProps.brandList) {
      console.log("if")
      this.setState({
        genreBasedBrandList: newProps.brandList,
        //genreBasedBrandMap: this.props.brandMap
      })
    }
    if (this.props.brandMap !== newProps.brandMap) {
      console.log("else")
      this.setState({
        //genreBasedBrandList: this.props.brandList,
        genreBasedBrandMap: newProps.brandMap
      })
    }
  }

  overrideTableStyle() {
    overrideTableStyle()
  }

  handleChange(e, brandId) {
    let updatedMap = Object.assign({}, this.state.genreBasedBrandMap)
    updatedMap[brandId].listingOrder = parseInt(e.target.value)
    this.setState({genreBasedBrandMap: updatedMap, genreBasedBrandList: Object.values(updatedMap)})
  }

  enableEdit() {
    this.setState({
      buttonLabel: !this.state.isSavingDetails ? "Save" : "Edit",
      enableEdit: !this.state.enableEdit
    })
    if(this.state.enableEdit) {
      this.setState({isSavingDetails: true})
      this.props.actions.updateBrandListingOrder({

      }, () => {
        this.setState({isSavingDetails: false})
      })
    }
  }

  render() {
    console.log("props", this.state, this.state.genreBasedBrandMap)
    return (
      <div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '40px'}}>
          <h4>Brand List</h4>
          {
            Object.keys(this.state.genreBasedBrandList).length > 0 &&
            <RaisedButton
              onClick={this.enableEdit}
              label={this.state.buttonLabel}
              disabled={this.state.isSavingDetails}
            />
          }
        </div>
        <div style={{ height: 'auto' }}>
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
                this.state.genreBasedBrandList &&
                this.state.genreBasedBrandList.map((item, i) => {
                  return (
                    <TableRow key={item.id}>
                      <TableRowColumn style={styles[0]}>{item.id}</TableRowColumn>
                      <TableRowColumn style={styles[1]}>{item.brand_name}</TableRowColumn>
                      <TableRowColumn style={styles[2]}>{item.is_active ? 'Active' : 'Inactive'}</TableRowColumn>
                      <TableRowColumn style={styles[3]}>
                       
                        <input 
                            type="number" 
                            value={this.state.genreBasedBrandMap[(item.id)].listingOrder} 
                            onChange={(e) => this.handleChange(e, item.id)} 
                            style = {{ width: '60px', padding: '0 10px'}}
                            disabled={!this.state.enableEdit}
                          />
                      </TableRowColumn>
                    </TableRow>
                  )
                })
              }
              {
                Object.keys(this.state.genreBasedBrandList).length === 0 &&
                <tr>
                  <td style={{ textAlign: 'center' }} colspan='4'>
                    <p style={{ fontWeight: '16px' }}>No brands found</p>
                  </td>
                </tr>
              }
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }
}

export default BrandList