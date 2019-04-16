import React from "react"
import TableLoadingShell from './../table-loading-shell'
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
import Checkbox from "material-ui/Checkbox"

const TableHeaderItems = [
  '',
  'ID',
  'BRAND NAME',
  'STATUS',
  'LISTING ORDER'
]

const styles = [
  { width: '30px' },
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
      enableEdit: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.enableEdit = this.enableEdit.bind(this)
    this.handleCheckboxes = this.handleCheckboxes.bind(this)
  }

  componentDidMount() {
    this.overrideTableStyle()
    this.setState({
      genreBasedBrandList: this.props.brandList,
      genreBasedBrandMap: this.props.brandMap
    })
  }

  componentWillReceiveProps(newProps) {
    if (this.props.brandList !== newProps.brandList) {
      this.setState({
        genreBasedBrandList: newProps.brandList,
      })
    }
    if (this.props.brandMap !== newProps.brandMap) {
      this.setState({
        genreBasedBrandMap: newProps.brandMap
      })
    }
    if(!newProps.isSavingDetails) {
      this.setState({enableEdit: false, buttonLabel: "Edit"})
    } else {
      this.setState({buttonLabel: "Save"})
    }
  }

  overrideTableStyle() {
    overrideTableStyle()
  }

  handleChange(e, brandId) {
    let updatedMap = Object.assign({}, this.state.genreBasedBrandMap)
    updatedMap[brandId].listing_order = parseInt(e.target.value)
    this.setState({genreBasedBrandMap: updatedMap, genreBasedBrandList: Object.values(updatedMap)})
  }

  enableEdit() {
    this.setState({
      buttonLabel: "Save",
      enableEdit: true
    })
    if(this.state.enableEdit) {
      const selectedBrandList = this.state.genreBasedBrandList.filter((item) => {
        if(item.is_modified) {
          return item
        }
      })
      this.props.createOrUpdateBrandListingOrder(selectedBrandList)
    }
  }

  handleCheckboxes(e, brandId) {
    let updatedMap = Object.assign({}, this.state.genreBasedBrandMap)
    updatedMap[brandId].is_modified = (e.target.checked)
    this.setState({ genreBasedBrandMap: updatedMap, genreBasedBrandList: Object.values(updatedMap) })
  }

  render() {
    return (
      <div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '40px'}}>
          <h4>Brand List</h4>
          {
            Object.keys(this.state.genreBasedBrandList).length > 0 &&
            <RaisedButton
              onClick={this.enableEdit}
              label={this.state.buttonLabel}
              disabled={this.props.isSavingDetails}
            />
          }
        </div>
        <div style={{ height: 'auto' }}>
          <Table
            wrapperStyle={{ height: 'auto' }}
            //onCellClick={this.expandColumn}
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
              //showRowHover
            >
              {
                !this.props.loadingData && this.state.genreBasedBrandList ?
                this.state.genreBasedBrandList.map((item, i) => {
                  return (
                    <TableRow key={item.id}>
                      <TableRowColumn style={styles[0]}>
                        <Checkbox
                          onCheck={(e) => this.handleCheckboxes(e, item.brand_id)}
                          checked={this.state.genreBasedBrandMap[item.brand_id].is_modified}
                          name="isModified"
                          disabled={!this.state.enableEdit}
                        />
                      </TableRowColumn>
                      <TableRowColumn style={styles[1]}>{item.brand_id}</TableRowColumn>
                      <TableRowColumn style={styles[2]}>{item.brand_name}</TableRowColumn>
                      <TableRowColumn style={styles[3]}>{item.is_active ? 'Active' : 'Inactive'}</TableRowColumn>
                      <TableRowColumn style={styles[4]}>
                        <input 
                          type="number" 
                          value={this.state.genreBasedBrandMap[(item.brand_id)].listing_order} 
                          onChange={(e) => this.handleChange(e, item.brand_id)} 
                          style = {{ width: '60px', padding: '0 10px'}}
                          disabled={!this.state.genreBasedBrandMap[item.brand_id].is_modified}
                        />
                      </TableRowColumn>
                    </TableRow>
                  )
                })
                : (
                  [1, 2, 3, 4, 5].map(() => (
                    <TableLoadingShell />
                  ))
                )
              }
              {
                Object.keys(this.state.genreBasedBrandList).length === 0 &&
                <tr>
                  <td style={{ textAlign: 'center' }} colSpan='4'>
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
// const mapStateToProps = state => state.main

// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators(Actions, dispatch)
// })

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(BrandList)