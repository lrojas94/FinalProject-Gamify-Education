import React, { Component } from 'react';
import { Link } from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as _ from 'lodash'

/**
 * Creates a search field and performs a search based on it.
 */
export class AutoFillSelectBox extends Component {
    constructor(props) {
      super(props);
      this.state = {
        selected: null || this.props.selected
      }
    };

    componentWillMount() {
      this.findResults = _.debounce((query) => {
        this.props.fetch(...this.props.customParameters, query);
       }, 300);
    }

    renderOptions() {
      return _.map(this.props.items, (item) => {
        return (<option value={item.id} onClick={this.itemSelected.bind(this)} data-text={item.text} key={item.id}>{item.text}</option>)
      });
    }

    searchChange(e) {
      this.findResults(e.target.value);
    }

    itemSelected(e) {
      console.log(e.target);
      this.setState({ selected: { id: e.target.value, text: e.target.dataset.text }});
    }

    render() {
      // search box:
      return (
        <div>
          {this.props.searchTitle ? (<label htmlFor={this.props.searchId || 'search-selectable'}>{this.props.searchTitle || 'Search'}</label>) : ""}
          <input id={this.props.searchId || 'search-selectable'} onChange={this.searchChange.bind(this)}
          type='text' className='form-control search' placeholder='Type in here to filter information...'></input>
          <br/>
          <select size={this.props.size || 5 }
            className='form-control' name={this.props.name||'selectableOption'}
            value={this.props.defaultValue}
            onChange={this.props.handleFormChange}
            >
            {this.state.selected ? (<option value={this.state.selected.id}>{this.state.selected.text}</option>) : ''}
            {this.renderOptions()}
          </select>

        </div>
      );
    }
};

AutoFillSelectBox.defaultProps = {
  customParameters: []
}

export default AutoFillSelectBox;
