import React from 'react'

class DisplayScreen extends React.Component {
  render() {
    const displayScreenStyle = {
      padding: '80px 100px',
      marginTop: '64px',
      marginLeft: '256px',
      height: 'calc(100vh - 224px)',
      overflow: 'auto'
    }
    return (
      <div id="display-screen" style={displayScreenStyle}>
        {
          this.props.children
        }
      </div>
    )
  }
}

export default DisplayScreen
