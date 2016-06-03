/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes} from 'react';


import $ from 'jquery';
import cx from 'classnames';
import Header from '../Header';
import emptyFunction from 'fbjs/lib/emptyFunction';
import Link from '../Link';
import * as globals from '../../globals.js';
import * as constants from '../../constants.js';

//import s from './MyHeader.scss';

//import style from './FloatEditor.scss';
const title = 'New Post';
const homePage = '/';

class MyHeader extends Component {
// Get the state to check whether or not you are logged in. If so, show my articles and create,
//  If not show sign up & logged in at the top
  constructor (props) {
    super(props);

  };
  render() {

    var style = {

    brand: {
      color: "#5FAA9D",
      "textDecoration": "none",
      fontSize: "1.75em",
      marginLeft: 20,
      fontFamily: "Segoe UI, HelveticaNeue-Light, sans-serif",
    },
    navigation: {
      marginRight: 70,
      float: "right",
      right: 0

    },

  link:{
    display: "inline-block",
    color: "#5FAA9D",
    padding: "3px 8px",
    textDecoration: "none",
    fontFamily: "Segoe UI, HelveticaNeue-Light, sans-serif",
    fontSize: "1.125em" /* ~18px */,
    fontWeight: "100",
    fontSize: "1em"
    },
    spacer:{
      color: "rgba(255, 255, 255, 0.3)",
      },

    root:{
      width: "105%",
      background: "#373277",
      color: "#fff",
      padding: "20px 0",
      marginTop: -10,
      marginLeft: -10,

      }
};

    var headerOptions = '';
    if (globals.LoggedIn) {
      headerOptions =(
        <span>
          <Link style={style.link} to="/articles">My Articles</Link>
          <Link style={style.link} to="/editor">Create +</Link>
        </span>
        );
    } else{
      headerOptions = (
        <span>
          <Link style={style.link} to="/login">Log in</Link>
          <span style={style.spacer}>or</span>
          <Link style={style.link} to="/register">Sign up</Link>
        </span>
          );
    }

    return (
      <div style={style.root}>
            <Link style={style.brand} to="/">
              <span style={style.brandTxt}>Float</span>
            </Link>
            <span style={style.navigation}>
              <Link style={style.link} to="/">Home</Link>
              <Link style={style.link} to="/contact">Contact</Link>
              <span style={style.spacer}> | </span>
              {headerOptions}
            </span>
        </div>
    );
  }
}

//FloatEditor.contextTypes = { setTitle: PropTypes.func.isRequired };

export default (MyHeader)