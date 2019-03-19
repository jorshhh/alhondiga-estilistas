
import ApiRequest from './ApiRequest';
import User from '../../models/User';
import api from '../../config/api';
import strings from '../../config/strings';

class Auth {
  setToken (token, refresh) {
    Auth.user.setTokens({ authToken: `Bearer ${token}`, refreshToken: `${refresh}` }).saveToDefaults();
  }

  resetToken () {
    Auth.user.resetToken().saveToDefaults();
  }

  async setUser (admin) {
    Auth.user = await new User().init({ admin }).saveToDefaults();
  }

  updateUser (user) {
    Auth.user.init(user).saveToDefaults();
  }

  async logout () {
    await Auth.user.removeFromDefaults();
    Auth.user = null;
    // window.location.reload();
  }

  async loadData () {
    Auth.user = await new User().loadFromDefaults();
    if (this.isLoggedIn()) {
      Auth.callback.forEach( listener => listener.listenToAuthorization ? listener.listenToAuthorization(true) : null );
    }
  }

  isLoggedIn () {
    return Auth.user && Auth.user.token;
  }

  async didLogin (data) {
    const { response } = data;
    await this.setUser(response);
    this.setToken(response.token, null);
    Auth.callback.forEach( listener => listener.listenToAuthorization ? listener.listenToAuthorization(true) : null );
  }

  /* API calls */

  async login (email, password) {
    const body = { email, password };

    try {
      const data = await ApiRequest.buildAndFetch(api.backend.endpoint.login, body);
      return this.didLogin(data);
    } catch (error) {
      if (error.status === 401) {
        alert(strings().error.unauthorized);
      } else if (error.status === 404) {
        alert(strings().error.userNotFound);
      }
      throw error;
    }

  }

  async setPassword (token, password) {
    const body = { token, password };

    try {
      return ApiRequest.buildAndFetch(api.backend.endpoint.setPassword, body);
    } catch (error) {
      if (error.status === 404) {
        alert(strings().error.userNotFound);
      }
      throw error;
    }
  }

  async requestPassword (email) {
    const body = { email };

    try {
      return ApiRequest.buildAndFetch(api.backend.endpoint.requestPassword, body);
    } catch (error) {
      if (error.status === 404) {
        alert(strings().error.userNotFound);
      }
      throw error;
    }
  }

  async refreshToken (token) {
    const body = { token };

    try {
      const response = await ApiRequest.buildAndFetch(api.backend.endpoint.refresh, body);
      await this.setToken(response.accessToken.token, response.refreshToken);
    } catch (error) {
      throw error;
    }
  }
}

Auth.user = null;
Auth.callback = [];

export default Auth;
