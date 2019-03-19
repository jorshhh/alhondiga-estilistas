
import strings from '../config/strings';

class Product {
  constructor() {
    this.id = '';
    this.location = '';
    this.sku = '';
    this.name = '';
    this.price = '';
    this.commission = '';
    this.isService = false;
  }

  init(product) {
    this.id = product.id;
    this.location = product.location_id;
    this.sku = product.sku;
    this.name = product.name;
    this.price = parseFloat(product.price);
    this.commission = parseFloat(product.commission);
    this.isService = product.is_service;

    return this;
  }

  toEditable() {
    const {
      location,
      sku,
      name,
      price,
      commission,
      isService,
    } = strings().forms.product;

    return {
      [location]: { value: this.location },
      [sku]: { value: this.sku },
      [name]: { value: this.name },
      [price]: { value: this.price },
      [commission]: { value: this.commission },
      [isService]: { value: this.isService, type: Boolean },
    };
  }

  loadEditable(editable) {
    const {
      location,
      sku,
      name,
      price,
      commission,
      isService,
    } = strings().forms.product;

    this.location = editable[location];
    this.sku = editable[sku];
    this.name = editable[name];
    this.price = editable[price];
    this.commission = editable[commission];
    this.isService = editable[isService];

    return this;
  }
}

export default Product;