/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import history from '../../core/history';

class Bottom extends Component { // eslint-disable-line react/prefer-stateless-function

  render() {

    var divStyle = {
      bottom: 0,
      position: 'fixed',
      width: '100%',
    };

    return <div style={divStyle}>
      {this.props.children}
      </div>;
  }

}

export default Bottom;
