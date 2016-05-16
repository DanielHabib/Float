/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes} from 'react';

class ArticlePreview extends Component {

  submit(){
    alert("Submit");
  }

  render() {

    var style = {
      container: {
        background: "lightgrey"
      },
      headline: {
        mariginLeft: 10
      },
      author: {
        marginLeft: 40
      }
    };
    return (
      <div style={style.container} onClick={this.submit}>
        <h1 style={style.headline}>{this.props.headline}</h1>
        <p style={style.author}>{this.props.author}</p>
      </div>
    );
  }
}

export default (ArticlePreview)