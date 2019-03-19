
import ApiRequest from './ApiRequest';
import api from '../../config/api';

class Products {
  getProducts() {
    // return ApiRequest.buildAndFetch(api.backend.endpoint.getProducts);
    return [
      {
        id: 'aca398c0-107a-11e9-849d-8347dcc28b03',
        sku: '31416',
        name: 'Producto de prueba',
        price: '100',
        commission: '50',
        is_service: 1,
      },
    ];
  }
}

export default Products;