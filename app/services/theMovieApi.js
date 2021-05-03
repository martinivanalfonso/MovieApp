import _ from 'lodash'
import { stringify as obj2queryString } from 'query-string'
// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
import { API_KEY as api_key } from "@env"

const tag = 'TheMovieApi'
const debug = require('debug')(tag)

/**
 * TheMovie API service
 * @class TheMovieApi
 * @alias api
 */
class TheMovieApi {
    /**
   * TheMovieApi instance
   * @type TheMovieApi
   */
    apiUrl = "https://api.themoviedb.org/3"

    REQUEST_TIMEOUT = 5000

    static _addQueryParams(url, params) {
        if (!_.isEmpty(params)) {
          return `${url}?${obj2queryString(params)}`
        }
        return url
      }

      static _promiseWithTimeout(promise, timeout, error) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            reject(error)
          }, timeout)
          promise.then(resolve, reject)
        })
      }
    
    
    async fetch(method, path, params = {}, data = {}) {
        debug(tag, `fetch method ${method} path ${path} params ${params} data ${data}`)
        const requestId = Date.now()
        try {
          const url = TheMovieApi._addQueryParams(
            this.apiUrl + path,
            { ...params, api_key }
          )
    
          const fetchOptions = {
            method,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            credentials: 'omit'
          }

    
          if (!_.isEmpty(data) && (method === 'POST' || method === 'PUT')) {
            fetchOptions.body = JSON.stringify(data)
          }
    
          const response = await TheMovieApi._promiseWithTimeout(
            fetch(url, fetchOptions),
            this.REQUEST_TIMEOUT,
            new Error('Timeout Error')
          )
    
    
          if (response.ok) { // checks that status is in the range 200-299 inclusive
            const resBody = await response.json()
            debug('fetch: resBody', requestId, url, resBody)
            return resBody
          } 

          const error = new Error('Response Not OK')
          error.response = response
          throw error
        } catch (err) {
          debug('fetch err', requestId, err.response)
        }
      }

      async get(path, queryParams = {}, data = {}) {
        debug('get', path, queryParams)
        try {
          return this.fetch('GET', path, queryParams, data)
        } catch (err) {
          debug('get', err)
          throw err
        }
      }

}

if (_.isEmpty(TheMovieApi.instance)) {
    TheMovieApi.instance = new TheMovieApi()
  }
  // Return the instance
  export default TheMovieApi.instance
  