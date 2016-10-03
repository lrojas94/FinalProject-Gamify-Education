import { Topic as TopicModel } from './../models/topic';
import { handleActions, Action } from 'redux-actions';
import reducerGenerator from './../helpers/generateReducer';
import constants from './../constants/';

const topicConstants = constants.topics; //we're only using that one, so..

const reducer = reducerGenerator({
  constants: topicConstants,
  modelName: 'topic',
  model: TopicModel,
});

export default handleActions(reducer.handleActions, reducer.initialState)
