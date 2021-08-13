import React from 'react';
import { Header, Icon, Container, Card } from 'semantic-ui-react';

/** Renders the About us Page */
class About extends React.Component {
  render() {
    const style = {
      color: '#344C7E',
    };
    return (
      <div className='aboutPage'>
        <Header as='h1' icon inverted textAlign='center'>
          <Icon name='users' circular/>
          <Header.Content>About Us</Header.Content>
        </Header>
        <div className="ui divider"></div>
        <Container>
          <Header as='h2' style={style}>About barGAINS</Header>
          <div className="descriptionText">
            <p>
                barGAINS is a place for college students to safely buy, sell, and trade technology, books, music, and
              more. During the times of COVID-19 our site aims to create a safer environment for users to interact and
              exchange their items. Users are able to create an account, login, post items to sell or trade, and view
              items to buy. In addition, users are asked to complete a survey which will screen them for COVID-19
              symptoms, thus attempting to create a safer environment for our users to decide how they would like to
              interact with each other as they buy, sell, or trade their items in person or through other means.
            </p>
          </div>
          <Header as='h2' style={style}>Developers</Header>
          <Card.Group itemsPerRow={4}>
            <Card
              href='https://alyssandra-cabading.github.io/'
              header='Alyssandra Cabading'
              meta='Developer'
              description='I am studying for a B.S. in Computer Science in the Department of Information and Computer Sciences at the University of Hawaii. I expect to graduate in Spring, 2022.'
            />
            <Card
              href='https://austinschong.github.io/'
              header='Austin Chong'
              meta='Developer'
              description='I am studying for a B.S. in Computer Science in the Department of Information and Computer Sciences at the University of Hawaii. I expect to graduate in Spring, 2023.'
            />
            <Card
              href='https://tylerchinen.github.io/'
              header='Tyler Chinen'
              meta='Developer'
              description='I am studying for a B.S. in Computer Science in the Department of Information and Computer
              Sciences and a B.A. in Studio Art in the Department of Art and Art History at the University of Hawaii.
              I expect to graduate in Spring, 2022.'
            />
            <Card
              href='https://glarita.github.io/'
              header='Glen Larita'
              meta='Lead Developer'
              description='I am studying for a B.S. in Computer Science at the University of Hawaii at Manoa. I have an interest in software engineering and I am expecting to graduate in Fall 2022.'
            />
          </Card.Group>
        </Container>
      </div>
    );
  }
}

export default About;
