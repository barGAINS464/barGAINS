import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Header, Icon,
  Image,
  Label,
  List,
  Loader, Segment,
} from 'semantic-ui-react';
import { Items } from '../../api/item/Items';
import { Profiles } from '../../api/profile/Profiles';
import ProfileCards from '../components/ProfileCards';

class ProductPage extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
      <Container text style={{ marginTop: '7em' }}>
        <Header as='h1' textAlign='center' inverted>Product Page</Header>
        <Divider/>
        <Grid columns={2} divided>
          <Grid.Column>
            {this.props.contact.map((contact, index) => <ProfileCards key={index} pc={contact} />)}
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Label color='black' size='large' ribbon>Product Item</Label>
              <Card centered>
                <Card.Content>
                  <Image className='cardImage' src={this.props.uItem.image} wrapped ui={true} rounded/>
                  <Divider/>
                  <Label color='black' basic ribbon>{this.props.uItem.category}</Label>
                  <Card.Header className='cardSpace'>{this.props.uItem.title}
                    <Label size='mini' color='green' tag>${this.props.uItem.cost}</Label>
                  </Card.Header>
                  <Card.Description>
                    <List>
                      <List.Item><b>Condition:</b> &nbsp; {this.props.uItem.condition}</List.Item>
                      <List.Item><b>Description:</b> &nbsp; {this.props.uItem.description}</List.Item>
                    </List>
                  </Card.Description>
                </Card.Content>
                <Card.Content>
                  <Button color='red' basic attached>
                    <Icon name='heart' />Add to Wish List</Button>
                </Card.Content>
              </Card>
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

ProductPage.propTypes = {
  uItem: PropTypes.object,
  model: PropTypes.object,
  contact: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  const documentId = match.params._id;
  const subscription = Meteor.subscribe(Items.userPublicationName);
  const ready = subscription.ready();
  const uItem = Items.collection.findOne(documentId);
  const subscription2 = Meteor.subscribe(Profiles.userPublicationName);
  const ready2 = subscription2.ready();
  const username = _.first(_.pluck(Items.collection.find(documentId).fetch(), 'owner'));
  const contact = Profiles.collection.find({ owner: username }).fetch();
  return {
    uItem,
    contact,
    ready,
    ready2,
  };
})(ProductPage);
