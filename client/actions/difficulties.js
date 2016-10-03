import constants from './../constants/';
import actionGenerator from './../helpers/generateActions';
const difficultyConstants = constants.difficultys;

const actions = actionGenerator({
  constants: difficultyConstants,
  baseUrl: 'difficultys/',
  resultObjectName: 'difficulty',
  attributes: ['difficulty']
});

export default actions;
