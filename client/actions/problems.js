import constants from './../constants/';
import actionGenerator from './../helpers/generateActions';
const problemConstants = constants.problems;

const actions = actionGenerator({
  constants: problemConstants,
  baseUrl: 'problems/',
  resultObjectName: 'problem',
  attributes: ['problem','soltions']
});

export default actions;
