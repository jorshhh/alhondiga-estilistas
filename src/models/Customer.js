
import strings from '../config/strings';

class Customer {
  constructor() {
    this.id = '';
    this.location = '';
    this.name = '';
    this.email = '';
    this.phone = '';
  }

  init(customer) {
    this.id = customer.id;
    this.location = customer.location_id;
    this.name = customer.name;
    this.email = customer.email;
    this.phone = customer.phone;

    return this;
  }

  assignLocation(locations) {
    this._location = locations.find(location => location.id === this.location);
    return this;
  }

  toEditable(locations) {
    const {
      location,
      name,
      email,
      phone,
    } = strings().forms.customer;

    return {
      [name]: { value: this.name },
      [email]: { value: this.email },
      [phone]: { value: this.phone },
      [location]: { 
        value: this.location,
        options: locations.map(location => ({ text: location.name, value: location.id })),
      },
    };
  }

  loadEditable(editable) {
    const {
      location,
      name,
      email,
      phone,
    } = strings().forms.customer;

    this.name = editable[name].value;
    this.email = editable[email].value;
    this.phone = editable[phone].value;
    this.location = editable[location].value;

    return this;
  }
}

export default Customer;