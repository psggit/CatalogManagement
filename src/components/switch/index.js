import React from 'react'
import Toggle from 'material-ui/Toggle'

class Switch extends React.Component {
    constructor() {
        super()
        this.onToggle = this.onToggle.bind(this)
    }
    onToggle(e, toggleStatus) {
        this.props.onToggle(this.props.value, toggleStatus)
    }

    render() {
        return (
            <div>
                <Toggle toggled={this.props.toggled} onToggle={this.onToggle}/>
            </div>
            
        )
    }
}

export default Switch