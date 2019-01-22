import React from 'react'
import './index.scss'
import { unmountComponentAtNode } from 'react-dom'

class ModalBox extends React.Component {
  constructor() {
    super()
    this.state = {
      width: "46%",
      maxHeight: '95vh'
    }
  }
  handleClick(e) {
    if (e.keyCode == 27) {
      unmountComponentAtNode(document.getElementById('confirm-modal'))
      // document.body.setAttribute('class', '')
    }
  }

  handlePress(e) {
      if (e.target.className === 'modal-overlay') {
        unmountComponentAtNode(document.getElementById('confirm-modal'))
        // document.body.setAttribute('class', '')
      }
  }

  setModalContainerWidth(width) {
    this.setState({ width })
  }

  componentDidMount() {
    window.addEventListener('keyup', this.handleClick)
    document.addEventListener('click', this.handlePress)
  }
  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleClick)
    document.removeEventListener('click', this.handlePress)
  }
  render () {
    return (
      <div className='modal-overlay'>
        <div className='modal-container' style={{ width: this.state.width, maxHeight: this.state.maxHeight }}>
          { this.props.children }
        </div>
      </div>
    )
  }
}

export default ModalBox
