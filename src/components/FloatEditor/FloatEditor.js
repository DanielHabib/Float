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
import $ from 'jquery';


const title = 'New Post';
const apiUrl = 'http://localhost:8000/foo';

class FloatEditor extends Component {

  postSimpleText(){
    console.log("request sent");
    var request = $.ajax({
      url: apiUrl,
      type: "POST",
      data: {
        headline: "headline foo",
        author: "author foo",
        body: "body foo"
      },
      dataType: "html"

    });

    request.done(function(msg) {
      alert( "Request success: " + msg );

      //$("#log").html( msg );
    });

    request.fail(function(jqXHR, textStatus) {
      alert( "Request failed: " + textStatus );
    });

  }

  render() {
    return (
      <div>
        <h1>
          >
          Create a New Post
        </h1>

        <p>
          Header Image
        </p>
        <textarea></textarea>

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
        <button onClick={this.postSimpleText}></button>
      </div>
    );
  }
}
//Editor.contextTypes = { setTitle: PropTypes.func.isRequired };

export default (FloatEditor)