import constants from './../constants/';
import actionGenerator from './../helpers/generateActions';
const achievementConstants = constants.achievements;

const actions = actionGenerator({
  constants: achievementConstants,
  baseUrl: 'achievements/',
  resultObjectName: 'achievement',
  attributes: ['achievement']
});

export default actions;
