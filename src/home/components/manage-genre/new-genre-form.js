import React from "react"
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import { validateTextField, validateNumberField } from './../../../utils/validators'
import { validateNumType, checkCtrlA, checkCtrlV } from './../../../utils'

class GenreForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      genreName: props.genreData ? props.genreData.genre_name : "",
      ordinalPosition: props.genreData ? props.genreData.ordinal_position : "",
      genreImage: props.genreData ? props.genreData.image : "",
      displayName: props.genreData ? props.genreData.display_name : "",
      statusIdx: props.genreData ? props.genreData.is_active ? 1 : 2 : 1,
      genreImageErr: {
        value: "",
        status: false
      },
      genreNameErr: {
        value: "",
        status: false
      },
      ordinalPositionErr: {
        value: "",
        status: false
      },
      displayNameErr: {
        value: "",
        status: false
      }
    }

    this.inputNameMap = {
      'genreName': 'Genre name',
      'ordinalPosition': 'Ordinal position',
      'displayName': 'Display name',
      'genreImage': 'Genre image',
    }

    this.handleSave = this.handleSave.bind(this)
    this.isFormValid = this.isFormValid.bind(this)
    this.handleStatusChange = this.handleStatusChange.bind(this)
    this.handleTextFields = this.handleTextFields.bind(this)
    this.getData = this.getData.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  getData() {
    return this.state
  }

  handleSave() {
    if(this.isFormValid()) {
      this.props.submit()
    }
  }

  isFormValid() {
    console.log("genre state", this.state)
    const genreNameErr = validateTextField(this.inputNameMap['genreName'], this.state.genreName)
    this.setState({ genreNameErr: validateTextField(this.inputNameMap['genreName'], this.state.genreName) })

    const displayNameErr = validateTextField(this.inputNameMap['displayName'], this.state.displayName)
    this.setState({ displayNameErr: validateTextField(this.inputNameMap['displayName'], this.state.displayName) })

    const ordinalPositionErr = validateTextField(this.inputNameMap['ordinalPosition'], this.state.ordinalPosition)
    this.setState({ordinalPositionErr : validateTextField(this.inputNameMap['ordinalPosition'], this.state.ordinalPosition) })
    console.log("ordinal pos", ordinalPositionErr)

    const genreImageErr = validateTextField(this.inputNameMap['genreImage'], this.state.genreImage)
    this.setState({ genreImageErr: validateTextField(this.inputNameMap['genreImage'], this.state.genreImage) })

    if(!displayNameErr.status && 
      !genreNameErr.status && 
      !ordinalPositionErr.status &&
      !genreImageErr.status
    ) {
      return true;
    }
    return false
  }

  handleStatusChange(e, k) {
    const statusIdx = k + 1
    console.log(statusIdx)
    this.setState({
      statusIdx
    })
  }

  handleTextFields(e) {
    const errName = `${e.target.name}Err`
    //console.log("textfield", e.target.value.trim())
    this.setState({
      [e.target.name]: e.target.value,
      [errName]: validateTextField(this.inputNameMap[e.target.name], e.target.value),
    })
  }

  // handleChange(e) {
  //   const errName = `${e.target.name}Err`
  //   if(validateNumType(e.keyCode) || checkCtrlA(e) || checkCtrlV(e)) {
  //     this.setState({ 
  //         [e.target.name]: e.target.value,
  //         [errName]: validateNumberField(this.inputNameMap[e.target.name], e.target.value)
  //     })
  //   } else {
  //       e.preventDefault()
  //   }   
  // }

  handleChange(e) {
    this.setState({
      ordinalPositionErr: {
        value: "",
        status: false
      }
    })
    const re = /^[0-9\b]*$/;
    console.log("ddd", re.test(e.target.value))
    if ((re.test(e.target.value))) {
       this.setState({[e.target.name]: e.target.value})
    } else {
      e.preventDefault()
    }
  }

  render() {
    console.log("props", this.props)
    const { genreNameErr, ordinalPositionErr, displayNameErr, genreImageErr } = this.state
    return (
      <React.Fragment>
        <div className="form-group">
          <label className="label">Genre name*</label><br />
          <TextField
            onChange={this.handleTextFields}
            name="genreName"
            //pattern='^[a-zA-Z0-9 ]*$'
            value={this.state.genreName}
            autoComplete='off'
            style={{ width: '100%' }}
          />
          {
            genreNameErr.status &&
            <p className="error">* {genreNameErr.value}</p>
          }
        </div>
        <div className="form-group">
          <label className="label">Ordinal position*</label><br />
           <TextField
            name="ordinalPosition"
            autoComplete='off'
            style={{ width: '100%' }}
            onChange={this.handleChange}
            value={this.state.ordinalPosition}
          />
          {
            ordinalPositionErr.status &&
            <p className="error">* {ordinalPositionErr.value}</p>
          }
        </div>
        <div className="form-group">
          <label className="label">Display name*</label><br />
          <TextField
            onChange={this.handleTextFields}
            name="displayName"
            value={this.state.displayName}
            style={{ width: '100%' }}
          />
          {
            displayNameErr.status &&
            <p className="error">* {displayNameErr.value}</p>
          }
        </div>
        <div className="form-group">
          <label className="label">Genre image*</label><br />
          <TextField
            name="genreImage"
            onChange={this.handleTextFields}
            value={this.state.genreImage}
            style={{ width: '100%' }}
          />
          {
            genreImageErr.status &&
            <p className="error">* {genreImageErr.value}</p>
          }
        </div>
        <div className="form-group">
          <label className="label">Status</label><br />
          <SelectField
            value={this.state.statusIdx}
            onChange={this.handleStatusChange}
            iconStyle={{ fill: '#9b9b9b' }}
            style={{ width: '100%' }}
          >
            <MenuItem value={1} primaryText="Active" />
            <MenuItem value={2} primaryText="Inactive" />
          </SelectField>
        </div>
        <RaisedButton
          primary
          disabled={this.props.isDisabled}
          label="Save"
          onClick={this.handleSave}
          style={{ marginTop: '40px' }}
        />
      </React.Fragment>
    )
  }
}

export default GenreForm