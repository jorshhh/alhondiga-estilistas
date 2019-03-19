
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

class Login extends Component {

  constructor () {
    super();
    this.state = {
      loading: false,
      email: '',
      password: '',
    };
  }

  async submit () {
    const { email, password } = this.state;
    try {
      this.setState({ loading: true });
      await Backend.login(email, password);
    } catch (e) {
      // error handled at backend controller
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
            >
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder={strings().login.user}
                  value={ this.state.email }
                  onChange={ (e, { value }) => this.setState({ email: value })}
                  autoComplete='email'
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder={strings().login.password}
                  type='password'
                  value={ this.state.password }
                  onChange={ (e, { value }) => this.setState({ password: value }) }
                  autoComplete='current-password'
                />
    
                <Button color='teal' fluid size='large' onClick={ this.submit.bind(this) }>
                  { strings().login.submit }
                </Button>
              </Segment>
            </Form>
            <Message>
              { strings().login.forgotPasswordQuestion }
              { ' ' }
              <Link to='requestPassword'>
                { strings().login.forgotPasswordLink }
              </Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
  
    );
  }
}

export default Login;
