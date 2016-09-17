import * as axios from 'axios';
import {
    createAction,
    Action
} from 'redux-actions';
import _ from 'lodash';
import constants from './../constants/';

/**
 * Generates all actions required for CRUD operations.
 * @param  {object} constants Constants strings to be used as actions.
 * @param  {string} baseUrl          the appended URL to each item
 * @param  {string} resultObjectName  The object's location inside the result data.
 * @param  {string} attributes  attributes which will be taken when trying to create/edit the object..
 * @return {Actions}                  A List of possible actions.
 */
const generate = ({
        constants,
        baseUrl,
        resultObjectName,
        attributes
    }) => {
        const createdActions =  {
            fetchAll: createAction(
                constants.FETCH_ALL,
                (page, flush, search) => {
                    flush = !!flush;
                    return (dispatch, getState) => {
                        var state = getState();
                        var table = state[`${resultObjectName}s`].table.data;
                        search = search || table.searchQuery;
                        if (page === 'current') {
                            page = table.currentPage;
                        }

                        if (table.hasFetched(page) && table.searchQuery == search && !flush) {
                            // dispatch with no changes.
                            // That will update the current page and data but won't fetch new data.
                            dispatch(createdActions.fetchAllSuccess(page, null, flush));
                            return;
                        }

                        dispatch(createdActions.fetchAllLoading());
                        var params = _.extend({
                            page
                        }, search);
                        axios.get(`${baseUrl}`, {
                                params,
                            })
                            .then((res) => {
                                    var data = res.data;
                                    if (res.data.status === 0) {
                                        return dispatch(createdActions.fetchAllSuccess(page, data, flush));
                                    } else {
                                        var error = {
                                            errorMessage: res.data.message,
                                            errorCode: res.data.errorCode || null
                                        };

                                        return dispatch(createdActions.fetchAllError(error));
                                    }

                                },
                                (err) => {
                                    return dispatch(createdActions.fetchAllError({
                                        errorMessage: err.message,
                                        errorCode: null
                                    }))
                                }
                            );
                    };
                }
            ),

            fetchAllLoading: createAction(
                constants.FETCH_ALL_LOADING,
                () => {
                    return {};
                }
            ),

            fetchAllSuccess: createAction(
                constants.FETCH_ALL_SUCCESS,
                (page, data, flush) => {
                    return {
                        page,
                        data: data || null,
                        flush
                    };
                }
            ),

            fetchAllError: createAction(
                constants.FETCH_ALL_FAILURE,
                (error) => {
                    return {
                        error
                    };
                }
            ),

            /**
             * General Permission functionality
             */

            /**
             * View Permission
             */
            fetchLoading: createAction(
                constants.FETCH_LOADING,
                () => {
                    return {};
                }
            ),

            fetch: createAction(
                constants.FETCH,
                (id) => {
                    return (dispatch, getState) => {
                        var state = getState();
                        dispatch(createdActions.fetchLoading());
                        axios.get(`${baseUrl}${id}`, {
                                headers: {
                                    'Authorization': `JWT ${state.session.session.token}`
                                }
                            })
                            .then((res) => {
                                    var data = res.data;
                                    console.log(data);
                                    if (res.data.status === 0) {
                                        return dispatch(createdActions.fetchSuccess(data[resultObjectName]));
                                    } else {
                                        var error = {
                                            errorMessage: res.data.message,
                                            errorCode: res.data.errorCode || null,
                                            errorData: res.data.errorData || {}
                                        };

                                        return dispatch(createdActions.fetchError(error));
                                    }
                                },
                                (err) => {
                                    dispatch(createdActions.fetchError({
                                        errorMessage: err.message,
                                        errorCode: null,
                                        errorData: {}
                                    }))
                                }
                            );
                    };
                }
            ),

            fetchSuccess: createAction(
                constants.FETCH_SUCCESS,
                (data) => {
                    return {
                      [resultObjectName]: data
                    };
                }
            ),

            fetchError: createAction(
                constants.FETCH_FAILURE,
                (error) => {
                    return {
                        error
                    };
                }
            ),

            /** Create Permission:
             **/

            createClear: createAction(
                constants.CREATE,
                () => {
                    return {}
                }
            ),

            create: createAction(
                constants.CREATE,
                (data) => {
                    var data = _.pick(data, attributes);
                    return (dispatch, getState) => {
                        var state = getState();

                        axios.post(`${baseUrl}`, data)
                            .then((res) => {
                                var data = res.data;
                                if (data.status === 0) {
                                    dispatch(createdActions.createSuccess(data[resultObjectName]));
                                    return dispatch(createdActions.fetchAll(1, true));
                                } else {
                                    return dispatch(createdActions.createFailure(data.message, data.errorCode, data.errorData));
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                                dispatch(createdActions.createFailure(err.message));
                            })
                    }
                }
            ),

            createLoading: createAction(
                constants.CREATE_LOADING,
                () => {
                    return {};
                }
            ),

            createSuccess: createAction(
                constants.CREATE_SUCCESS,
                (data) => {
                    return {
                      [resultObjectName]: data
                    };
                }
            ),

            createFailure: createAction(
                constants.CREATE_FAILURE,
                (error) => {
                    return {
                        error
                    };
                }
            ),

            /**
             *
             * Edit Permission Actions.
             */

            updateClear: createAction(
                constants.UPDATE,
                () => {
                    return {}
                }
            ),

            update: createAction(
                constants.UPDATE,
                (id, data) => {
                    var data = _.pick(data, attributes);
                    return (dispatch, getState) => {
                        var state = getState();

                        axios.put(`${baseUrl}${id}`, data)
                            .then((res) => {
                                var data = res.data;
                                if (data.status === 0) {
                                    dispatch(createdActions.updateSuccess(data[resultObjectName]));
                                    return dispatch(createdActions.fetch(data[resultObjectName].id));
                                } else {
                                    return dispatch(createdActions.updateFailure(data.message, data.errorCode, data.errorData));
                                }
                            })
                            .catch((err) => {
                                return dispatch(createdActions.updateFailure(err.message));
                            })
                    }
                }
            ),

            updateLoading: createAction(
                constants.UPDATE_LOADING,
                () => {
                    return {};
                }
            ),

            updateSuccess: createAction(
                constants.UPDATE_SUCCESS,
                (data) => {
                    return {
                      [resultObjectName]: data
                    };
                }
            ),

            updateFailure: createAction(
                constants.UPDATE_FAILURE,
                (error) => {
                    return {
                        error
                    };
                }
            ),

            /**
             * Delete Permissions
             * */

            deleteClear: createAction(
                constants.DELETE,
                () => {
                    return {}
                }
            ),

            delete: createAction(
                constants.DELETE,
                (id) => {
                    return (dispatch, getState) => {
                        var state = getState();
                        console.log(state.routing);

                        axios.delete(`${baseUrl}${id}`)
                            .then((res) => {
                                var data = res.data;
                                if (data.status === 0) {
                                    return dispatch(createdActions.deleteSuccess(data[resultObjectName]));
                                } else {
                                    return dispatch(createdActions.deleteFailure(data.message, data.errorCode, data.errorData));
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                                return dispatch(createdActions.deleteFailure(err.message));
                            })
                    }
                }
            ),

            deleteLoading: createAction(
                constants.DELETE_LOADING,
                () => {
                    return {};
                }
            ),

            deleteSuccess: createAction(
                constants.DELETE_SUCCESS,
                (data) => {
                    return {
                      [resultObjectName]: data
                    };
                }
            ),

            deleteFailure: createAction(
                constants.DELETE_FAILURE,
                (error) => {
                    return {
                        error
                    };
                }
            ),

            fetchOptions: createAction(
                constants.FETCH_OPTIONS,
                (search) => {
                    return (dispatch, getState) => {
                        var state = getState();
                        axios.get(`${baseUrl}options`, {
                          params: { search }
                        })
                        .then((res) => {
                            var data = res.data;
                            if (data.status === 0) {
                                return dispatch(createdActions.fetchOptionsSuccess(data.data));
                            } else {
                                return dispatch(createdActions.fetchOptionsFailure(data.message, data.errorCode, data.errorData));
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                            return dispatch(createdActions.fetchOptionsFailure(err.message));
                        })
                    }
                }
            ),

            fetchOptionsLoading: createAction(
                constants.FETCH_OPTIONS_LOADING,
                () => {
                    return {};
                }
            ),

            fetchOptionsSuccess: createAction(
                constants.FETCH_OPTIONS_SUCCESS,
                (data) => {
                    return {
                      data
                    };
                }
            ),

            fetchOptionsFailure: createAction(
                constants.FETCH_OPTIONS_FAILURE,
                (error) => {
                    return {
                      error
                    };
                }
            ),
        }

        return createdActions;
    }


export default generate;
