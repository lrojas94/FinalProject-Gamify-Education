import constants from './../constants/';
import actionGenerator from './../helpers/generateActions';
const topicConstants = constants.topics;

const actions = actionGenerator({
  constants: topicConstants,
  baseUrl: 'topics/',
  resultObjectName: 'topic',
  attributes: ['topic']
});

export default actions;
