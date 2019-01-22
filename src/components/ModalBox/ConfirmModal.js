import React from 'react'
import ModalHeader from './ModalHeader'
import ModalFooter from './ModalFooter'
import ModalBody from './ModalBody'
import ModalBox from './'
import { unMountModal } from './utils'

export default function confirmModal (data) {
  return class confirmModal extends React.Component {
    constructor (props) {
      super(props)
    }
    render () {
      return (
        <ModalBox>
          <ModalHeader>{ data.heading }</ModalHeader>
            <ModalBody>{ data.confirmMessage }</ModalBody>
          <ModalFooter>
            <button className='btn btn-secondary' onClick={unMountModal}>Cancel</button>
            <button className='btn btn-primary' onClick={data.handleConfirm}>Confirm</button>
          </ModalFooter>
        </ModalBox>
      )
    }
  }
}
