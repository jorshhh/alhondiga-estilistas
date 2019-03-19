
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
import Location from '../../models/Location';
import strings from '../../config/strings';

class Locations extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      locations: [],
      formOpen: false,
      selected: new Location(),
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
    // TODO: try catch
    const { response } = await Backend.getLocations();
    const locations = response.map(item => new Location().init(item));

    this.setState({
      loading: false,
      locations,
    });
  }

  _renderRow(item, index) {
    const { name, rfc, email, phone, address } = item;
    const { street, number, city, state, zip } = address;
    const addressString = `${street} ${number}, ${city}, ${state}, ${zip}`;
    return (
      <Table.Row key={index}>
        <Table.Cell>{ name } </Table.Cell>
        <Table.Cell>{ rfc }</Table.Cell>
        <Table.Cell>{ email }</Table.Cell>
        <Table.Cell>{ phone }</Table.Cell>
        <Table.Cell>{ addressString }</Table.Cell>
        <Table.Cell>
          <Button icon="pencil" color="blue" size="tiny" onClick={() => this.selectAndEdit(index)} />
          <Button icon="delete" color="red" size="tiny" onClick={() => this.selectAndDelete(index)} />
        </Table.Cell>
      </Table.Row>
    );
  }

  selectAndEdit(index) {
    const { locations } = this.state;
    const selected = locations[index];

    this.setState({ formOpen: true, action: 'edit', selected });
  }

  selectAndDelete(index) {
    const { locations } = this.state;
    const selected = locations[index];

    this.setState({ deleteOpen: true, selected });
  }

  _createItem() {
    const selected = new Location();
    this.setState({ formOpen: true, action: 'create', selected });
  }

  async _saveChanges(editable) {
    const { selected } = this.state;
    const item = selected.loadEditable(editable);

    if (item.id) {
      console.log('editing', item);
    } else {
      await Backend.createLocation(item);
      this.reload();
    }
  }

  _deleteItem() {
    const { selected } = this.state;
    console.log('delete', selected);
  }

  render() {
    const { loading, locations, formOpen, action, selected, deleteOpen } = this.state;
    const { name, rfc, email, phone, address, empty, add, edit, erase, eraseDescription } = strings().location.table;
    
    return (
      <Segment
        style={{ height: '100vh' }}
        loading={loading}
      >
        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>{ name }</Table.HeaderCell>
              <Table.HeaderCell>{ rfc }</Table.HeaderCell>
              <Table.HeaderCell>{ email }</Table.HeaderCell>
              <Table.HeaderCell>{ phone }</Table.HeaderCell>
              <Table.HeaderCell>{ address }</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            { locations.length > 0 && locations.map(this.renderRow) }
            { locations.length === 0 && 
              <Table.Row>
                <Table.Cell colSpan="6" textAlign="center">{ empty }</Table.Cell>
              </Table.Row>
            }
          </Table.Body>

          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan="6">
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
          data={selected.toEditable()}
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

export default Locations