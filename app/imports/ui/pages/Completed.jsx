import React from 'react';
import { Grid, Header, Icon, Button, List } from 'semantic-ui-react';
import { AutoForm } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { NavLink } from 'react-router-dom';
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

          <Header as='h1' icon textAlign={'center'}>
            <Icon name='thumbs up' circular/>
            QUESTIONNAIRE COMPLETE!
            <Header as='h3'>
              Your questionnaire results will be sent to the seller you are contacting.
            </Header>
            <Header as='h3'>
              The seller will also fill out a questionnaire which will be sent to you as well.
            </Header>
            <List> </List>
          </Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <div align='center'>
              <Button size='large' id='next' as={NavLink} activeClassName="active" exact to="/pages/ListStuff" key='continue'>Continue</Button>
              <Button size='large' id='next' as={NavLink} activeClassName="active" exact to="/Landing" key='add'>Home Page</Button>
            </div>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Q2next1;
