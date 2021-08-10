import React from 'react';
import { Button, Container, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class Signout extends React.Component {
  render() {
    return (
      <Container textAlign='center' className='questionnaire1'>
        <Header as='h1' inverted>COVID-19 Questionnaire</Header><br/>
        <Header as='h3' inverted>The total amount of COVID-19 cases in Hawaii is above 44,000 and rising. The new Delta variant is much more
          contagious, more likely to break protections afforded by the virus, and can cause severe disease.</Header>
        <Header as='h4' inverted>To help prevent the spread of COVID-19 and for the safety of you and the user you are contacting, please
          answer the following 4 questions truthfully and to the best of your knowledge.</Header>
        <Button as={Link} to='/shop'>Agree</Button>
        <Button as={Link} to='/shop'>Disagree</Button>
      </Container>

    );
  }
}
