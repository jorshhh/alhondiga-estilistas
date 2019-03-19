
import api from '../../config/api';
import Auth from './Auth';
import Backend from './index';

class ApiRequest {
  constructor () {
    this.environment = 'staging';

    this.root = api.backend[this.environment].root;
    this.headers = api.backend[this.environment].headers;

    this._sessionLog = [];
  }
  
  static objToGetParams(obj) {
    const params = Object.keys(obj)
      .map((key) => {
        if (obj[key] !== null && obj[key] !== undefined) {
          if (obj[key] instanceof Array) {
            return obj[key]
              .map(param => `${key}=${param}`)
              .join('&');
          }
          return `${key}=${obj[key]}`;
        }
        return null;
      })
      .filter(param => param);
    return `?${params.join('&')}`;
  }

  async sendRequest (
    url,
    method,
    body,
    headers = this.headers,
    token = Auth.user ? Auth.user.token : '',
    multipart = false,
  ) {
    try {

      const request = {
        method: method,
        headers,
        body: (body && !multipart) ? JSON.stringify(body) : undefined,
      };

      if (multipart) {
        delete request.headers['Content-Type'];
        request.body = body;
      }

      request.headers.Authorization = token;
      request.headers = new Headers(request.headers);

      console.log('sending', request);

      this._sessionLog.push('Sending Request');
      this._sessionLog.push(url);
      this._sessionLog.push(request);

      const response = await fetch(url, request);

      this._sessionLog.push('Got response');
      this._sessionLog.push(response);

      console.log('got', response)

      if ((Auth.user && Auth.user.token) && response.status === api.backend.response.refresh) {

        this._sessionLog.push(`Got ${api.backend.response.refresh} while having a token, trying to refresh`);

        await Backend.resetToken();
        try {
          await Backend.refreshToken(Auth.user.refreshToken);
        } catch (error) {
          console.warn('Unable to refresh session');
          Backend.logout();
        }

        this._sessionLog.push('Token was refreshed');

        return await this.sendRequest(url, method, body);

      } else if (response.status === api.backend.response.forbidden) {
        alert('401 - Forbiden');
        throw { status: response.status };
      } else if (response.status < 200 || response.status > 299) {
        this._sessionLog.push('status is not OK');
        throw { status: response.status };
      } else if (response.status > 201 && response.status < 300) {
        this._sessionLog.push('status is ' + response.status);
        return true;
      }

      const responseBody = await response.json();

      this._sessionLog.push('Parsed response');
      this._sessionLog.push(responseBody);

      return responseBody;

    } catch(error) {
      this._sessionLog.push(error);
      throw error;
    }

  }

  buildAndFetch(endpoint, body) {
    const { name, method } = endpoint;
    const url = this.root + name;
    return this.sendRequest(url, method, body);
  }

  buildAndFetchMultipart(endpoint, body, file) {
    const { name, method } = endpoint;
    const url = this.root + name;
    const formData = new FormData();
    formData.append('body', JSON.stringify(body));

    if (file) {
      if (file instanceof Array) {
        file.forEach(f => formData.append('file[]', f));
      } else {
        formData.append('file', file);
      }
    }

    return this.sendRequest(url, method, formData, undefined, undefined, true);
  }
}

const singleton = new ApiRequest();

export default singleton;