/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes} from 'react';
import ArticlePreview from '../ArticlePreview';

class ArticleList extends Component {

  constructor(props) {
    super();
    this.state = { articlePreviews: [] };
  }

  renderArticlePreview() {
  var cbs = this.state.articlePreviews;
  cbs.push(<ArticlePreview

    headline="This is a headline"
    author="this is the author"
    />);
  this.setState({articlePreviews: cbs});
  }

  render() {
    return (
      <div>
        {this.state.articlePreviews}
        <ArticlePreview
            headline="This is a headline"
            author="this is the author"/>
        <ArticlePreview
          headline="This is a headline 2"
          author="this is the author 2"/>
        <button onClick={this.renderArticlePreview.bind(this)}>click here</button>
      </div>
    );
  }
}

export default (ArticleList)