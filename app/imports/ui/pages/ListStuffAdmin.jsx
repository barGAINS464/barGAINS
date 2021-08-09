import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader, Divider } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
// import { Stuffs } from '../../api/stuff/Stuff';
import { Items } from '../../api/item/Items';
// import StuffItemAdmin from '../components/StuffItemAdmin';
import ProductsAdmin from '../components/ProductsAdmin';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListStuffAdmin extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center" inverted>List Items (Admin)</Header>
        <Divider/>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Cost</Table.HeaderCell>
              <Table.HeaderCell>email</Table.HeaderCell>
              <Table.HeaderCell>condition</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.items.map((item) => <ProductsAdmin key={item._id} products={item}/>)}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ListStuffAdmin.propTypes = {
  items: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Items.adminPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const items = Items.collection.find({}).fetch();
  return {
    items,
    ready,
  };
})(ListStuffAdmin);
