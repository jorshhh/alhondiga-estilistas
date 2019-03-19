
import React, { Component } from 'react';
import {
  Grid,
  Form,
  Message,
  Button,
  Image,
  Segment,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import Backend from '../controllers/Backend';
import '../styles/Login.scss';
import logo from '../assets/img/logo-black.png';

import strings from '../config/strings';

const CLEAR_ERROR = '';
class RequestPassword extends Component {

  constructor (props) {
    super(props);
    this.state = {
      loading: false,
      email: '',
      error: CLEAR_ERROR,
    };
  }

  validateFields (email) {
    return email;
  }

  async submit () {
    const { email } = this.state;

    if (!this.validateFields(email)) {
      return;
    }

    try {
      this.setState({ error: CLEAR_ERROR, loading: true });
      await Backend.requestPassword(email);
      this.props.history.push('/');
    } catch (e) {
      this.setState({ error: `${strings().error.restorePassword} ${e.status}` });
    }

    this.setState({ loading: false });

  }

  render() {
    return (
      <div className='login-form'>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Image className='logo' src={ logo } />
            <Form 
              size='large'
              loading={ this.state.loading }
              error={ this.state.error.length > 0 }
            >
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder={strings().login.user}
                  value={ this.state.email }
                  onChange={ (e, { value }) => this.setState({ email: value }) }
                />

                <Message
                  error
                  header='Error'
                  content={ this.state.error }
                  onDismiss={ () => this.setState({ error: CLEAR_ERROR }) }
                />
    
                <Button color='teal' fluid size='large' onClick={ this.submit.bind(this) }>
                  { strings().login.recoverPassword }
                </Button>
              </Segment>
            </Form>
            <Message>
              { strings().login.rememberedPasswordQuestion }
              { ' ' }
              <Link to='/'>
                { strings().login.rememberedPasswordLink }
              </Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
  
    );
  }
}

export default RequestPassword;
