import React from 'react';
import { Segment } from 'semantic-ui-react';
import { AutoForm, HiddenField, SubmitField, LongTextField, NumField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Reviews } from '../../api/review/Reviews';

const bridge = new SimpleSchema2Bridge(Reviews.schema);

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class AddReview extends React.Component {

  submit(data, formRef) {
    const { rating, reviewImage, comment, createdAt } = data;
    const userName = Meteor.user().username;

    Reviews.collection.insert({ userName, rating, reviewImage, comment, createdAt },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Your review was posted!', 'success');
          formRef.reset();
        }
      });
  }

  render() {
    let fRef = null;
    const userName = Meteor.user().username;

    return (
      <AutoForm id='review-form' ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
        <Segment>
          <HiddenField name='userName' value={userName}/>
          <NumField name='rating'/>
          <LongTextField name='comment'/>
          <TextField name='reviewImage'/>
          <HiddenField name='createdAt' value={new Date()}/>
          <SubmitField id='userReview-submit' value='Submit'/>
        </Segment>
      </AutoForm>
    );
  }
}

export default AddReview;
