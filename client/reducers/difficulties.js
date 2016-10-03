import { Difficulty as DifficultyModel } from './../models/difficulty';
import { handleActions, Action } from 'redux-actions';
import reducerGenerator from './../helpers/generateReducer';
import constants from './../constants/';

const difficultyConstants = constants.difficultys; //we're only using that one, so..

const reducer = reducerGenerator({
  constants: difficultyConstants,
  modelName: 'difficulty',
  model: DifficultyModel,
});

export default handleActions(reducer.handleActions, reducer.initialState)
