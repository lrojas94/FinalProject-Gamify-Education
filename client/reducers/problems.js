import { Problem as ProblemModel } from './../models/problem';
import { handleActions, Action } from 'redux-actions';
import reducerGenerator from './../helpers/generateReducer';
import constants from './../constants/';

const problemConstants = constants.problems; //we're only using that one, so..

const reducer = reducerGenerator({
  constants: problemConstants,
  modelName: 'problem',
  model: ProblemModel,
});

export default handleActions(reducer.handleActions, reducer.initialState)
