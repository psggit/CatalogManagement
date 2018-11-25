import React from 'react'
import ReactPagination from 'react-js-pagination'

class Pagination extends React.Component {
  constructor(props) {
    super(props)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.resetPagination = this.resetPagination.bind(this)
  }

  resetPagination() {
    this.props.setPage({
      activePage: 1,
      offset: 0
    })
  }

  handlePageChange(activePage) {
    const offset = this.props.itemsCountPerPage * (activePage - 1)
    this.props.setPage({
      activePage,
      offset
    })
  }

  render() {
    return (
      <ReactPagination
        activePage={this.props.activePage}
        itemsCountPerPage={this.props.itemsCountPerPage}
        totalItemsCount={this.props.totalItemsCount}
        pageRangeDisplayed={this.props.pageRangeDisplayed}
        onChange={this.handlePageChange}
      />
    )
  }
}

export default Pagination
