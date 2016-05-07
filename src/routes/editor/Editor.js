/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
//import s from './Editor.scss';
import s from '../contact/Contact.scss';

const title = 'New Post';

class Editor extends Component {

  render() {
    return (
      <div>
        <p>NOT THIS EDITOR</p>
      </div>
    );
  }
}
//Editor.contextTypes = { setTitle: PropTypes.func.isRequired };

export default (Editor)