import React from 'react';
import { Grid, Loader, Header, Segment, Divider, Container, Form, Button } from 'semantic-ui-react';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import {
  AutoForm,
  ErrorsField,
  HiddenField,
  SubmitField,
  SelectField,
  TextField } from 'uniforms-semantic';
import { Link } from 'react-router-dom';
import { Profiles } from '../../api/profile/Profiles';

const bridge = new SimpleSchema2Bridge(Profiles.schema);

/** Renders the Page for editing a single profile. */
class EditItem extends React.Component {
  // On successful submit, insert the data.
  submit(data) {
    const { email, firstName, lastName, profilePic, phone, questionnaire, _id } = data;
    Profiles.collection.update(_id, { $set: { email, firstName, lastName, profilePic, phone, questionnaire, _id } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Profile updated successfully', 'success')));
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    return (
      <Container id="signup-page">
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>
                Update your barGAINS profile
            </Header>
            <Divider/>
            <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
              <Segment>
                <TextField name='email'/>
                <Form.Group widths='equal'>
                  <TextField name='firstName'/>
                  <TextField name='lastName'/>
                </Form.Group>
                <TextField name='profilePic'/>
                <TextField name='phone'/>
                <SelectField name='questionnaire'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='owner' />
                <Button color='red' basic as={Link} activeClassName="active" exact to="/myprofile" key='profile'>Cancel</Button>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

// Require the presence of a Item document in the props object. Uniforms adds 'model' to the props, which we use.
EditItem.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = Profiles.collection.findOne(documentId);
  return {
    doc,
    ready,
  };
})(EditItem);
