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
import s from './Register.scss';
import $ from 'jquery';

const title = 'New User Registration';
const userApiUrl = 'http://104.236.228.199/users';
function Register(props, context) {
  context.setTitle(title);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
        <p>Username</p>
        <textarea className="username"></textarea>
        <p>Password</p>
        <textarea className="password"></textarea>
        <p>Confirm Password</p>
        <textarea className="passwordConfirm"></textarea>
        <br/>
        <button onClick={foo}>Submit</button>
      </div>
    </div>
  );
}

function foo(){
  var username = $('.username').val(),
      password = $('.password').val(),
      passwordConfirm = $('.passwordConfirm').val();

  if (password !== passwordConfirm){
    alert( "Passwords must match!");
  }

  if (username.length < 3){
    alert("Username should be longer");
  }

  var request = $.ajax({
    url: userApiUrl,
    type: "POST",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify({
      username: username,
      password: password
    }),
  });

  request.done(function(msg) {
    alert( "Registration Successful! Try and Log in" );

    //$("#log").html( msg );
  });

  request.fail(function(jqXHR, textStatus) {
    alert( "Unable to Register shoot me an email if the issue persists");
  });
}

Register.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Register);
