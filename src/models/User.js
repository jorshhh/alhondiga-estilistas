
class User {

  constructor () {
    this.isLoggedIn = false;
    this.token = '';
    this.refreshToken = '';
  }

  init (user) {
    const { token, refreshToken } = user;
    this.token = token;
    this.refreshToken = refreshToken;
    return this;
  }

  saveToDefaults () {
    localStorage.setItem('user', JSON.stringify(this.toJson()));
    return this;
  }

  loadFromDefaults () {
    const storage = localStorage.getItem('user');
    if (storage) {
      const parsed = JSON.parse(storage);
      return this.init(parsed);
    }
    return null;
  }

  removeFromDefaults () {
    localStorage.removeItem('user');
  }

  setTokens (tokens) {
    this.isLoggedIn = true;
    this.token = tokens.authToken;
    this.refreshToken = tokens.refreshToken;
    return this;
  }

  resetToken () {
    this.isLoggedIn = false;
    this.token = '';
    return this;
  }

  toJson() {
    const { token, refreshToken } = this;
    return {
      token,
      refreshToken,
    };
  }

}

export default User;