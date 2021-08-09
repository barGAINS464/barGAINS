import React from 'react';
import { Grid, Header, Icon, Button, List, Segment } from 'semantic-ui-react';
import { AutoForm, SubmitField } from 'uniforms-semantic';
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
  // Reverted back to original to avoid confusion
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

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as='h1' icon textAlign={'center'} inverted>
            <Icon name='stethoscope' circular inverted/>
              COVID-19 QUESTIONNAIRE
            <Header as='h3' inverted>
              The total amount of COVID-19 cases in Hawaii is above 44,000 and rising.
              The new Delta variant is much more contagious, more likely to break protections afforded by the virus, and can cause severe disease.
            </Header>
            <Header.Subheader>
              Before you contact this seller, please fill out the following questionnaire to assure the safety of both you and the buyer/seller.
            </Header.Subheader>
          </Header>
          <div className="ui divider"></div>
          <Segment>
            <Grid.Column align="center">
              <Header>Have you experienced any of the following symptoms within the past 2 weeks?</Header>
              <div>
                <List>
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
              <div align='center' className="questionnaireButtons">
                <Button color='teal' content='Yes' />
                <Button color='teal' content='No' />
              </div>
            </Grid.Column>
          </Segment>
          <div className="ui divider"></div>
          <Segment>
            <Grid.Column align="center">
              <Header>Are you isolating or quarantining because you tested positive for COVID-19 or are worried that you may be sick or exposed to COVID-19?</Header>
              <div align='center' className="questionnaireButtons">
                <Button color='teal' content='Yes' />
                <Button color='teal' content='No' />
              </div>
            </Grid.Column>
          </Segment>
          <div className="ui divider"></div>
          <Segment>
            <Grid.Column align="center">
              <Header>Have you been told that you are suspected to have COVID-19 by a licensed healthcare provider in the past 10 days?</Header>
              <div align='center' className="questionnaireButtons">
                <Button color='teal' content='Yes' />
                <Button color='teal' content='No' />
              </div>
            </Grid.Column>
          </Segment>
          <div className="ui divider"></div>
          <Segment>
            <Grid.Column align="center">
              <Header>Are you fully vaccinated?*</Header>
              <Header>OR</Header>
              <Header>Have you recovered from a documented COVID-19 infection in the last 3 months?</Header>
              {/* eslint-disable-next-line max-len */}
              <Header as='h4'>*To be considered fully vaccinated, you must be more than 2 weeks following receipt of the second dose in a 2-dose series or more than 2 weeks following the receipt of one does of a single-dose vaccination.</Header>
              <div align='center' className="questionnaireButtons">
                <Button color='teal' content='Yes' />
                <Button color='teal' content='No' />
              </div>
            </Grid.Column>
          </Segment>
          <div className="ui divider"></div>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <div align='center'>
              <SubmitField value='Submit'/>
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
