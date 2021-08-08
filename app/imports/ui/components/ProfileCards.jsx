import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Profiles } from '../../api/profile/Profiles';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ProfileCards extends React.Component {

  render() {
    return (
      <Card centered>
        <Card.Content>
          <Image className='cardImage' src={this.props.pc.profilePicture} wrapped ui={true} rounded/>
          <Card.Header className='cardSpace'> {this.props.pc.firstName} {this.props.pc.lastName}</Card.Header>
          <Card.Description>
              Phone Number {this.props.pc.phone}
              Email {this.props.pc.email}
          </Card.Description>
          <Card.Meta>
            Username: {this.props.pc.user}
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Button icon onClick={() => this.removeItem(this.props.pc._id)} size='small'>
              <Icon name = "trash" />
            </Button>
          </a>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
ProfileCards.propTypes = {
  pc: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  const documentId = match.params._id;
  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  const ready = subscription.ready();
  const pc = Profiles.collection.findOne(documentId);
  return {
    pc,
    ready,
  };
})(ProfileCards);
