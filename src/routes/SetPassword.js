
import React, { Component } from 'react';
import {
  Grid,
  Form,
  Message,
  Button,
  Image,
  Segment,
} from 'semantic-ui-react';

import Backend from '../controllers/Backend';
import '../styles/Login.scss';
import logo from '../assets/img/logo-black.png';

import strings from '../config/strings';

const CLEAR_ERROR = '';
class SetPassword extends Component {

  constructor (props) {
    super(props);
    this.state = {
      loading: false,
      token: '',
      password: '',
      verification: '',
      error: CLEAR_ERROR,
    };
  }

  componentWillMount () {
    this.setState({ token: this.props.match.params.token });
  }

  validateFields (password, verification) {
    if (password.length < 8) {
      this.setState({ error: strings().error.passwordLength });
      return false;
    }
    if (password !== verification) {
      this.setState({ error: strings().error.passwordMatch });
      return false;
    }

    return true;
  }

  async submit () {
    const { token, password, verification } = this.state;

    if (!this.validateFields(password, verification)) {
      return;
    }

    try {
      this.setState({ error: CLEAR_ERROR, loading: true });
      await Backend.setPassword(token, password);
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
                  icon='lock'
                  iconPosition='left'
                  placeholder={strings().login.password} 
                  type='password'
                  value={ this.state.password }
                  onChange={ (e, { value }) => this.setState({ password: value }) }
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder={strings().login.confirmPassword}
                  type='password'
                  value={ this.state.verification }
                  onChange={ (e, { value }) => this.setState({ verification: value }) }
                />
  
                <Message
                  error
                  header='Error'
                  content={ this.state.error }
                  onDismiss={ () => this.setState({ error: CLEAR_ERROR }) }
                />
                
                <Button 
                  color='teal' 
                  fluid 
                  size='large' 
                  onClick={ this.submit.bind(this) }
                >
                  { strings().login.passwordChange }
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
  
    );
  }
}

export default SetPassword;
