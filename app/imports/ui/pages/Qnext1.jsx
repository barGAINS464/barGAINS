import React from 'react';
import { Grid, Segment, Header, Icon, Button, List } from 'semantic-ui-react';
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
    // eslint-disable-next-line no-undef
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
            <Segment padded='very' id='symptoms' align='center'>
              <Header>Have you experienced any of the following symptoms?</Header>
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
              <div align='center'>
                <Button color='teal' id='yes' content='Yes' />
                <Button color='teal' id='no' content='No' />
              </div>
            </Segment>
            <div align='center'>
              <Button positive size='large' id='submit' as={NavLink} activeClassName="active" exact to="/Qnext2" key='next'>Next</Button>
            </div>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Q2next1;
