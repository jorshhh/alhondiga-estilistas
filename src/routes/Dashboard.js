
import React, { Component } from 'react';
import {
  Segment,
  Header,
} from 'semantic-ui-react';

class Dashboard extends Component {

  render() {
    return (
      <div className='dashboard'>
        <Segment padded='very'>
          <Header as='h2'>
            Estilistas
          </Header>
          <Header as='h3' dividing color='grey'>
            Test
          </Header>
        </Segment>
      </div>
    );
  }
}

export default Dashboard;
