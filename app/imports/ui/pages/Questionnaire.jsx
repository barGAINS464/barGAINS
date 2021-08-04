import React from 'react';
import { Grid, Segment, Header, Icon, Button, List, Container } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Stuffs } from '../../api/stuff/Stuff';

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

          <Header as='h2' icon textAlign={'center'}>
            <Icon name='stethoscope' circular/>
            COVID-19 QUESTIONNAIRE
            <Header.Subheader>
              Before you contact this seller, please fill out the following questionnaire to assure the safety of both you and the buyer/seller.
            </Header.Subheader>
          </Header>

          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment padded='very' id='symptoms'>
              <Header>Have you experienced any of the following symptoms?</Header>
              <div>
                <List bulleted>
                  <List.Item>fever or chills</List.Item>
                  <List.Item>cough</List.Item>
                  <List.Item>shortness of breath or difficulty breathing</List.Item>
                  <List.Item>fatigue</List.Item>
                  <List.Item>muscle or body aches</List.Item>
                  <List.Item>headache</List.Item>
                  <List.Item>new loss of taste or smell</List.Item>
                  <List.Item>sore throat</List.Item>
                  <List.Item>congestion or runny nose</List.Item>
                  <List.Item>nausea or vomiting</List.Item>
                  <List.Item>diarrhea</List.Item>
                  <List> </List>
                </List>
              </div>
              <div>
                <Button color='teal' content='Yes' />
                <Button color='teal' content='No' />
              </div>
            </Segment>

            <Segment padded='very' id='quarantine'>
              <Header>Are you isolating or quarantining because you tested positive for COVID-19 or are worried that you may be sick or exposed to COVID-19?</Header>
              <div>
                <Button color='teal' content='Yes' />
                <Button color='teal' content='No' />
              </div>
            </Segment>
            <Segment padded='very' id='positive'>
              <Header>Have you been told that you are suspected to have COVID-19 by a licensed healthcare provider in the past 10 days?</Header>
              <div>
                <Button color='teal' content='Yes' />
                <Button color='teal' content='No' />
              </div>
            </Segment>
            <Segment padded='very' id='vax'>
              <Header>Are you fully vaccinated?*</Header>
              <Header>OR</Header>
              <Header>Have you recovered from a documented COVID-19 infection in the last 3 months?</Header>
              <Header as='h4'>*To be considered fully vaccinated, you must be more than 2 weeks following receipt of the second dose in a 2-dose series or more than 2 weeks following the receipt of one does of a single-dose vaccination.</Header>
              <div>
                <Button color='teal' content='Yes' />
                <Button color='teal' content='No' />
              </div>
            </Segment>

            <SubmitField value='Submit'/>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Questionnaire;
