import React from 'react'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'

class FilterModal extends React.Component {
  constructor() {
    super()
    console.log("props", this.props)
    this.state = {
      open: true,
      isLocalityAvailable: false,
      isCityAvailable: false,
      stateIdx: null,
      cityIdx: null,
      searchField: this.props && this.props.filterObj ? this.props.filterObj.column : 'ID',
      searchFieldIdx: this.props && this.props.filterObj && this.props.filterObj.column === "BrandName" ? 2 : 1,
      searchOperator: this.props && this.props.filterObj ? this.props.filterObj.operator : 'EQUAL',
      searchOperatorIdx: this.props && this.props.filterObj && this.props.filterObj.operator ? this.getOperatorIdx() : 1,
      searchText: this.props && this.props.filterObj ? this.props.filterObj.value : ''
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleApplyFilter = this.handleApplyFilter.bind(this)
    this.handleStateChange = this.handleStateChange.bind(this)
    this.handleCityChange = this.handleCityChange.bind(this)
    this.handleChangeIsLocalityAvailable = this.handleChangeIsLocalityAvailable.bind(this)
    this.handleChangeIsCityAvailable = this.handleChangeIsCityAvailable.bind(this)

    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleOperatorChange = this.handleOperatorChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    //console.log("update", this.props.filterObj)
    this.setState({
      searchField: this.props && this.props.filterObj.column && this.props.filterObj.column.length ? this.props.filterObj.column : 'ID',
      searchFieldIdx: this.props && this.props.filterObj.column && this.props.filterObj.column === "BrandName" ? 2 : 1,
      searchOperator: this.props && this.props.filterObj.operator && this.props.filterObj.operator.length ? this.props.filterObj.operator : 'EQUAL',
      searchOperatorIdx: this.props && this.props.filterObj.operator && this.props.filterObj.operator ? this.getOperatorIdx() : 1,
      searchText: this.props && this.props.filterObj ? this.props.filterObj.value : ''
    })
  }
  
  getOperatorIdx() {
    let operatorIdx;
    switch(this.props.filterObj.operator) {
      case 'EQUAL':
        operatorIdx = 1
        break;
      case 'LIKE':
        operatorIdx = 2
        break;
      case 'CASEIGNORE':
        operatorIdx = 3
        break;
      default: 
        break;
    }

    return operatorIdx;
  }

  handleClose() {
    this.setState({ open: false })
    setTimeout(() => {
      this.props.unmountFilterModal()
    }, 500)
  }

  handleApplyFilter(stateIdx, isLocalityAvailable) {
    this.props.applyFilter(stateIdx, isLocalityAvailable)
    this.setState({ open: false })
    setTimeout(() => {
      this.unmountModal()
    }, 500)
  }

  handleStateChange(e, k) {
    const stateIdx = k + 1
    this.setState({ stateIdx, cityIdx: null })
    this.props.handleStateChange(k)
  }

  handleCityChange(e, k) {
    const cityIdx = k + 1
    this.setState({ cityIdx })
    this.props.handleCityChange(k)
  }

  handleChangeIsLocalityAvailable(e) {
    this.setState({ isLocalityAvailable: e.target.checked })
  }

  handleChangeIsCityAvailable(e) {
    this.setState({ isCityAvailable: e.target.checked })
  }

  handleFieldChange(e, index) {
    this.setState({searchField: index === 0 ? 'ID' : 'BrandName', searchFieldIdx: index + 1})
  }

  handleOperatorChange(e, index) {
    //console.log("index", index)
    let operator = ''
    if(index === 0) {
      operator = 'EQUAL'
    } else if(index === 1) {
      operator = 'LIKE'
    } else {
      operator = 'CASEIGNORE'
    }
    console.log("operator", operator)
    this.setState({searchOperator: operator, searchOperatorIdx: index + 1})
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  unmountModal() {
    //setTimeout(() => {
    this.props.unmountFilterModal()
    //}, 500)
  }

  handleClick(e) {
    console.log("state", this.state)
    switch(this.props.filter) {
      case 'brandFilter':
        const filter = {
          column: this.state.searchField,
          operator: this.state.searchOperator,
          value: this.state.searchText
        }
        this.props.applyFilter(filter)
        this.unmountModal()
      break;
    }
  }

  render() {
    console.log("filter", this.props)
    const actions = [
      <FlatButton
        label="Cancel"
        onClick={this.handleClose}
      />,

      <RaisedButton
        primary
        label="Apply filter"
        onClick={this.handleClick}
      />
    ]
    return (
      <div>
        <Dialog
          autoScrollBodyContent
          title={this.props.title}
          contentStyle={{ width: '100%', maxWidth: '500px' }}
          modal={false}
          open={this.state.open}
          actions={actions}
          onRequestClose={this.handleClose}
        >
          {
            this.props.filter === "brandFilter" &&
            <div>
              <div className="form-group">
                <label>Field</label><br />
                <SelectField
                  value={this.state.searchFieldIdx}
                  onChange={this.handleFieldChange}
                  iconStyle={{ fill: '#9b9b9b' }}
                  name="searchField"
                  style={{ width: '100%' }}
                >
                  <MenuItem value={1} primaryText="Brand Id" />
                  <MenuItem value={2} primaryText="Brand Name" />
                </SelectField>
              </div>
              <div className="form-group">
                <label>Operator</label><br />
                <SelectField
                  value={this.state.searchOperatorIdx}
                  onChange={this.handleOperatorChange}
                  iconStyle={{ fill: '#9b9b9b' }}
                  name="searchOperator"
                  style={{ width: '100%' }}
                >
                  <MenuItem value={1} primaryText="EQUAL" />
                  <MenuItem value={2} primaryText="LIKE" disabled={this.state.searchFieldIdx === 1 ? true : false}/>
                  <MenuItem value={3} primaryText="CASE IGNORE" disabled={this.state.searchFieldIdx === 1 ? true : false} />
                </SelectField>
              </div>
              <div className="form-group">
                <label>Search Text</label><br />
                <TextField
                  onChange={this.handleChange}
                  name="searchText"
                  value={this.state.searchText}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          }
        </Dialog>
      </div>
    )
  }
}

export default FilterModal
