import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Container, Header, Loader, Card, Grid, Image, Segment, Divider, List, Tab } from 'semantic-ui-react';
import { Profiles } from '../../api/profile/Profiles';
import Products from '../components/Products';
import { Items } from '../../api/item/Items';

class BargainsProfile extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const panes = [
      { menuItem: 'My Products', render: () => <Tab.Pane>
        <Card.Group itemsPerRow={2}>
          {this.props.products.map((product, index) => <Products key={index} product={product} Products={Items}/>)}
        </Card.Group>
      </Tab.Pane> },
      { menuItem: 'Reviews', render: () => <Tab.Pane>Reviews will go here.</Tab.Pane> },
    ];

    return (
      <div className='userProfilePage' id='userProfile-page'>
        <Container text style={{ marginTop: '7em' }}>
          <Header as="h2">User Profile</Header>
          <Grid columns={2} divided>
            <Grid.Column>
              <Image size='medium rounded image' src={this.props.bProfile.profilePic} wrapped ui={true} centered/>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Header as='h1' textAlign='center'>{this.props.bProfile.firstName} {this.props.bProfile.lastName}</Header>
                <Divider />
                <List centered>
                  <List.Item>
                    <List.Icon name='mail' />
                    <List.Content>{this.props.bProfile.email}</List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name='phone' />
                    <List.Content>{this.props.bProfile.phone}</List.Content>
                  </List.Item>
                </List>
              </Segment>
            </Grid.Column>
          </Grid>
          <Header as="h2" textAlign="center">User Products</Header>
          <Divider/>
          <Segment>
            <Tab panes={panes}/>
          </Segment>
        </Container>
      </div>
    );
  }
}

BargainsProfile.propTypes = {
  bProfile: PropTypes.object,
  model: PropTypes.object,
  products: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  const docId = match.params._id;
  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  const ready = subscription.ready();
  const bProfile = Profiles.collection.findOne(docId);
  const subscription2 = Meteor.subscribe(Items.userPublicationName);
  const ready2 = subscription2.ready();
  const username = _.first(_.pluck(Profiles.collection.find(docId).fetch(), 'owner'));
  const products = Items.collection.find({ owner: username }).fetch();
  return {
    bProfile,
    products,
    ready,
    ready2,
  };
})(BargainsProfile);
