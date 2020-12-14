import React from "react"
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { validateTextField } from './../../../utils/validators'

class CollectionForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      collectionName: props.collection ? props.collection.name : "",
      displayName: props.collection ? props.collection.display_name : "",
      // shortName: props.collection ? props.collection.short_name : "",
      collectionNameErr: {
        value: "",
        status: false
      },
      // shortNameErr: {
      //   value: "",
      //   status: false
      // },
      displayNameErr: {
        value: "",
        status: false
      }
    }

    this.inputNameMap = {
      'collectionName': 'Collection name',
      'displayName': 'Display name',
      // 'shortName': 'Short name',
    }

    this.handleSave = this.handleSave.bind(this)
    this.isFormValid = this.isFormValid.bind(this)
    this.handleTextFields = this.handleTextFields.bind(this)
    this.getData = this.getData.bind(this)
  }

  getData() {
    return this.state
  }

  handleSave() {
    if (this.isFormValid()) {
      this.props.submit()
    }
  }

  isFormValid() {
    const collectionNameErr = validateTextField(this.inputNameMap['collectionName'], this.state.collectionName)
    this.setState({ collectionNameErr: validateTextField(this.inputNameMap['collectionName'], this.state.collectionName) })

    const displayNameErr = validateTextField(this.inputNameMap['displayName'], this.state.displayName)
    this.setState({ displayNameErr: validateTextField(this.inputNameMap['displayName'], this.state.displayName) })

    // const shortNameErr = validateTextField(this.inputNameMap['shortName'], this.state.shortName)
    // this.setState({ shortNameErr: validateTextField(this.inputNameMap['shortName'], this.state.shortName) })

    if (!displayNameErr.status &&
      !collectionNameErr.status 
      // !shortNameErr.status
    ) {
      return true;
    }
    return false
  }

  handleTextFields(e) {
    const errName = `${e.target.name}Err`
    this.setState({
      [e.target.name]: e.target.value,
      [errName]: validateTextField(this.inputNameMap[e.target.name], e.target.value),
    })
  }

  render() {
    console.log("props", this.props)
    const { collectionNameErr, displayNameErr } = this.state
    return (
      <React.Fragment>
        <div className="form-group">
          <label className="label">Collection name*</label><br />
          <TextField
            onChange={this.handleTextFields}
            name="collectionName"
            value={this.state.collectionName}
            autoComplete='off'
            style={{ width: '100%' }}
          />
          {
            collectionNameErr.status &&
            <p className="error">* {collectionNameErr.value}</p>
          }
        </div>
        {/* <div className="form-group">
          <label className="label">Short name*</label><br />
          <TextField
            onChange={this.handleTextFields}
            name="shortName"
            value={this.state.shortName}
            style={{ width: '100%' }}
          />
          {
            shortNameErr.status &&
            <p className="error">* {shortNameErr.value}</p>
          }
        </div> */}
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

export default CollectionForm