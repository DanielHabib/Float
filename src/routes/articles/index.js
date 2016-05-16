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
import MyHeader from '../../components/MyHeader/MyHeader';
import ArticleList from '../../components/ArticleList';
export default {

  path: '/articles',

  action({ render, context, error }) {
    return render(
      <div>
        <MyHeader />
        <h1>
          Lists of Articles:
        </h1>
        <ArticleList />
      </div>
    );
  },
}
