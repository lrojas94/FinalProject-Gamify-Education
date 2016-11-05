import { Achievement as AchievementModel } from './../models/achievement';
import { handleActions, Action } from 'redux-actions';
import reducerGenerator from './../helpers/generateReducer';
import constants from './../constants/';

const achievementConstants = constants.achievements; //we're only using that one, so..

const reducer = reducerGenerator({
  constants: achievementConstants,
  modelName: 'achievement',
  model: AchievementModel,
});

export default handleActions(reducer.handleActions, reducer.initialState)
