import React from 'react';
import { Feed, Icon, Rating } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Review extends React.Component {
  render() {
    return (
      <Feed.Event>
        <Icon name='user circle' size='huge' basic/>
        <Feed.Content>
          <Feed.Date>{this.props.review.createdAt.toLocaleDateString('en-US')}</Feed.Date>
          <Rating icon='star'defaultRating={this.props.review.rating} maxRating={5} disabled centered/>
          <Feed.Meta text content={this.props.review.commenter} />
          <Feed.Summary content={this.props.review.purchased} />
          <Feed.Meta text content={this.props.review.comment} />
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
