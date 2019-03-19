
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
import Product from '../../models/Product';
import strings from '../../config/strings';

class Products extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      products: [],
      formOpen: false,
      selected: new Product(),
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
    const response = await Backend.getProducts();
    const products = response.map(item => new Product().init(item));

    this.setState({
      loading: false,
      products,
    });
  }

  _renderRow(item, index) {
    const { name, sku, price = 0, commission = 0, isService } = item;
    return (
      <Table.Row key={index}>
        <Table.Cell>{ sku }</Table.Cell>
        <Table.Cell>{ name } </Table.Cell>        
        <Table.Cell>${ price.toFixed(2) }</Table.Cell>
        <Table.Cell>${ commission.toFixed(2) }</Table.Cell>
        <Table.Cell>{ isService ? 'Si' : 'No' }</Table.Cell>
        <Table.Cell>
          <Button icon="pencil" color="blue" size="tiny" onClick={() => this.selectAndEdit(index)} />
          <Button icon="delete" color="red" size="tiny" onClick={() => this.selectAndDelete(index)} />
        </Table.Cell>
      </Table.Row>
    );
  }

  selectAndEdit(index) {
    const { products } = this.state;
    const selected = products[index];

    this.setState({ formOpen: true, action: 'edit', selected });
  }

  selectAndDelete(index) {
    const { products } = this.state;
    const selected = products[index];

    this.setState({ deleteOpen: true, selected });
  }

  _createItem() {
    const selected = new Product();
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
    const { loading, products, formOpen, action, selected, deleteOpen } = this.state;
    const { sku, name, price, commission, isService, empty, add, edit, erase, eraseDescription } = strings().product.table;
    
    return (
      <Segment
        style={{ height: '100vh' }}
        loading={loading}
      >
        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>{ sku }</Table.HeaderCell>
              <Table.HeaderCell>{ name }</Table.HeaderCell>
              <Table.HeaderCell>{ price }</Table.HeaderCell>
              <Table.HeaderCell>{ commission }</Table.HeaderCell>
              <Table.HeaderCell>{ isService }</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            { products.length > 0 && products.map(this.renderRow) }
            { products.length === 0 && 
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

export default Products