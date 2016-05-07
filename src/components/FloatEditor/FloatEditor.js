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
import Header from '../Header';
import emptyFunction from 'fbjs/lib/emptyFunction';
import Link from '../Link';

//import style from './FloatEditor.scss';
const title = 'New Post';
const apiUrl = 'http://localhost:8000/foo';
const homePage = 'http://localhost:3001';


class FloatEditor extends Component {
  //static childContextTypes = {
  //  insertCss: PropTypes.func.isRequired,
  //  setTitle: PropTypes.func.isRequired,
  //  setMeta: PropTypes.func.isRequired,
  //};
  //getChildContext() {
  //  const context = this.props.context;
  //  var css = [];
  //  return {
  //    insertCss: styles => css.push(styles._getCss()),
  //    setTitle: value => (data.title = value),
  //    setMeta: (key, value) => (data[key] = value)
  //  };
  //}
  //componentWillMount() {
  //  const { insertCss } = this.props.context;
  //  this.removeCss = insertCss(s);
  //}
  postSimpleText(){
    console.log("request sent");

    var headline = $('.headline').val(),
        author = $('.author').val(),
        body = $('.body').val();


    var request = $.ajax({
      url: apiUrl,
      type: "POST",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify({
        headline: headline,
        author: author,
        body: body
      }),

    });

    request.done(function(msg) {
      alert( "Request success: " + msg );

      //$("#log").html( msg );
    });

    request.fail(function(jqXHR, textStatus) {
      alert( "Request failed: " + textStatus );
    });

  }

  linkBackToHomePage() {
    console.log("Link Back to Homepage");
    window.location.href = homePage;
  }


  render() {
    return (
      <div>
        <p></p>
        <Link to="/">Back</Link>

        <h1 className="create-post">
          Create a New Post
        </h1>

        <p>
          Headline
        </p>
        <textarea className="headline"></textarea>

        <p>
          Author
        </p>
        <textarea className="author"></textarea>

        <p>
          Text Box
        </p>
        <textarea className="body"></textarea>
        <p></p>
        <button onClick={this.postSimpleText}>Submit</button>
      </div>
    );
  }
}


//FloatEditor.contextTypes = { setTitle: PropTypes.func.isRequired };

export default (FloatEditor)