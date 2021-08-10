import React from 'react';
import { Grid, Header, Icon, Segment, Divider } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, RadioField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Answers } from '../../api/answer/Answers';

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
  owner: String,
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
    return (
      <Grid column container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center" inverted>
            <Icon name='stethoscope' circular inverted/>
              Covid-19 Questionnaire </Header>
          <Divider/>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <RadioField name='question1' inline showInlineError={true}
                label='Have you experienced any of the following symptoms within the past 2 weeks?
                  fever or chills
             cough
             shortness of breath or difficulty breathing
             fatigue
             muscle or body aches
             headache
             new loss of taste or smell
             sore throat
             congestion or runny nose
             nausea or vomiting
             diarrhea
                '
              />
              <RadioField name='question2' label='Are you isolating or quarantining because you tested positive for COVID-19 or are worried that you may be sick or exposed to COVID-19?' inline showInlineError={true}/>
              <RadioField name='question3' label='Have you been told that you are suspected to have COVID-19 by a licensed healthcare provider in the past 10 days?'/>
              {/* eslint-disable-next-line max-len */}
              <RadioField name='question4' label='Are you fully vaccinated?* OR Have you recovered from a documented COVID-19 infection in the last 3 months? To be considered fully vaccinated, you must be more than 2 weeks following receipt of the second dose in a 2-dose series or more than 2 weeks following the receipt of one does of a single-dose vaccination.'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Questionnaire;
