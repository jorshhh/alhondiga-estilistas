
import React, { Component } from 'react';
import {
  Sidebar as SemanticSidebar,
  Menu,
  Icon,
  Image,
  Responsive,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import routes from '../../config/routes';
import logo from '../../assets/img/logo-white.png';

class Sidebar extends Component {

  constructor (props) {
    super(props);
    this.state = {
      visible: true,
      routes: routes.filter( (item) => item.sidebar ),
      style: {
        animation: 'push', //push, overlay
        direction: 'left', //top, bottom, right, left
      },
    }

    this.changeVisibility = this._changeVisibility.bind(this);
  }

  componentWillMount () {
    this.setState(this.props);
    this._handleActionButton (this.props.visible);
  }

  componentWillReceiveProps (props) {
    this.setState(props);
    this._handleActionButton (props.visible);
  }

  componentDidUpdate () {
    this._handleActionButton(this.state.visible);
  }

  _handleActionButton (/* visible */) {

  }

  _changeVisibility(visible) {
    if (this.props.visibilityDidChange) {
      this.props.visibilityDidChange(visible);
    }
    this.setState({ visible });
  }

  render() {
    const { visible, style: { animation, direction } } = this.state;
    const isVertical = (direction === 'left' || direction === 'right');
    const renderMenuItem = (path, icon, label, index) => (
      <Menu.Item as={ Link } to={ path } key={ index }>
        { !icon.includes('data:image') && 
          <Icon name={ icon } />
        }
        { icon.includes('data:image') &&
          <Image
            src={ icon }
            style={{ margin: '0 auto .5rem' }}
          />
        }
        <Responsive minWidth={ 798 }>{ label }</Responsive>
      </Menu.Item>
    );

    const availableRoutes = routes.filter( (item) => item.sidebar );

    return(
      <SemanticSidebar 
        as={ Menu }
        inverted
        size='large'
        visible={ visible } 
        animation={ animation }
        direction={ direction } 
        vertical={ isVertical }
      >

        <Menu.Item>
          <Image src={ logo } />
        </Menu.Item>
        { availableRoutes.map( ({path, icon, label}, index) => renderMenuItem(path, icon, label, index) ) }

        {/* <Menu.Item onClick={() => this.changeVisibility(false)} >
          <Icon name={['arrow', 'down'].join(' ') } />
        </Menu.Item> */}

      </SemanticSidebar>
    );

  }
}

export default Sidebar;
