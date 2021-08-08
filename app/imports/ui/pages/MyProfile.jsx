import React from 'react';
import { Grid, Divider, Header, Image, Container, List, Segment, Menu } from 'semantic-ui-react';

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
              <Image size='medium rounded image' src="https://media.newyorker.com/photos/5d8cfb19a4b97600086ed8ac/master/pass/Patterson-Malkmus-primary" centered/>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Header as='h1' textAlign='center'>SUE FLAY</Header>
                <Divider />
                <List centered>
                  <List.Item>
                    <List.Icon name='user icon' />
                    <List.Content>SooFly</List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name='mail' />
                    <List.Content>
                      <a href='mailto:sueflay@hawiai.edu='>jsueflay@hawaii.edu</a>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name='phone' />
                    <List.Content>(808) 222-2222</List.Content>
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

export default MyProfile;
