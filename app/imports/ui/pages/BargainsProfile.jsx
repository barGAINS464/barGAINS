import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Item, Container, Header, Loader, Card } from 'semantic-ui-react';
import { Profiles } from '../../api/profile/Profiles';
import { Items } from '../../api/item/Items';
import { Products } from '../../ui/components/Products';

class BargainsProfile extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
      <Container>
        <Header as="h2">User Profile</Header>
        <Item.Group>
          <Item>
            <Item.Image size='medium' src={this.props.profile.profilePic} />

            <Item.Content>
              <Item.Header textAlign={'left'}>{this.props.profile.firstName} {this.props.profile.lastName}</Item.Header>
              <Item.Meta>
                <span className='email'>{this.props.profile.email}</span>
              </Item.Meta>
              <Item.Description>User email: {this.props.profile.owner}</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
        <Header as="h2" textAlign="center">User Products</Header>
        <Card.Group>
          {this.props.items.map((item, index) => <Products key={index} item={item} Products={Products}/>)}
        </Card.Group>
      </Container>
    );
  }
}

BargainsProfile.propTypes = {
  profile: PropTypes.object,
  model: PropTypes.object,
  items: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  const documentId = match.params._id;
  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  const ready = subscription.ready();
  const profile = Profiles.collection.findOne(documentId);
  const subscription2 = Meteor.subscribe(Items.userPublicationName);
  const ready2 = subscription2.ready();
  const username = _.first(_.pluck(Profiles.collection.find(documentId).fetch(), 'owner'));
  const items = Items.collection.find({ owner: username }).fetch();
  return {
    profile,
    items,
    ready,
    ready2,
  };
})(BargainsProfile);
