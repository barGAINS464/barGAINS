import React from 'react';
import { Grid, Header, Icon, Segment, Container, Card } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Stuffs } from '../../api/stuff/Stuff';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  quantity: Number,
  condition: {
    type: String,
    allowedValues: ['excellent', 'good', 'fair', 'poor'],
    defaultValue: 'good',
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class About extends React.Component {

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    const fRef = null;
    return (
      <div className='aboutPage'>
        <Header as='h1' icon inverted textAlign='center'>
          <Icon name='users' circular/>
          <Header.Content>About Us</Header.Content>
        </Header>
        <div className="ui divider"></div>
        <Segment>
          <Container>
            <Header as='h2' color="teal">About barGAINS</Header>
            <p>
                barGAINS is a place for college students to safely buy, sell, and trade technology, books, music, and more. During the times of COVID-19 our site aims to create a safer environment for users to interact and exchange their items.
            </p>
            <Header as='h2' color="teal">Developers</Header>
            <Card.Group>
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
                description='I am studying for a B.S. in Computer Science in the Department of Information and Computer Sciences and a B.A. in Studio Art in the Department of Art and Art History at the University of Hawaii. I expect to graduate in Spring, 2022.'
              />
              <Card
                href='https://glarita.github.io/'
                header='Glen Larita'
                meta='Lead Developer'
                description='I am studying for a B.S. in Computer Science at the University of Hawaii at Manoa. I have an interest in software engineering and I am expecting to graduate in Fall 2022.'
              />
            </Card.Group>
          </Container>
        </Segment>
      </div>
    );
  }
}

export default About;
