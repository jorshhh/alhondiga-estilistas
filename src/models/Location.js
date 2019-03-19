
import strings from '../config/strings';

class Location {
  constructor() {
    this.id = '';
    this.name = '';
    this.rfc = '';
    this.email = '';
    this.phone = '';
    this.address = {};
  }

  init(location) {
    this.id = location.id;
    this.name = location.name;
    this.rfc = location.rfc;
    this.email = location.email;
    this.phone = location.phone;
    this.address = location.address;

    return this;
  }

  toEditable() {
    const {
      name,
      rfc,
      email,
      phone,
      street,
      number,
      city,
      state,
      zip,
    } = strings().forms.location;

    return {
      [name]: { value: this.name },
      [rfc]: { value: this.rfc },
      [email]: { value: this.email },
      [phone]: { value: this.phone },
      [street]: { value: this.address.street },
      [number]: { value: this.address.number },
      [city]: { value: this.address.city },
      [state]: { value: this.address.state },
      [zip]: { value: this.address.zip },
    };
  }

  loadEditable(editable) {
    const {
      name,
      rfc,
      email,
      phone,
      street,
      number,
      city,
      state,
      zip,
    } = strings().forms.location;

    this.name = editable[name].value;
    this.rfc = editable[rfc].value;
    this.email = editable[email].value;
    this.phone = editable[phone].value;
    this.address.street = editable[street].value;
    this.address.number = editable[number].value;
    this.address.city = editable[city].value;
    this.address.state = editable[state].value;
    this.address.zip = editable[zip].value;

    return this;
  }
}

export default Location;