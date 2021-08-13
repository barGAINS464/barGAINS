import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Container, Header, Divider, Image, Segment, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class Signout extends React.Component {
  render() {
    Meteor.logout();
    return (
      <div className='signOutPage'>
        <Container text style={{ marginTop: '7em' }}>
          <Header id="signout-page" as="h2" textAlign="center" inverted>Thank you for using barGAINS! Come back soon.</Header>
          <Divider/>
          <Image size='small' src={'https://cdn.emojidex.com/emoji/seal/shaka_sign%28br%29.png?1477148434'} centered/>
          <Segment>
            <Button.Group attached basic>
              <Button as={NavLink} activeClassName="" exact to="/signin" key='signin' attached>
                <Icon name='user'/>Login
              </Button>
              <Button as={NavLink} activeClassName="" exact to="/" key='landing' attached>
                <Icon name='home'/>Home Page
              </Button>
            </Button.Group>
          </Segment>
        </Container>
      </div>
    );
  }
}
