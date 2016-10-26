import request from 'superagent';

export default {

  /**
   * Make HTTP request to the given URI with a GET method.
   *
   * @param {string} uri
   * @param {Object} query
   * @return {Promise}
   */
  get(uri, query = {}) {
    return this.request('GET', uri, query);
  },

  /**
   * Make HTTP request to the given URI with a POST method.
   *
   * @param {string} uri
   * @param {Object} data
   * @return {Promise}
   */
  post(uri, data) {
    return this.request('POST', uri, null, data);
  },

  /**
   * Make HTTP request to the given URI with a PUT method.
   *
   * @param {string} uri
   * @param {Object} data
   * @return {Promise}
   */
  put(uri, data) {
    return this.request('PUT', uri, null, data);
  },

  /**
   * Make HTTP request to the given URI with a DELETE method.
   *
   * @param {string} uri
   * @return {Promise}
   */
  delete(uri) {
    return this.request('DELETE', uri);
  },

  /**
   * Make HTTP request to the given URI with provided data.
   *
   * @param {string} method
   * @param {string} uri
   * @param {Object} query
   * @param {Object} data
   * @return {Promise}
   */
  request(method, uri, query = null, data = null) {
    return new Promise((resolve, reject) => {
      const req = request(method.toUpperCase(), uri);

      if (query) req.query(query);

      if (data) req.send(data);

      req.end((err, res) => (err ? reject(err) : resolve(res)));
    });
  },
};
