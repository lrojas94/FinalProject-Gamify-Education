import * as axios from 'axios';
import {
    createAction,
    Action
} from 'redux-actions';
import _ from 'lodash';
import constants from './../constants/';

const homeConstants = constants.home;

const actions = {
    fetch: createAction(
        homeConstants.FETCH,
        () => {
            return (dispatch, getState) => {
                dispatch(actions.fetchLoading());
                axios.get(`/home`)
                    .then((res) => {
                            var data = res.data;
                            if (res.data.status === 0) {
                                return dispatch(actions.fetchSuccess(data));
                            } else {
                                var error = {
                                    errorMessage: res.data.message,
                                    errorCode: res.data.errorCode || null
                                };
                                return dispatch(actions.fetchError(error));
                            }

                        },
                        (err) => {
                            return dispatch(actions.fetchError({
                                errorMessage: err.message,
                                errorCode: null
                            }))
                        }
                    );
            };
        }
    ),

    fetchLoading: createAction(
        homeConstants.FETCH_LOADING,
        () => {}
    ),

    fetchSuccess: createAction(
        homeConstants.FETCH_SUCCESS,
        (data) => {
            return {
                data: data
            };
        }
    ),

    fetchError: createAction(
        homeConstants.FETCH_FAILURE,
        (error) => {
            return {
                error,
                message: error.errorMessage
            };
        }
    ),
}

export default actions;
