
import React, { Component } from 'react';
import {
  Modal,
  Header,
  Button,
  Icon,
} from 'semantic-ui-react';

import strings from '../config/strings';

class SimpleModal extends Component {

  constructor (props) {
    super(props);
    this.state = {
      open: false,
      icon: 'warning sign',
      header: '',
      content: '',
      loading: false,
    }
  }

  componentWillMount () {
    this.setState(this.props);
  }

  componentWillReceiveProps (props) {
    this.setState(props);
  }

  async decide (action) {

    const { onAccept, onReject, onClose } = this.state;
    const onAction = action === 'accept' ? onAccept : onReject;
    
    this.setState({ loading: true });
    try {
      await onAction();
      this.setState({ loading: false });
      onClose();
    } catch (e) {
      this.showErrors(e);
      this.setState({ loading: false });
    }
  
  }

  showErrors (error)  {
    console.warn('got error', error);
  }

  render () {
    
    const { 
      open, 
      icon, 
      header,
      content,
      loading,
      onClose,
      onReject,
      rejectText,
      acceptText,
    } = this.state;

    return (
      <Modal 
        basic
        open={ open } 
        onClose={ onClose }
      >
        <Header>
          <Icon loading={ loading } name={ loading ? 'spinner' : icon } />
          { header }
        </Header>
        <Modal.Content>
          <p>{ content }</p>
        </Modal.Content>
        <Modal.Actions>
          { onReject &&
            <Button 
              basic 
              color='red' 
              inverted
              onClick={ () => this.decide('reject') }
            >
              <Icon name='remove' /> { rejectText || strings().forms.no }
            </Button>
          }
          <Button 
            color='green' 
            inverted
            onClick={ () => this.decide('accept') }
          >
            <Icon name='checkmark' /> { acceptText || strings().forms.yes }
          </Button>
        </Modal.Actions>
      </Modal>
    );
  
  }
}

export default SimpleModal;