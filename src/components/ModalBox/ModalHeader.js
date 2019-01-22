import React from 'react'

class ModalHeader extends React.Component {
  render () {
    return (
      <div className='modal-header'>
        <p>{ this.props.children }</p>
      </div>
    )
  }
}

export default ModalHeader
