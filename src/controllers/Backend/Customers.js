
import ApiRequest from './ApiRequest';
import api from '../../config/api';

class Customers {
  getCustomers() {
    // return ApiRequest.buildAndFetch(api.backend.endpoint.getCustomers);
    return [
      {
        id: '0a641980-20f8-11e9-a7f1-3de64111903c',
        name: 'Prueba 2',
        email: 'jrangel@aidc.mx',
        phone: '5512345678',
        location_id: '5e76c030-107b-11e9-add4-5d1aebebf3d0',
      },
    ];
  }
}

export default Customers;