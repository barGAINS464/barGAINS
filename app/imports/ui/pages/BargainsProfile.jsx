import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Container, Header, Loader, Card, Grid, Image, Segment, Divider, List, Tab, Feed } from 'semantic-ui-react';
import { AutoForm, HiddenField, LongTextField, NumField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Profiles } from '../../api/profile/Profiles';
import { Items } from '../../api/item/Items';
import ProductShop from '../components/ProductShop';
import { Reviews } from '../../api/review/Reviews';
import Review from '../components/Review';

const bridge = new SimpleSchema2Bridge(Reviews.schema);

class BargainsProfile extends React.Component {

  submit(data, formRef) {
    const { purchased, rating, createdAt, comment } = data;
    const commenter = Meteor.user().username;
    const reviewOwner = this.props.bProfile.email;

    Reviews.collection.insert({ commenter, purchased, rating, createdAt, comment, owner: reviewOwner },
      (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Review posted successfully', 'success')));
    formRef.reset();
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    let fRef = null;
    const commenter = Meteor.users.findOne({ _id: Meteor.userId() }).username;
    const reviewOwner = this.props.bProfile.email;

    const panes = [
      { menuItem: 'Products', render: () => <Tab.Pane>
        <Card.Group itemsPerRow={2}>
          {this.props.products.map((product, index) => <ProductShop key={index} product={product} Products={Items}/>)}
        </Card.Group>
      </Tab.Pane> },
      { menuItem: 'Reviews', render: () => <Tab.Pane>
        <AutoForm id='review-form' ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
          <Segment attached>
            <Header icon='user' as='h4'>Seller Reviews</Header>
            <Divider/>
            <Feed>
              {this.props.reviews.map((review, index) => <Review key={index} review={review} Reviews={Reviews}/>)}
            </Feed>
          </Segment>
          <Segment>
            <NumField name='rating' max={5} min={0}/>
            <TextField name='purchased'/>
            <LongTextField name='comment'/>
            <HiddenField name='commenter' value={commenter}/>
            <HiddenField name='owner' value={reviewOwner}/>
            <HiddenField name='createdAt' value={new Date()}/>
            <SubmitField id='userReview-submit' value='Submit' />
          </Segment>
        </AutoForm>
      </Tab.Pane> },
    ];

    return (
      <div className='userProfilePage' id='userProfile-page'>
        <Container text style={{ marginTop: '7em' }}>
          <Header as='h1' textAlign='center' inverted>User Profile</Header>
          <Divider/>
          <Grid columns={2} divided>
            <Grid.Column>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Header as='h1'
                  textAlign='center'>{this.props.bProfile.firstName} {this.props.bProfile.lastName}</Header>
                <Divider/>
                <Image size='medium rounded image' src={this.props.bProfile.profilePic} wrapped ui={true} centered/>
                <List centered>
                  <List.Item>
                    <List.Icon name='mail'/>
                    <List.Content>{this.props.bProfile.email}</List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name='phone'/>
                    <List.Content>{this.props.bProfile.phone}</List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content><Header as='h4'>Questionnaire: {this.props.bProfile.questionnaire}</Header></List.Content>
                  </List.Item>
                </List>
              </Segment>
            </Grid.Column>
          </Grid>
          <Divider/>
          <Segment>
            <Tab panes={panes}/>
          </Segment>
        </Container>
      </div>
    );
  }
}

BargainsProfile.propTypes = {
  bProfile: PropTypes.object,
  answers: PropTypes.array.isRequired,
  model: PropTypes.object,
  products: PropTypes.array.isRequired,
  reviews: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  const docId = match.params._id;
  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  const ready = subscription.ready();
  const bProfile = Profiles.collection.findOne(docId);
  const subscription2 = Meteor.subscribe(Items.userPublicationName);
  const ready2 = subscription2.ready();
  const username = _.first(_.pluck(Profiles.collection.find(docId).fetch(), 'owner'));
  const products = Items.collection.find({ owner: username }).fetch();
  const subscription3 = Meteor.subscribe(Reviews.userPublicationName);
  const ready3 = subscription3.ready();
  const reviews = Reviews.collection.find({ owner: username }).fetch();
  // const subscription3 = Meteor.subscribe(Items.userPublicationName);
  // const ready3 = subscription2.ready();

  return {
    bProfile,
    products,
    reviews,
    ready,
    ready2,
    ready3,
  };
})(BargainsProfile);
