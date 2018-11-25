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
    this.state = {
      open: true,
      isLocalityAvailable: false,
      isCityAvailable: false,
      stateIdx: null,
      cityIdx: null,
      searchField: 'id',
      searchFieldIdx: 1,
      searchOperator: 'EQUAL',
      searchOperatorIdx: 1,
      searchText: ''
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
    this.setState({searchField: index === 0 ? 'id' : 'brandName', searchFieldIdx: index + 1})
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
    switch(this.props.filter) {
      case 'stateAndCityWithIsAvailableCheck':
        this.handleApplyFilter(this.state.stateIdx, this.state.isLocalityAvailable)
      break;

      case 'cityWithIsAvailableCheck':
        this.handleApplyFilter(this.state.stateIdx, this.state.isCityAvailable)
      break;

      case 'brandFilter':
        const filter = {
          filter_by: this.state.searchField,
          operator: this.state.searchOperator,
          search_text: this.state.searchText
        }
        this.props.applyFilter(filter)
        this.unmountModal()
      break;
    }
  }

  render() {
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
            this.props.filter === "stateAndCityWithIsAvailableCheck" &&
            <div>
              <div className="form-group">
                <label>State</label><br />
                <SelectField
                  style={{ width: '100%' }}
                  floatingLabelText={this.props.floatingLabelText}
                  value={parseInt(this.state.stateIdx)}
                  onChange={this.handleStateChange}
                  iconStyle={{ fill: '#9b9b9b' }}
                >
                  {
                    !this.props.loadingStates
                      ? (
                        this.props.statesData.map((state, i) => (
                          <MenuItem
                            value={i + 1}
                            key={state.id}
                            primaryText={state.state_name}
                          />
                        ))
                      )
                      : ''
                  }
                </SelectField>
              </div>
              <div className="form-group">
                <label>City</label><br />
                <SelectField
                  style={{ width: '100%' }}
                  floatingLabelText={this.props.floatingLabelText}
                  disabled={this.props.loadingCities || !this.props.citiesData.length}
                  value={parseInt(this.state.cityIdx)}
                  onChange={this.handleCityChange}
                >
                  {
                    !this.props.loadingCities && this.props.citiesData.length
                      ? (
                        this.props.citiesData.map((city, i) => (
                          <MenuItem
                            value={i + 1}
                            key={city.id}
                            primaryText={city.name}
                          />
                        ))
                      )
                      : ''
                  }
                </SelectField>
              </div>
              <div className="form-group">
                <Checkbox
                  style={{ marginTop: '10px' }}
                  // disabled={this.props.isDisabled}
                  checked={this.state.isLocalityAvailable}
                  onCheck={this.handleChangeIsLocalityAvailable}
                  name="isLocalityAvailable"
                  label="is_available"
                />
              </div>
            </div>
          }
          {
            this.props.filter === "stateAndCityWithoutIsAvailableCheck" &&
            <div>
              <div className="form-group">
                <label>State</label><br />
                <SelectField
                  style={{ width: '100%' }}
                  floatingLabelText={this.props.floatingLabelText}
                  value={parseInt(this.state.stateIdx)}
                  onChange={this.handleStateChange}
                  iconStyle={{ fill: '#9b9b9b' }}
                >
                  {
                    !this.props.loadingStates
                      ? (
                        this.props.statesData.map((state, i) => (
                          <MenuItem
                            value={i + 1}
                            key={state.id}
                            primaryText={state.state_name}
                          />
                        ))
                      )
                      : ''
                  }
                </SelectField>
              </div>
              <div className="form-group">
                <label>City</label><br />
                <SelectField
                  style={{ width: '100%' }}
                  floatingLabelText={this.props.floatingLabelText}
                  disabled={this.props.loadingCities || !this.props.citiesData.length}
                  value={parseInt(this.state.cityIdx)}
                  onChange={this.handleCityChange}
                >
                  {
                    !this.props.loadingCities && this.props.citiesData.length
                      ? (
                        this.props.citiesData.map((city, i) => (
                          <MenuItem
                            value={i + 1}
                            key={city.id}
                            primaryText={city.name}
                          />
                        ))
                      )
                      : ''
                  }
                </SelectField>
              </div>
              {/* <div className="form-group">
              <Checkbox
                style={{ marginTop: '10px' }}
                // disabled={this.props.isDisabled}
                checked={this.state.isLocalityAvailable}
                onCheck={this.handleChangeIsLocalityAvailable}
                name="isLocalityAvailable"
                label="is_available"
              />
            </div> */}
            </div>
          }
          {
            this.props.filter === "cityWithIsAvailableCheck" &&
            <div>
              <div className="form-group">
                <label>State</label><br />
                <SelectField
                  style={{ width: '100%' }}
                  floatingLabelText={this.props.floatingLabelText}
                  value={parseInt(this.state.stateIdx)}
                  onChange={this.handleStateChange}
                  iconStyle={{ fill: '#9b9b9b' }}
                >
                  {
                    !this.props.loadingStates
                      ? (
                        this.props.statesData.map((state, i) => (
                          <MenuItem
                            value={i + 1}
                            key={state.id}
                            primaryText={state.state_name}
                          />
                        ))
                      )
                      : ''
                  }
                </SelectField>
              </div>
              <div className="form-group">
                <Checkbox
                  style={{ marginTop: '10px' }}
                  // disabled={this.props.isDisabled}
                  checked={this.state.isCityAvailable}
                  onCheck={this.handleChangeIsCityAvailable}
                  name="isCityActive"
                  label="is_available"
                />
              </div>
            </div>
          }
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
              {/* <div className="form-group">
                <Checkbox
                  style={{ marginTop: '10px' }}
                  // disabled={this.props.isDisabled}
                  checked={this.state.isCityAvailable}
                  onCheck={this.handleChangeIsCityAvailable}
                  name="isCityActive"
                  label="is_available"
                />
              </div> */}
            </div>
          }
        </Dialog>
      </div>
    )
  }
}

export default FilterModal
