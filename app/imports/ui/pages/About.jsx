import React from 'react';
import { Grid, Header, Icon, Segment, Container, Divider } from 'semantic-ui-react';
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
            <Header as='h2' color="teal">What is barGAINS?</Header>
            <p>
                barGAINS is a place for college students to safely buy, sell, and trade technology, books, music, and more. During the times of COVID-19 our site aims to create a safer environment for users to interact and exchange their items.
            </p>
          </Container>
        </Segment>
      </div>
    );
  }
}

export default About;
