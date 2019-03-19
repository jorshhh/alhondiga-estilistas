
import ApiRequest from './ApiRequest';
import api from '../../config/api';

class Locations {
  getLocations() {
    return ApiRequest.buildAndFetch(api.backend.endpoint.getLocations);
  }

  createLocation({ name, rfc, email, phone, address }) {
    const body = {
      name,
      rfc,
      email,
      phone,
      address,
    };

    return ApiRequest.buildAndFetch(api.backend.endpoint.createLocation, body);
  }

  updateLocation({ id, name, rfc, email, phone, address }) {
    const body = {
      name,
      rfc,
      email,
      phone,
      address,
    };

    return ApiRequest.buildAndFetch(api.backend.endpoint.updateLocation, body);
  }
}

export default Locations;