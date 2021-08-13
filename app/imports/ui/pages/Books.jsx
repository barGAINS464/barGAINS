import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card, Divider } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Items } from '../../api/item/Items';
import ProductShop from '../components/ProductShop';

/** Renders a page containing all of the Books product cards. */
class Books extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const books = this.props.items.filter(book => book.category === 'Book');
    return (
      <div className='topRoom'>
        <Container>
          <Header as="h2" textAlign="center" inverted>Books</Header>
          <Divider/>
          <Card.Group itemsPerRow={4}>
            {books.map((items, index) => <ProductShop key={index} product={items}/>)}
          </Card.Group>
        </Container>
      </div>
    );
  }
}

// Require an array of products documents in the props.
Books.propTypes = {
  items: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Items.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const items = Items.collection.find({}).fetch();
  return {
    items,
    ready,
  };
})(Books);
