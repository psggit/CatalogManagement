import React from 'react'
import Drawer from 'material-ui/Drawer'
import { NavLink, withRouter } from 'react-router-dom'
import MenuItem from 'material-ui/MenuItem'
import { List, ListItem } from 'material-ui/List'
import '@sass/components/_menu-item.scss'
import '@sass/components/_drawer.scss'
//import  { getIcon } from '@utils/icons-utils'

class NavigationBar extends  React.Component {
  constructor() {
    super()
    this.state = {
      activeItem: 0
    }
  }
  // handleClick(title) {
  //   this.props.setHeaderTitle(title)
  // }

  handleMenuItemClick(id, path) {
    if (path) {
      this.setState({ activeItem: id })
      this.props.history.push(path)
      // this.props.setHeaderTitle()
    }
  }

  render() {
    const activeItemStyle = {
      backgroundColor: '#dfdfdf'
    }
    const navigationItems = [
      {
        name: 'Map Manager',
        nestedItems: [
          { name: 'SKU Mapping', path: '/admin/sku-mapping', id: 1 },
        ]
      },
      {
        name: 'Catalog Management',
        nestedItems: [
          { name: 'Manage Brand', path: '/admin/manage-brand', id: 2 },
          { name: 'Manage SKU', path: '/admin/manage-sku', id: 3 },
          { name: 'Manage Genre', path: '/admin/manage-genre', id:4 }
        ]
      },
    ]
    return (
      <Drawer
        className="drawer"
        docked
        label="Default"
        open
        onRequestChange={this.props.toggleDrawer}
      >
        <div>
          <a href="/admin"><MenuItem className="menu-item-heading">CATALOG SYSTEM</MenuItem></a>
        </div>
        {
          <List className="list-wrapper">
            {
              navigationItems.map((item, i) => {
                const nestedItems = []
                item.nestedItems.forEach((nestedItem) => {
                  const nestedItemJSX = (
                    <ListItem 
                      key={nestedItem.id}
                      style={nestedItem.id === this.state.activeItem ? activeItemStyle : {}}
                      value={nestedItem.id}
                      onClick={() => { this.handleMenuItemClick(nestedItem.id, nestedItem.path) }}
                      primaryText={nestedItem.name}
                    />
                  )
                  nestedItems.push(nestedItemJSX)
                })

                return (
                  <ListItem className="item"
                    key={i}
                    style={item.id === this.state.activeItem ? activeItemStyle : {}}
                    onClick={() => { this.handleMenuItemClick(item.id, item.path) }}
                    primaryText={item.name}
                    initiallyOpen={false}
                    primaryTogglesNestedList
                    nestedItems={nestedItems}
                  />
                )
              })
            }
          </List>
        }
      </Drawer>
    )
  }
}

export default withRouter(NavigationBar)
