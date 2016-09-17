import * as axios from 'axios';
import React, { Component } from 'react';
import Griddle from 'griddle-react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Route } from './../../models/route';
import GriddlePager from './griddlePager';

/**
 * For Paged Table to work, fetch function must take the following parameters:
 * (...customParameters, page, flush, query)
 *
 */


export class PagedTable extends Component {
    constructor(props) {
      super(props);
      this.setPage.bind(this);
    };

    componentWillMount() {

      var addons = this.props.queryAddons;

      if(this.props.fetchOnMount) {
        this.props.fetch(...this.props.customParameters, 1, true, addons);
      }
      var keys = this.props.queryKeys;


      this.findResults = _.debounce((query) => {

        var query = _.reduce(keys, (result, key) => {
          result[key]= query;
          return result;
        }, {});

        query = _.merge({}, query, this.props.queryAddons);
        this.props.fetch(...this.props.customParameters, 1, true, query);

       }, 300);
    }

    setPage(index) {
      index++;
      index = index > this.props.table.pageCount ? this.props.table.pageCount : index < 1 ? 1 : index;
      this.props.fetch(...this.props.customParameters, index);
    }
    setPageSize(size) {
      // Unavailable in the meantime.
    }

    setFilter(filter) {
      this.findResults(filter)
    }

    render() {

      if(this.props.error) {
        return (
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-xs-12'>
                <div className='alert alert-danger'> { this.props.error.message }</div>
              </div>
            </div>
          </div>
        )
      }

      if(!this.props.table) {
        return (
          <div></div>
        )
      }

      return (
          <div className='container-fluid'>
            {this.props.message ? (
              <div>
                <br/>
                <div className='row'>
                  <div className='col-xs-12'>
                    {this.props.message}
                  </div>
                </div>
              </div>
            ): ''}
            <div className='row'>
              <div className='col-xs-12'>
              <Griddle useExternal={true} externalSetPage={this.setPage.bind(this)}
                columnMetadata={this.props.columnMetadata}
                columns={this.props.columns}
                externalSetPageSize={this.setPageSize}
                externalChangeSort={() => {}} externalSetFilter={this.setFilter.bind(this)}
                externalMaxPage={this.props.table.pageCount}
                externalCurrentPage={this.props.table.currentPage - 1} results={this.props.table.data}
                externalIsLoading = {this.props.loading}
                resultsPerPage={this.props.table.elementsPerPage}
                showFilter={true} showSettings={false}
                noDataMessage={"No data could be found..."}
                tableClassName={'table-hover table table-responsive'}
                useGriddleStyles={false}
                useCustomPagerComponent={true}
                customPagerComponent={GriddlePager} />
              </div>
            </div>
          </div>
      );
    }
};

PagedTable.defaultProps = {
  customParameters: [],
  fetchOnMount: true,
  queryAddons: {}
}

export default PagedTable;
