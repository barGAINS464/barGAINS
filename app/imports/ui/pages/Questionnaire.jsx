import React from 'react';
import { Grid, Header, Icon, Segment, Divider, List, Container } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Answers } from '../../api/answer/Answers';
import RadioField from '../../forms/controllers/RadioField';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  question1: {
    type: String,
    allowedValues: ['Yes', 'No'],
  },
  question2: {
    type: String,
    allowedValues: ['Yes', 'No'],
  },
  question3: {
    type: String,
    allowedValues: ['Yes', 'No'],
  },
  question4: {
    type: String,
    allowedValues: ['Yes', 'No'],
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class Questionnaire extends React.Component {

  // On submit, insert the data.
  // Reverted back to original to avoid confusion
  submit(data, formRef) {
    const { question1, question2, question3, question4 } = data;
    const owner = Meteor.user().username;
    Answers.collection.insert({ question1, question2, question3, question4, owner },
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
    const salmon = {
      color: 'lightsalmon',
    };
    return (
      <div className='questionnaireForm'>
        <Grid column container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>
              <Icon name='stethoscope' circular inverted/>
              Covid-19 Questionnaire </Header>
            <Divider/>
            <AutoForm ref={ref => {
              fRef = ref;
            }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
              <Segment >
                <Container textAlign='center'>
                  <Header as='h5'>Question 1) Have you experienced any of the following symptoms within the past 2 weeks?</Header>
                  <Header as='h5'>
                    <List>
                      <List.Item>Fever or chills</List.Item>
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
                    </List>
                  </Header>
                  <div className='questionnaireForm'>
                    <Grid container centered>
                      <RadioField name='question1' inline howInlineError={true} label=''/>
                    </Grid>
                  </div>
                  <Divider/>
                  <Header as='h5'>Question 2) Are you isolating or quarantining because you tested positive for COVID-19 or are worried that you may be sick or exposed to COVID-19?</Header>
                  <div className='questionnaireForm'>
                    <Grid container centered>
                      <RadioField inline showInlineError={true} name='question2' label=''/>
                    </Grid>
                  </div>
                  <Divider/>
                  <Header as='h5'>Question 3) Have you been told that you are suspected to have COVID-19 by a licensed healthcare provider in the past 10 days?</Header>
                  <div className='questionnaireForm'>
                    <Grid container centered>
                      <RadioField name='question3' label='' inline showInlineError={true}/>
                    </Grid>
                    <Divider/>
                  </div>
                  <Header as='h5'>Question 4) Are you fully vaccinated?</Header>
                  <Header as='h4'>OR</Header>
                  <Header as='h5'>Have you recovered from a documented COVID-19 infection in the last 3 months? </Header>
                  <Header as='h5'>*To be considered fully vaccinated, you must be more than 2 weeks following receipt of the second dose in a 2-dose series or more than 2 weeks following the receipt of one does of a single-dose vaccination.</Header>
                  <div className='questionnaireForm'>
                    <Grid container centered>
                      <RadioField name='question4' label='' inline showInlineError={true}/>
                    </Grid>
                  </div>
                  <div className='questionnaireForm'>
                    <SubmitField value='Submit'/>
                  </div>
                </Container>
                <ErrorsField/>
              </Segment>
            </AutoForm>
            <Container textAlign='center' className='questionnaireForm'>
              <Header as='h4' inverted><i> Questions gathered from
                <a href='https://www.cdc.gov/screening/index.html' target='_blank' style={salmon}
                  rel='noreferrer'> www.cdc.gov </a> and <a href='https://www.osha.gov/sites/default/files/publications/OSHA4132.pdf' target='_blank'
                  style={salmon} rel='noreferrer'> www.osha.gov</a>.</i>
              </Header>
            </Container>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Questionnaire;
