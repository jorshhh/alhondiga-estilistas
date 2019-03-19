
import React, { Component } from 'react';
import {
  Modal,
  Form,
  Button,
} from 'semantic-ui-react';

import strings from '../config/strings';

class ModalForm extends Component {

  constructor (props) {
    super(props);
    this.state = {
      open: false,
      size: 'tiny',
      header: '',
      loading: false,
      data: {},
    }
  }

  componentWillMount () {
    this.setState(this.props);
  }

  componentWillReceiveProps (props) {
    this.setState(props);
  }

  async save () {

    const { data, onSave, onClose } = this.state;
    
    this.setState({ loading: true });
    try {
      await onSave(data);
      this.setState({ loading: false });
      onClose();
    } catch (e) {
      this.showErrors(e);
      this.setState({ loading: false });
    }
  
  }

  showErrors (error)  {
    console.warn('onSave error', error);
  }

  formItem(key, field, index, label = key) {
    if (!field) return null;
    const { value, options, type } = field;
    
    const onChange = (e, { value: newValue }) => {
      this.state.data[key].value = newValue;
      this.setState({ data: this.state.data });
    };

    const onAdd = (e, { value: newValue }) => {
      const addedOptions = this.state.data[key].addedOptions || [];
      addedOptions.push({ text: newValue, value: newValue });
      this.state.data[key].addedOptions = addedOptions;
      this.setState({ data: this.state.data });
    };

    const isSelect = options && options.length;
    const isMultiple = type === Array;
    const isBool = type === Boolean;

    if (isSelect) {
      return (
        <Form.Select
          label={label}
          options={options}
          value={value || (isMultiple ? [] : '')}
          onChange={onChange}
          key={index}
          multiple={isMultiple}
          selection
          search={options.length > 5}
        />
      );
    }
    if (isMultiple) {
      return (
        <Form.Select
          label={label}
          options={field.addedOptions || []}
          value={value || []}
          onChange={onChange}
          key={index}
          multiple
          selection
          search
          allowAdditions
          onAddItem={onAdd}
        />
      );
    }
    if (isBool) {
      return (
        <Form.Checkbox
          label={label}
          checked={value || false}
          onChange={(e, { checked }) => onChange(e, { value: checked })}
          key={index}
          toggle
        />
      );
    }
    
    return (
      <Form.Input
        fluid
        label={label}
        placeholder={key}
        value={value || ''}
        onChange={onChange}
        key={index}
      />
    );
  }

  render () {
    const { 
      open, 
      size, 
      header,
      loading,
      data,
      onClose,
    } = this.state;

    return (
      <Modal 
        size={ size } 
        open={ open } 
        onClose={ onClose }
        centered={ false }
      >
        <Modal.Header>{ header }</Modal.Header>
        <Modal.Content>
          <Form loading={ loading }>
            { Object.keys(data).map( (key, index) => this.formItem(key, data[key], index) ) }
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button 
            negative
            onClick={ onClose }
            content={strings().forms.cancel}
          />
          <Button 
            positive 
            icon='save' 
            labelPosition='right' 
            content={strings().forms.save}
            onClick={ this.save.bind(this) }
          />
        </Modal.Actions>
      </Modal>
    );
  
  }
}

export default ModalForm;