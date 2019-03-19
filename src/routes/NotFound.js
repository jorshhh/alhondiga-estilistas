
import React, { Component } from 'react';

class NotFound extends Component {

  render() {
    return (
      <div style={ style }>
        <p>404</p>
      </div>  
    );
  }

}

const style = { 
  minHeight: '100%', 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center',
};

export default NotFound;