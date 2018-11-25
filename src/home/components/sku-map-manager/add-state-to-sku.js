import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import ViewUnmappedStates from './view-unmapped-states'

class AddStateToSku extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true
    }
    this.handleClose = this.handleClose.bind(this)
  }
  handleClose() {
    this.setState({ open: false })
    setTimeout(() => {
      this.props.handleClose()
    }, 500)
  }
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onClick={this.handleClose}
      />
    ]
    return (
      <div>
        <Dialog
          title="Add state"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          <ViewUnmappedStates handleClose={this.handleClose} skuId={this.props.skuId} handleAddStateToSku={this.props.handleAddStateToSku}/> 
        </Dialog>
      </div>
    )
  }
}

export default AddStateToSku
