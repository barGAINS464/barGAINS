import React from 'react';
import { Grid, Segment, Header, Icon, Button } from 'semantic-ui-react';
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
class Q2next1 extends React.Component {

  submit(data) {
    const { symptoms } = data;
    Stuffs.collection.update(_id, { $set: { symptoms } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
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
            <Segment padded='very' align='center' id='positive'>
              <Header>Have you been told that you are suspected to have COVID-19 by a licensed healthcare provider in the past 10 days?</Header>
              <div align='center'>
                <Button color='teal' content='Yes' />
                <Button color='teal' content='No' />
              </div>
            </Segment>
            <Button positive size='large' id='back' floated='left' as={NavLink} activeClassName="active" exact to="/Qnext2" key='back'>Back</Button>
            <Button positive size='large' id='next' floated='right' as={NavLink} activeClassName="active" exact to="/Qnext4" key='next'>Next</Button>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Q2next1;
