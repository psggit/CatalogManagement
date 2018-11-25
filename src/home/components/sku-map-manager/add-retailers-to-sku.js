import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import ViewUnmappedRetailers from './view-unmapped-retailers'

class AddRetailersToSku extends React.Component {
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
          title="Add retailers"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          <ViewUnmappedRetailers 
            handleClose={this.handleClose} 
            skuId={this.props.skuId} 
            handleAddRetailerToSku={this.props.handleAddRetailerToSku}
          /> 
        </Dialog>
      </div>
    )
  }
}

export default AddRetailersToSku
