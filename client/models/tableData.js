export class TableData {
  _currentData: [object] = [];

  _nextPageUrl: string = '';
  _lastRetrievedPage: number = 0;
  _totalResults: number = 0;
  _searchQuery: object = {};
  _retrievedPages: [object] = [];
  _elementsPerPage: number = 10; //Default 10.
  _status: string = 'ok';
  _errorMessage: string = '';
  _errorCode: number = 0;

  get data() {
    return this._currentData;
  }
  get currentPage() {
    return this._lastRetrievedPage;
  }

  get elementsPerPage() {
    return this._elementsPerPage;
  }

  get totalResults() {
    return this._totalResults;
  }

  get pageCount() {
    return Math.ceil(this._totalResults / this._elementsPerPage);
  }

  set page(page) {
    var pageData = this.getPageData(page);
    this._currentData = pageData.data;
    this._lastRetrievedPage = pageData.page;
  }

  set totalResults(totalResults) {
    this._totalResults = totalResults;
  }

  get status() {
    return this._status;
  }

  set searchQuery(searchQuery) {
    this._searchQuery = searchQuery;
  }

  get searchQuery() {
    return this._searchQuery;
  }

  flushData() {
    this._data = [];
    this._retrievedPages = [];
    this._lastRetrievedPage = 0;
    this._totalResults = 0;
  }


  getPageData(page) {
    var index = _.findIndex(this._retrievedPages, (o) => { return o.page == page });
    return this._retrievedPages[index];
  }

  /**
  * Adds new data to a certain table.
  * @param  {object} data     The page data to be added
  * @param  {number} page        page number of the data.
  * @return {void}
  */
  hasFetched(page: number) {
    return _.findIndex(this._retrievedPages, (o) => { return o.page == page }) !== -1;
  }

  addData(data: [object], page: number) {
    this._retrievedPages = [...this._retrievedPages, {
      page,
      data
    }];

    this._lastRetrievedPage = page;
    this._currentData = data;
  }

  setErrorMessage(errorMessage, errorCode) {
    this._errorMessage = errorMessage;
    this._errorCode = errorCode;
    this._status = 'error';
  }

  clearErrorMessage() {
    this._errorMessage = '';
    this._errorCode = 0;
    this._status = 'ok';
  }
}

export default TableData;
