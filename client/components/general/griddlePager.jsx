import React, { Component } from 'react';
import { Link } from 'react-router';
import * as _ from 'lodash'
/**
 * There's no point on connecting this with redux because props will be gotten from
 * Griddle.
 */

const defaultProps = {
  maxPage: 0,
  nextText: "",
  previousText: "",
  currentPage: 0,
};

export class GriddlePager extends Component {

  constructor(props) {
    super(props);
  };

  pageChange(event){
      this.props.setPage(parseInt(event.target.getAttribute("data-value")));
  }

  render() {
    var pages = [];

    var startIndex = Math.max(this.props.currentPage - 2, 0);
    var endIndex = Math.min(this.props.currentPage + 2, this.props.maxPage - 1);

    for(var i = startIndex; i <= endIndex; i++) {
      pages.push(<li key={i} className={i ==  this.props.currentPage ? 'active' : ''}><a href="#" onClick={this.pageChange.bind(this)} data-value={i}>{i+1}</a></li>)
    }

    return (
      <div className='row'>
        <div className='col-xs-12 text-center'>
          <nav aria-label="Page navigation">
            <ul className="pagination">
              <li>
                <a href="#" onClick={this.pageChange.bind(this)} data-value='0' aria-label="First">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li>
                <a href="#" onClick={this.props.previous} data-value='0' aria-label="Previous">
                  <span aria-hidden="true">&lsaquo; Prev</span>
                </a>
              </li>
              {pages}
              <li>
                <a href="#" onClick={this.props.next} data-value='0' aria-label="Previous">
                  <span aria-hidden="true">Next &rsaquo;</span>
                </a>
              </li>
              <li>
                <a href="#" aria-label="Next" onClick={this.pageChange.bind(this)} data-value={this.props.maxPage}>
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    )

  }
};

GriddlePager.defaultProps = defaultProps;

export default GriddlePager;
