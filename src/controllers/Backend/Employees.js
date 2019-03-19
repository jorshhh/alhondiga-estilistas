
import ApiRequest from './ApiRequest';
import api from '../../config/api';

class Employees {
  getEmployees() {
    // return ApiRequest.buildAndFetch(api.backend.endpoint.getEmployees);
    return [
      {
        id: 'aca398c0-107a-11e9-849d-8347dcc28b06',
        name: 'Jorge Rangel',
        phone: '5585303388',
        location: 'aca398c0-107a-11e9-849d-8347dcc28b07',
      },
    ];
  }
}

export default Employees;