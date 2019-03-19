
import React, { Component } from 'react';
import {
  Segment,
  Table,
  Button,
  Icon,
} from 'semantic-ui-react';

import Backend from '../../controllers/Backend';
import ModalForm from '../../components/ModalForm';
import SimpleModal from '../../components/SimpleModal';
import Employee from '../../models/Employee';
import Location from '../../models/Location';
import strings from '../../config/strings';

class Employees extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      locations: [],
      employees: [],
      formOpen: false,
      selected: new Employee(),
      deleteOpen: false,
    };

    this.renderRow = this._renderRow.bind(this);
    this.createItem = this._createItem.bind(this);
    this.saveChanges = this._saveChanges.bind(this);
    this.deleteItem = this._deleteItem.bind(this);
  }

  componentDidMount() {
    this.reload();
  }

  async reload() {
    const rawLocations = await Backend.getLocations();
    const locations = rawLocations.map(item => new Location().init(item));
    const rawEmployees = await Backend.getEmployees();
    const employees = rawEmployees
      .map(item => new Employee().init(item).assignLocation(locations));

    this.setState({
      loading: false,
      locations,
      employees,
    });
  }

  _renderRow(item, index) {
    const { _location, name, phone } = item;
    return (
      <Table.Row key={index}>
        <Table.Cell>{ _location.name }</Table.Cell>
        <Table.Cell>{ name } </Table.Cell>
        <Table.Cell>{ phone }</Table.Cell>
        <Table.Cell>
          <Button icon="pencil" color="blue" size="tiny" onClick={() => this.selectAndEdit(index)} />
          <Button icon="delete" color="red" size="tiny" onClick={() => this.selectAndDelete(index)} />
        </Table.Cell>
      </Table.Row>
    );
  }

  selectAndEdit(index) {
    const { employees } = this.state;
    const selected = employees[index];

    this.setState({ formOpen: true, action: 'edit', selected });
  }

  selectAndDelete(index) {
    const { employees } = this.state;
    const selected = employees[index];

    this.setState({ deleteOpen: true, selected });
  }

  _createItem() {
    const selected = new Employee();
    this.setState({ formOpen: true, action: 'create', selected });
  }

  _saveChanges(editable) {
    const { selected } = this.state;
    const item = selected.loadEditable(editable);
    console.log('saving', item);
  }

  _deleteItem() {
    const { selected } = this.state;
    console.log('delete', selected);
  }

  render() {
    const { loading, locations, employees, formOpen, action, selected, deleteOpen } = this.state;
    const { location, name, phone, empty, add, edit, erase, eraseDescription } = strings().employee.table;
    
    return (
      <Segment
        style={{ height: '100vh' }}
        loading={loading}
      >
        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>{ location }</Table.HeaderCell>
              <Table.HeaderCell>{ name }</Table.HeaderCell>
              <Table.HeaderCell>{ phone }</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            { employees.length > 0 && employees.map(this.renderRow) }
            { employees.length === 0 && 
              <Table.Row>
                <Table.Cell colSpan="4" textAlign="center">{ empty }</Table.Cell>
              </Table.Row>
            }
          </Table.Body>

          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan="4">
                <Button
                  floated="right"
                  icon
                  labelPosition="left"
                  color="teal"
                  size="small"
                  onClick={this.createItem}
                >
                  <Icon name="building outline" /> { add }
                </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        <ModalForm
          open={formOpen}
          header={action === 'create' ? add : edit}
          data={selected.toEditable(locations)}
          onSave={this.saveChanges}
          onClose={() => this.setState({ formOpen: false })}
        />
        <SimpleModal
          open={deleteOpen}
          header={strings().forms.warning}
          content={eraseDescription(selected.name)}
          onAccept={this.deleteItem}
          onReject={() => false}
          onClose={() => this.setState({ deleteOpen: false })}
        />
      </Segment>
    );
  }

}

export default Employees