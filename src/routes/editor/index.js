/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import App from '../../components/App';
import ErrorPage from '../error/ErrorPage';

import Editor from './Editor.js';
export default {

  path: '/editor',

  action({ render, context, error }) {
    return render(
      <div>
        <h1>Booya</h1>
        <Editor />
      </div>
    );
  },

}
