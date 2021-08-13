import React from 'react';
import { Feed, Rating } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Review extends React.Component {
  render() {
    return (
      <Feed.Event>
        <Feed.Content>
          <Feed.User>{this.review.userName}</Feed.User>
          <Rating defaultRating={this.review.rating()} maxRating={5} disabled />
          <Feed.Date content={this.review.createdAt.toLocaleDateString('en-US')} />
          <Feed.Summary content={this.review.purchased} />
          <Feed.Extra text content={this.review.comment} />
        </Feed.Content>
      </Feed.Event>
    );
  }
}

// Require a document to be passed to this component.
Review.propTypes = {
  review: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Review);
