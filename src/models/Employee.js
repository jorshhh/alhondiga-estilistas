
import strings from '../config/strings';

class Employee {
  constructor() {
    this.id = '';
    this.location = '';
    this.name = '';
    this.phone = '';
  }

  init(employee) {
    this.id = employee.id;
    this.location = employee.location;
    this.name = employee.name;
    this.phone = employee.phone;

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
      phone,
    } = strings().forms.employee;

    return {
      [name]: { value: this.name },
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
      phone,
    } = strings().forms.employee;

    this.name = editable[name].value;
    this.phone = editable[phone].value;
    this.location = editable[location].value;

    return this;
  }
}

export default Employee;