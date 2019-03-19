
import Auth from './Auth';
import ApiRequest from './ApiRequest';
import Locations from './Locations';
import Customers from './Customers';
import Products from './Products';
import Employees from './Employees';

class Backend {
  constructor () {
    const classes = [ Auth, Locations, Products, Employees, Customers ];

    this.assignMethods(classes);
    this.loadData();
  }

  get _user() {
    return Auth.user;
  }

  get root() {
    return ApiRequest.root;
  }

  get environment() {
    return ApiRequest.environment;
  }

  assignMethods(classes) {
    const getMethods = aClass => 
      Object
        .getOwnPropertyNames(aClass.prototype)
        .filter(m => m !== 'constructor')
        .map(name => ({ name, method: aClass.prototype[name] }));
    
    const methods = classes.map(getMethods).reduce((acc, m) => [...acc, ...m], []);
    methods.map(({ name, method }) => this[name] = method);
  }
  
  registerListener(listener) {
    Auth.callback.push(listener);
  }
}

const singleton = new Backend();

export default singleton;
