/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Login.scss';
import * as constants from '../../constants';
const title = 'Log In';
import $ from 'jquery';


function Login(props, context) {
  context.setTitle(title);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
        <div id="loginForm">
          <div className={s.formGroup}>
            <label className={s.label} htmlFor="email">
              Email address:
            </label>
            <input
              className={s.input}
              id="email"
              type="text"
              name="email"
              autoFocus
            />
          </div>
          <div className={s.formGroup}>
            <label className={s.label} htmlFor="password">
              Password:
            </label>
            <input
              className={s.input}
              id="password"
              type="password"
              name="password"
            />
          </div>
          <div className={s.formGroup}>
            <button className={s.button} onClick={submitForm}>
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function submitForm() {
    console.log("Submitted");
    $.ajax({
      type: 'POST',
      url: constants.ENDPOINT_LOGIN,
      data: { email: $("#email").val(),
        password: $("#password").val() }
    });
    return false;
}


Login.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Login);
