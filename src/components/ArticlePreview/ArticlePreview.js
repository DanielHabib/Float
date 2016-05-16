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

  render() {
    return (
      <div>
        <h1>{this.props.headline}</h1>
        <p>{this.props.author}</p>
      </div>
    );
  }
}

export default (ArticlePreview)