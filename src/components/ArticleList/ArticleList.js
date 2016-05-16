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
import * as constants from '../../constants';

class ArticleList extends Component {

  constructor(props) {
    super();

    this.state = { articlePreviews: [] };
  }

  renderArticlePreview() {
  var articlePreviewList = this.state.articlePreviews;
  articlePreviewList.push(<ArticlePreview
    headline="This is a headline"
    author="this is the author"
    />);
  this.setState({articlePreviews: articlePreviewList});
  }

  fetchArticles () {
    var request = $.ajax({
      url: constants.ENDPOINT_ARTICLES + "?user=" + this.props.userId,
      type: "GET",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
    });

    request.done(function(msg) {
      alert( "Registration Successful! Try and Log in" );
      //$("#log").html( msg );
      populateArticles()
    });

    request.fail(function(jqXHR, textStatus) {
      alert( "Unable to Register shoot me an email if the issue persists");
      return false;
    });
  }

  populateArticles(articles){

    var articlePreviewList = this.state.articlePreviews;

    for (article in articles) {
      articlePreviewList.push(<ArticlePreview
        headline={article.headline}
        author={article.Author}
        />);
    }
    this.setState({articlePreviews: articlePreviewList});
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
      </div>
    );
  }
}

export default (ArticleList)