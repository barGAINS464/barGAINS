import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Divider, Grid, Header, Image, List, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Profiles } from '../../api/profile/Profiles';

class MainProfile extends React.Component {
//  removeItem(docID) {
//    Profiles.collection.remove(docID);
//  }

  render() {
    return (
      <div>
        <Grid columns={2} divided>
          <Grid.Column>
            <Image size='medium rounded image' src={this.props.profile.profilePicture} wrapped ui={true} centered/>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Header as='h1' textAlign='center'>{this.props.profile.firstName} {this.props.profile.lastName}</Header>
              <Divider />
              <List centered>
                <List.Item>
                  <List.Icon name='user icon' />
                  <List.Content>{this.props.profile.user}</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name='mail' />
                  <List.Content>{this.props.profile.email}</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name='phone' />
                  <List.Content>{this.props.profile.phone}</List.Content>
                </List.Item>
              </List>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

MainProfile.propTypes = {
  profile: PropTypes.object,
  model: PropTypes.object,
  products: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  const ready = subscription.ready();
  const profile = Profiles.collection.findOne();
  return {
    profile,
    ready,
  };
})(MainProfile);
