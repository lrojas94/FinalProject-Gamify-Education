import { assign } from 'lodash';
import { handleActions, Action } from 'redux-actions';
import _ from 'lodash';

import { TableData } from './../models/tableData';
import { APIError } from './../models/apiError';

const generateError = (state, action) => {
  var error = new APIError(action.payload.errorMessage, action.payload.errorCode, action.payload.errorData);
  return error
}

/**
 * Generates reducers to handle states. Must be used along with generateActions and generateConstants.
 * Note that the object is returned in order for them to be overwritten if needed.
 * @param  {object} constants     Basic constants.
 * @param  {string} modelName     Name which allows access to the data.
 * @param  {object} model         Base model class to create model objects.
 * @return {object}               Returns initial state as well as reducer functions. That way, they can be overwritten if needed.
 */
const generateReducer = ({ constants, modelName, model }) => {
  const initialState = {
    view: {
      [modelName]: {
        loading: false,
        data: {},
        error: null,
        status: '',
      },
    },
    create: {
      loading: false,
      data: {},
      error: null,
      status: '',
    },
    update: {
      loading: false,
      data: {},
      error: null,
      status: '',
    },
    delete: {
      loading: false,
      data: {},
      error: null,
      status: '',
    },
    table: {
      loading: false,
      data: new TableData(),
      error: null,
      status: '',
    },
    options: {
      loading: false,
      data: [],
      error: null,
      status: '',
    }
  };

  const handleActions = {
    [constants.FETCH_ALL]: (state, action)  => {
      return _.assign({}, state);
    },
    [constants.FETCH_ALL_LOADING]: (state, action) => {
      return _.assign({}, state, { table: { loading: true, error: null, data: state.table.data, status: 'loading' } });
    },
    [constants.FETCH_ALL_SUCCESS]: (state, action)  => {
      var table = state.table.data;
      var data = action.payload.data;

      if(!data) {
        // Just update page info:
        table.page = action.payload.page;
        return _.assign({}, state, { table: { data: table, loading: false, error: null, status: 'success' } });
      }

      if(action.payload.flush) {
        table.flushData();
      }

      table.totalResults = data.count;
      table.searchQuery = data.searchQuery;
      table.addData(data.data, data.page);

      return _.assign({}, state,  { table: { data: table, loading: false, error: null, status: 'success' } });
    },
    [constants.FETCH_ALL_FAILURE]: (state, action)  => {
      return _.assign({}, state, { table: { loading: false, error: generateError(state, action), data: null, status: 'failure' } });
    },
    [constants.FETCH]: (state, action) => {
      return _.merge({}, state, { view: { [modelName]:  { loading: false, error: null, data: null, status: '' }}});
    },

    [constants.FETCH_LOADING]: (state, action) => {
      return _.merge({}, state, { view: { [modelName]: { loading: true, error: null, data: null, status: 'loading' }}});
    },

    [constants.FETCH_SUCCESS]: (state, action) => {
      var data = new model(action.payload[modelName]);
      console.log(data);
      return _.merge({}, state, { view: { [modelName]:  { data: data, error: null, loading: false, status: 'success' }}});
    },

    [constants.FETCH_FAILURE]: (state, action) => {
      return _.merge({}, state, { view: { [modelName]: { loading: false, data: null, error: generateError(state, action), status: 'failure' }}});
    },

    [constants.UPDATE]: (state, action) => {
      return _.assign({}, state, { update: { loading: false, data: null, error: null, status: '' }});
    },

    [constants.UPDATE_LOADING]: (state, action) => {
      return _.assign({}, state, { update: { loading: true, data: null, error: null, status: 'loading' }});
    },

    [constants.UPDATE_SUCCESS]: (state, action) => {
      var data = new model(action.payload[modelName]);
      return _.assign({}, state, { update: { loading: false, data: data, error: null, status: 'success' }});
    },

    [constants.UPDATE_FAILURE]: (state, action) => {
      return _.assign({}, state, { update: { loading: false, data: null, error: generateError(state, action), status: 'failure' }});
    },

    [constants.CREATE]: (state, action) => {
      return _.assign({}, state, { create: { loading: false, data: null, error: null, status: '' }});
    },

    [constants.CREATE_LOADING]: (state, action) => {
      return _.assign({}, state, { create: { loading: true, data: null, error: null, status: 'loading' }});
    },

    [constants.CREATE_SUCCESS]: (state, action) => {
      var data = new model(action.payload[modelName]);
      return _.assign({}, state, { create: { loading: false, data: data, error: null, status: 'success' }});
    },

    [constants.CREATE_FAILURE]: (state, action) => {
      return _.assign({}, state, { create: { loading: false, data: null, error: generateError(state, action), status: 'failure' }});
    },

    [constants.DELETE]: (state, action) => {
      return _.assign({}, state, { delete: { loading: false, data: null, error: null, status: '' }});
    },

    [constants.DELETE_LOADING]: (state, action) => {
      return _.assign({}, state, { delete: { loading: true, data: null, error: null, status: 'loading' }});
    },

    [constants.DELETE_SUCCESS]: (state, action) => {
      return _.assign({}, state, { delete: { loading: false, data: null, error: null, status: 'success' }});
    },

    [constants.DELETE_FAILURE]: (state, action) => {
      return _.assign({}, state, { delete: { loading: false, data: null, error: generateError(state, action), status: 'failure' }});
    },

    [constants.FETCH_OPTIONS]: (state, action) => {
      return _.assign({}, state, { options: { loading: false, data: [], error: null, status: '' }});
    },

    [constants.FETCH_OPTIONS_LOADING]: (state, action) => {
      return _.merge({}, state, { options: { loading: true, error: null, status: 'loading' }});
    },

    [constants.FETCH_OPTIONS_SUCCESS]: (state, action) => {
      return _.assign({}, state, { options: { loading: false, data: action.payload.data, error: null, status: 'success' }});
    },

    [constants.FETCH_OPTIONS_FAILURE]: (state, action) => {
      return _.assign({}, state, { options: { loading: false, data: null, error: generateError(state, action), status: 'failure' }});
    },
  };

  return {
    initialState,
    handleActions
  }

}

export default generateReducer;
