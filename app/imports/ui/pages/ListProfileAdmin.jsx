import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card, Divider } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Profiles } from '../../api/profile/Profiles';
import ProfileCardsAdmin from '../components/ProfileCardsAdmin';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListProfileAdmin extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center" inverted>All barGAINS Profiles</Header>
        <Divider/>
        <Card.Group itemsPerRow={4}>
          {this.props.profiles.map((profiles, index) => <ProfileCardsAdmin key={index} profile={profiles}/>)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ListProfileAdmin.propTypes = {
  profiles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Profiles.adminPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const profiles = Profiles.collection.find({}).fetch();
  return {
    profiles,
    ready,
  };
})(ListProfileAdmin);
