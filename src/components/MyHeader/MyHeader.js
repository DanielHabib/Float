/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes} from 'react';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import $ from 'jquery';
import cx from 'classnames';
import Header from '../Header';
import emptyFunction from 'fbjs/lib/emptyFunction';
import Link from '../Link';
import s from './MyHeader.scss';

//import style from './FloatEditor.scss';
const title = 'New Post';
const apiUrl = 'http://104.236.228.199/articles';
const homePage = '/';


class MyHeader extends Component {

  render() {
    return (
      <div className={s.container}>
        <div className={s.root} role="navigation">
          <Link className={s.link} to="/">Home</Link>
          <Link className={s.link} to="/contact">Contact</Link>
          <span className={s.spacer}> | </span>
          <Link className={s.link} to="/login">Log in</Link>
          <span className={s.spacer}>or</span>
          <Link className={s.link} to="/register">Sign up</Link>
          <span className={s.spacer}>|</span>
          <Link className={s.link} to="/articles">My Articles</Link>
          <Link className={cx(s.link, s.highlight)} to="/editor">Create +</Link>
        </div>
        </div>
    );
  }
}

//FloatEditor.contextTypes = { setTitle: PropTypes.func.isRequired };

export default (MyHeader)