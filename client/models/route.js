import _ from 'lodash';

export class Route {
  url: string;
  displayName: string;
  /**
   * Compiled strings can have data passed so that it can then compile it with some custom data.
   * By using a template string here, we can dinamically add data attributes like 'view/${id}'
   * @type {object} Lodash _.template() object.
   */
  _templateString: object;

  constructor(url: string, displayName: string) {
    this.url = url;
    this.displayName = displayName;
    this._templateString = _.template(url);
  }

  getCompiledUrl(data) {
    return this._templateString(data);
  }
}
