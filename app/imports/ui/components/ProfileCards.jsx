import React from 'react';
import { Divider, Grid, Header, Image, List, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ProfileCards extends React.Component {
  render() {
    return (
      <Grid columns={2} divided>
        <Grid.Column>
          <Image size='medium rounded image' src={this.props.profile.profilePicture} centered/>
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
    );
  }
}

// Require a document to be passed to this component.
ProfileCards.propTypes = {
  profile: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ProfileCards);
