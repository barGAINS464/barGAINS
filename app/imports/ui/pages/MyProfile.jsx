import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Grid, Divider, Header, Image, Container, List, Segment, Menu } from 'semantic-ui-react';
import { Profiles } from '../../api/profile/Profiles';

/** A simple static component to render some text for the landing page. */
class MyProfile extends React.Component {
  render() {

    return (
      <div className='profilePage' id='profile-page'>
        <Container text style={{ marginTop: '7em' }}>
          <Header as='h1' textAlign='center' inverted>My Profile</Header>
          <Divider />
          <Grid columns={2} divided>
            <Grid.Column>
              <Image size='medium rounded image' src='this.props.doc.image' centered/>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Header as='h1' textAlign='center'>{this.props.doc.firstName} {this.props.doc.lastName}</Header>
                <Divider />
                <List centered>
                  <List.Item>
                    <List.Icon name='user icon' />
                    <List.Content>{this.props.doc.user}</List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name='mail' />
                    <List.Content>{this.props.doc.email}</List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name='phone' />
                    <List.Content>{this.props.doc.phone}</List.Content>
                  </List.Item>
                </List>
              </Segment>
              <Segment>
                <List.Item>
                  <List.Header as='h4' textAlign='center'>About Me</List.Header>
                  <Divider />
                  <List.Content>
                    Hi! My name is Sue, a sophomore at UH Mānoa.
                    I love collecting vinyls and have sparked an interest in learning to play the guitar.
                    I am here in hopes of selling or trading some of my vinyl collections.
                    I also love to read a range of novels and have an interest in joining various book clubs.
                    Contact me if you have any questions!
                  </List.Content>
                </List.Item>
              </Segment>
            </Grid.Column>
          </Grid>
          <Divider/>
          <Menu attached='top' color='white' tabular widths={2} inverted>
            <Menu.Item
              name='POSTS'
              // active={activeItem === 'bio'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='REVIEWS'
              // active={activeItem === 'photos'}
              onClick={this.handleItemClick}
            />
          </Menu>
        </Container>
      </div>
    );
  }
}

MyProfile.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  const ready = subscription.ready();
  const doc = Profiles.collection.find({}).fetch();
  return {
    doc,
    ready,
  };
})(MyProfile);
