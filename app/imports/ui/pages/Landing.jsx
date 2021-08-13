import React from 'react';
import { Button, Header, Grid, Container, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const landingButton = {
      color: 'white',
      background: '#344C7E',
    };
    return (
      <div className='landingPage' id='landing-page'>
        <Container textAlign='center'>
          <Grid verticalAlign='middle' textAlign='center' container>
            <Grid.Column width={9}>
              <Image size='large' src="/images/bargains.png" centered/>
              <Header as='h1' inverted >Welcome to barGAINS</Header>
              <Header as='h3' inverted >Where you can buy, sell, and exchange technology, books, and music!</Header>
              <Header as='h2' inverted >No pay, no Gains!</Header>
              <Container textAlign='center'>
                <Button size="medium" as={Link} to='/Signup' style={landingButton}>
                  Get Started
                </Button>
              </Container>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default Landing;
