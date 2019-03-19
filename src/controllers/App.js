
import React, { Component } from 'react';
import {
  Segment,
  Sidebar as SemanticSidebar,
} from 'semantic-ui-react';
import { 
  BrowserRouter as Router, 
  Route, 
  Switch,
} from 'react-router-dom'

import Backend from '../controllers/Backend';
import routes from '../config/routes';
import Sidebar from '../components/Sidebar';
import Login from '../routes/Login';
import NotFound from '../routes/NotFound';

import '../styles/App.scss';

class App extends Component {

  constructor (props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      sidebarVisible: true,
      routes,
    }

    Backend.registerListener(this);
  }

  componentWillMount() {
    this.setState({ isLoggedIn: Backend.isLoggedIn() });
  }

  listenToAuthorization (isLoggedIn) {
    this.setState({ isLoggedIn });
  }

  render() {
    const { isLoggedIn, sidebarVisible } = this.state;
    const showSidebar = isLoggedIn && sidebarVisible;
    const isAuthorized = component => isLoggedIn ? component : Login;
    const renderRoute = ({ path, component, isPublic }, index) => (
      <Route 
        exact 
        path={ path } 
        component={ isPublic ? component : isAuthorized(component) } 
        key={ index }
      />
    );

    return(
      <Router>
        <SemanticSidebar.Pushable as={ Segment }>
          <Sidebar visible={ !!showSidebar } />
          <SemanticSidebar.Pusher>
            <main>  
              <Switch>
                { routes.map( renderRoute ) }
                <Route component={ NotFound } />
              </Switch>
            </main>
          </SemanticSidebar.Pusher>
        </SemanticSidebar.Pushable>
      </Router>
    );

  }
}

export default App;
