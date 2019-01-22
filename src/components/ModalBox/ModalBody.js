import React from 'react'

class ModalBody extends React.Component {
  render () {
    return (
      <div className='modal-body' style={{ height: this.props.height || '100%' }}>
        { this.props.children }
      </div>
    )
  }
}

export default ModalBody
