import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Divider, Header, Loader, Card, Container, Segment, Tab } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Profiles } from '../../api/profile/Profiles';
import { Items } from '../../api/item/Items';
// import Profile from '../components/Profile';
import MainProfile from '../components/MainProfile';
// import MyProduct from '../components/MyProduct';
import Products from '../components/Products';

/** Renders a table containing all of the vendor documents. Use <MyVendorData> to render each row. */
class MyProfile extends React.Component {
  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting Profile data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const username = Meteor.users.findOne({ _id: Meteor.userId() }).username;

    const prof1 = _.filter(this.props.profiles, function (profs) {
      if (username === profs.owner) {
        return profs;
      }
      return 0;
    });

    const prod1 = _.filter(this.props.items, function (prods) {
      if (username === prods.owner) {
        return prods;
      }
      return 0;
    });

    const panes = [
      { menuItem: 'My Products', render: () => <Tab.Pane>
        <Card.Group>
          {prod1.map((product, index) => <Products key={index} product={product} Products={Products}/>)}
        </Card.Group>
      </Tab.Pane> },
      { menuItem: 'Reviews', render: () => <Tab.Pane>Reviews will go here.</Tab.Pane> },

    ];
    return (
      <div className='profilePage' id='profile-page'>
        <Container text style={{ marginTop: '7em' }}>
          <Header as='h1' textAlign='center' inverted>My Profile</Header>
          <Divider />
          {prof1.map((prof) => <MainProfile key={prof._id} info={prof} Profiles={Profiles}/>)}
          <Divider/>
          <Segment>
            <Tab panes={panes}/>
          </Segment>
        </Container>
      </div>
    );
  }
}

// Require an array of Vendor documents in the props.
MyProfile.propTypes = {
  profiles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Vendor documents.

  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  const subscription2 = Meteor.subscribe(Items.userPublicationName);
  const ready = subscription.ready();
  const ready2 = subscription2.ready();
  // Get the Vendor documents
  const profiles = Profiles.collection.find({}).fetch();
  const items = Items.collection.find({}).fetch();
  return {
    profiles,
    items,
    ready,
    ready2,
  };
})(MyProfile);
