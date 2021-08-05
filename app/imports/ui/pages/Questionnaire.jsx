import React from 'react';
import { Grid, Header, Icon, Button, List } from 'semantic-ui-react';
import { AutoForm } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Stuffs } from '../../api/stuff/Stuff';
import { NavLink } from 'react-router-dom';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  symptoms: {
    type: Boolean,
    defaultValue: true,
  },
  quarantine: {
    type: Boolean,
    defaultValue: true,
  },
  positive: {
    type: Boolean,
    defaultValue: true,
  },
  vax: {
    type: Boolean,
    defaultValue: false,
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class Questionnaire extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { name, quantity, condition } = data;
    const owner = Meteor.user().username;
    Stuffs.collection.insert({ name, quantity, condition, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  submit() {
    const { symptoms, quarantine, positive, vax } = false;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as='h1' icon textAlign={'center'}>
            <Icon name='stethoscope' circular/>
            COVID-19 QUESTIONNAIRE
            <Header as='h3'>
              Before you contact this seller, please fill out the following questionnaire to assure the safety of both you and the buyer/seller.
            </Header>
          </Header>

          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <div align='center'>
              <Button positive size='large' id='submit' as={NavLink} activeClassName="active" exact to="/Qnext1" key='start'>Start</Button>
              <List>
                <List.Item> </List.Item>
                <List.Item> </List.Item>
                <List.Item> </List.Item>
              </List>
            </div>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Questionnaire;
