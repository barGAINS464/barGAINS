import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField, LongTextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Items } from '../../api/item/Items';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  image: String,
  title: String,
  cost: Number,
  email: String,
  condition: {
    type: String,
    allowedValues: ['excellent', 'good', 'fair', 'poor'],
    defaultValue: 'good',
  },
  description: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddItem extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { image, title, cost, email, condition, description } = data;
    const owner = Meteor.user().username;
    Items.collection.insert({ image, title, cost, email, condition, description, owner },
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
          <Header as="h2" textAlign="center" inverted> New Post </Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField name='title'/>
              <div className="inline fields">
                <TextField name='image' placeholder={'Please paste your image here...'}/>
                <NumField name='cost' decimal={true}/>
                <SelectField name='condition'/>
                <TextField name='email'/>
              </div>
              <LongTextField name='description' placeholder={'Add a description about your item...'}/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default AddItem;
