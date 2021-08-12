import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Divider, Header, Loader, Card, Container, Segment, Tab, Table } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Profiles } from '../../api/profile/Profiles';
import { Items } from '../../api/item/Items';
import { Answers } from '../../api/answer/Answers';
// import Profile from '../components/Profile';
import MainProfile from '../components/MainProfile';
// import MyProduct from '../components/MyProduct';
import Products from '../components/Products';
import Answer from '../components/Answers';

/** Renders a table containing all of the vendor documents. Use <MyVendorData> to render each row. */
class MyProfile extends React.Component {
  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting Profile data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const username = Meteor.users.findOne({ _id: Meteor.userId() }).username;

    const prof1 = _.filter(this.props.profiles, function (profs) {
      if (username === profs.owner) {
        return profs;
      }
      return 0;
    });

    const prod1 = _.filter(this.props.items, function (prods) {
      if (username === prods.owner) {
        return prods;
      }
      return 0;
    });
    const answ1 = _.filter(this.props.answers, function (answer) {
      if (username === answer.owner) {
        return answer;
      }
      return 0;
    });

    const panes = [
      { menuItem: 'My Products', render: () => <Tab.Pane>
        <Card.Group itemsPerRow={2}>
          {prod1.map((product, index) => <Products key={index} product={product} Products={Products}/>)}
        </Card.Group>
      </Tab.Pane> },
      { menuItem: 'Reviews', render: () => <Tab.Pane>Reviews will go here.</Tab.Pane> },
      { menuItem: 'Questionnaire', render: () => <Tab.Pane>
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Have you experienced any of the following symptoms within the past 2 weeks?</Table.HeaderCell>
              <Table.HeaderCell>Are you isolating or quarantining because you tested positive for COVID-19 or are worried that you may be sick or exposed to COVID-19?</Table.HeaderCell>
              <Table.HeaderCell>Have you been told that you are suspected to have COVID-19 by a licensed healthcare provider in the past 10 days?</Table.HeaderCell>
              <Table.HeaderCell>Are you fully vaccinated? OR Have you recovered from a documented COVID-19 infection in the last 3 months? </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {answ1.map(answer => <Answer key={answer._id} answers={answer}/>)}
          </Table.Body>
        </Table>
      </Tab.Pane> },

    ];
    return (
      <div className='profilePage' id='profile-page'>
        <Container text style={{ marginTop: '7em' }}>
          <Header as='h1' textAlign='center' inverted>My Profile</Header>
          <Divider />
          {prof1.map((prof) => <MainProfile key={prof._id} info={prof} Profiles={Profiles}/>)}
          <Divider/>
          <Segment>
            <Tab panes={panes}/>
          </Segment>
        </Container>
      </div>
    );
  }
}

// Require an array of Vendor documents in the props.
MyProfile.propTypes = {
  profiles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  answers: PropTypes.array.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Vendor documents.

  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  const subscription2 = Meteor.subscribe(Items.userPublicationName);
  const subscription3 = Meteor.subscribe(Answers.userPublicationName);
  const ready = subscription.ready();
  const ready2 = subscription2.ready();
  const ready3 = subscription3.ready();
  // Get the Vendor documents
  const profiles = Profiles.collection.find({}).fetch();
  const items = Items.collection.find({}).fetch();
  const answers = Answers.collection.find({}).fetch();
  return {
    profiles,
    items,
    answers,
    ready,
    ready2,
    ready3,
  };
})(MyProfile);
