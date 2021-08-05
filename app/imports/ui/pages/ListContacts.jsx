import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';
import Contact from '../components/Contact';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListContacts extends React.Component {
  contacts = [{
    firstName: 'Soo', lastName: 'Flay', username: 'sooflay@hawaii.edu',
    image: '/images/Logo.png',
    email: 'Email: sooflay@hawaii.edu',
    phone: 'Phone: (808)765-4321',
    contactMethod: 'Preferred Method of Contact: Email or Text',
  },
  {
    firstName: 'Naruto', lastName: 'Uzumaki', username: 'nuzumaki@hawaii.edu',
    image: 'https://philipmjohnson.github.io/images/philip2.jpeg',
    email: 'Email: nuzumaki@hawaii.edu',
    phone: 'Phone: (808)123-4567',
    contactMethod: 'Preferred Method of Contact: Email or Text',
  },
  ];

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center" inverted>List Contacts</Header>
        <Card.Group>
          {this.contacts.map((contact, index) => <Contact key={index} contact={contact} />)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ListContacts.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Stuffs.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const stuffs = Stuffs.collection.find({}).fetch();
  return {
    stuffs,
    ready,
  };
})(ListContacts);
