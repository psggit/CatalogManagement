import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

export function unMountModal() {
  // document.body.setAttribute('class', '')
  unmountComponentAtNode(document.getElementById('confirm-modal'))
}

export function mountModal(Component) {
  // document.body.setAttribute('class', 'no-scroll')
  render(
    <Component />, document.getElementById('confirm-modal')
  )
}
