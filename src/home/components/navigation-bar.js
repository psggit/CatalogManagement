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
      // {
      //   name: 'State management',
      //   nestedItems: [
      //     { name: 'Manage states', path: '/home/manage-states', id: 1 },
      //     { name: 'Manage Cities', path: '/home/manage-cities', id: 2 },
      //     { name: 'Manage Localities', path: '/home/manage-localities', id: 3 },
      //   ]
      // },
      {
        name: 'Map manager',
        nestedItems: [
          { name: 'SKU mapping', path: '/home/sku-mapping', id: 1 },
        ]
      },
      // { name: 'Upload search data', path: '/home/upload-search-data', id: 7, nestedItems: [] },
      // { name: 'Delivery system check', path: '/home/delivery-system-check', id: 8, nestedItems: [] },
      // {
      //   name: 'Ads management',
      //   nestedItems: [
      //     { name: 'Manage image ads', path: '/home/manage-image-ads', id: 9 },
      //     { name: 'Manage collection ads', path: '/home/manage-collection-ads', id: 14 }
      //   ]
      // },
      // {
      //   name: 'Delivery management',
      //   nestedItems: [
      //     { name: 'Delivery person list', path: '/home/delivery-agents', id: 10 },
      //     { name: 'Manage possession limits', path: '/home/manage-possession-limits', id: 11 }
      //   ]
      // },
      // {
      //   name: 'Manage retailers',
      //   nestedItems: [
      //     { name: 'Retailers list', path: '/home/manage-retailers/retailers', id: 12 }
      //   ]
      // },
      // {
      //   name: 'HipBar Pay',
      //   nestedItems: [
      //     { name: 'Rollback transaction', path: '/home/hipbar-pay/rollback-transaction', id: 13 }
      //   ]
      // },
      // {
      //   name: 'Customer management',
      //   nestedItems: [
      //     { name: 'Customer Transactions', path: '/home/customer-transactions', id: 15 },
      //   ]
      // },
      // {
      //   name: 'Manage Collections',
      //   path: '/home/manage-collections',
      //   id: 16,
      //   nestedItems: []
      // },
      {
        name: 'SKU Management',
        nestedItems: [
          { name: 'Manage brand', path: '/home/manage-brand', id: 2 },
          { name: 'Manage SKU', path: '/home/manage-sku', id: 3 }
        ]
      },
      // {
      //   name: 'Brand management',
      //   nestedItems: [
      //     { name: 'Manage brand', path: '/home/manage-brand', id: 3 }
      //     // { name: 'Brand mapping', path: '/home/brand-mapping', id: 21 }
      //   ]
      // },
      // {
      //   name: 'Catalog Management',
      //   nestedItems: [
      //     { name: 'Manage category', path: '/home/manage-category', id: 4 },
      //     { name: 'Mapped brand list', path: '/home/manage-category/brands', id: 5 },
      //     { name: 'Map brand', path: '/home/manage-category/map-brand', id: 6 },
      //     { name: 'Unmap brand', path: '/home/manage-category/unmap-brand', id: 7 }
      //   ]
      // },
      // {
      //   name: 'Brand manager',
      //   nestedItems: [
      //     { name: 'Manage company', path: '/home/manage-company', id: 23 }
      //     // { name: 'Brand mapping', path: '/home/brand-mapping', id: 21 }
      //   ]
      // }
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
          <a href="/home"><MenuItem className="menu-item-heading">CATALOG SYSTEM</MenuItem></a>
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
