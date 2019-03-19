
import React, { Component } from 'react';
import Navigator from './Navigator';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      style: {
        direction: 'left', //top, bottom, right, left
      },
    }

    this.visibilityDidChange = this._visibilityDidChange.bind(this);
  }

  componentWillMount () {
    this.setState(this.props);
  }

  componentWillReceiveProps (props) {
    this.setState(props);
  }

  _visibilityDidChange(visible) {
    this.setState({ visible });
  }

  render() {
    const { visible } = this.state;
  
    return (
      <div>
        <Navigator
          {...this.props}
          visible={visible}
          visibilityDidChange={this.visibilityDidChange}
        />
      </div>
    );
  }

}

export default Sidebar;
