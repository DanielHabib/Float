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
import * as constants from '../../constants';
import Dropzone  from 'react-dropzone';


//import style from './FloatEditor.scss';
const title = 'New Post';
const homePage = '/';


class FloatEditor extends Component {
  headerImage = '';
  onDrop (files) {
  console.log('Received files: ', files);
    this.headerImage = files;
}

  postSimpleText(){

    var headline = $('.headline').val(),
        author = $('.author').val(),
        body = $('.body').val();

    var request = $.ajax({
      url: constants.ENDPOINT_ARTICLES,
      type: "POST",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify({
        headline: headline,
        headlineImage : this.headerImage,
        author: author,
        body: body
      }),
    });

    request.done(function(msg) {
      var articles = msg.articles,
          articleDiv = $('.articles')
          ;

      for (var article in articles){
        articleDiv.appendChild('<a href=article.url/>');2q
      }

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
    var styles = {
      Headline: {
        'background-color' : 'blue'
      },
      Author: {
        'background-color': 'red'
      },
      Body: {
        'background-color': 'green'
      },
      label: {
        'backgroundColor': 'clear',
        'paddingLeft': '16px',
      },
      submit: {

        left: '300px',
        'backgroundColor':'#44c767',
        'MozBorderRadius':'28px',
        'WebkitBorderRadius':'28px',
        'borderRadius':'28px',
        'border':'1px solid #18ab29',
        'display':'inline-block',
        'cursor':'pointer',
        'color':'#ffffff',
        'fontFamily':'Arial',
        'fontSize':'17px',
        'padding':'16px 31px',
        'textDecoration':'none',
        'textShadow':'0px 1px 0px #2f6627',
    },

      textarea: {
        'display': 'inline-block',
        'WebkitBoxSizing': 'content-box',
        'MozBoxSizing': 'content-box',
        'boxSizing': 'content-box',
        'padding': '6px 20px',
        'border': 'none',
        'WebkitBorderRadius': '32px / 54px',
        'borderRadius':'32px / 54px',
        font: 'normal 18px/normal "Coda", Helvetica, sans-serif',
        color: 'rgba(0,142,198,1)',
        'textOverflow': 'ellipsis',
        background: 'rgba(252,252,252,1)',
        'WebkitBoxShadow': '0 1px 2px 0 rgba(0,0,0,0.2) inset',
        'boxShadow': '0 1px 2px 0 rgba(0,0,0,0.2) inset',
        'textShadow': '1px 1px 0 rgba(255,255,255,0.66)',
        'WebkitTransition': 'all 200ms cubic-bezier(0.42, 0, 0.58, 1)',
        'MozTransition': 'all 200ms cubic-bezier(0.42, 0, 0.58, 1)',
        'Otransition': 'all 200ms cubic-bezier(0.42, 0, 0.58, 1)',
        'transition': 'all 200ms cubic-bezier(0.42, 0, 0.58, 1)',
    },

      largeTextarea: {
        width: '90%',
        height: '300px',
        'display': 'inline-block',
        'WebkitBoxSizing': 'content-box',
        'MozBoxSizing': 'content-box',
        'boxSizing': 'content-box',
        'padding': '6px 20px',
        'border': 'none',
        'WebkitBorderRadius': '32px / 54px',
        'borderRadius':'32px / 54px',
        font: 'normal 18px/normal "Coda", Helvetica, sans-serif',
        color: 'rgba(0,142,198,1)',
        'textOverflow': 'ellipsis',
        background: 'rgba(252,252,252,1)',
        'WebkitBoxShadow': '0 1px 2px 0 rgba(0,0,0,0.2) inset',
        'boxShadow': '0 1px 2px 0 rgba(0,0,0,0.2) inset',
        'textShadow': '1px 1px 0 rgba(255,255,255,0.66)',
        'WebkitTransition': 'all 200ms cubic-bezier(0.42, 0, 0.58, 1)',
        'MozTransition': 'all 200ms cubic-bezier(0.42, 0, 0.58, 1)',
        'Otransition': 'all 200ms cubic-bezier(0.42, 0, 0.58, 1)',
        'transition': 'all 200ms cubic-bezier(0.42, 0, 0.58, 1)',
    }

  };
    return (
      <div>

        <h1  className="create-post">
          Create a New Post
        </h1>

        <p style={styles.label}>
          Custom Header Image
        </p>
        <Dropzone onDrop={this.onDrop}>
          <div> </div>
        </Dropzone>

        <p style={styles.label}>
          Headline
        </p>
        <textarea
          style={styles.textarea}
          className="headline"
          placeholder="Headline">
        </textarea>

        <p style={styles.label}>
          Author
        </p>
        <textarea
          style={styles.textarea}
          className="author"
          placeholder="Author">
        </textarea>

        <p style={styles.label} >
          Text Box
        </p>

        <textarea style={styles.largeTextarea} className="body" placeholder="Write Away"></textarea>
        <p></p>
        <button style={styles.submit} onClick={this.postSimpleText}>Submit</button>
        <div class="articles">
        </div>
      </div>
    );
  }
}

//FloatEditor.contextTypes = { setTitle: PropTypes.func.isRequired };

export default (FloatEditor)