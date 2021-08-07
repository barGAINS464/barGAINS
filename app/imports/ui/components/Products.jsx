import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
// import { Items } from '../../api/item/Items';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Products extends React.Component {
//  removeItem(docID) {
//    Items.collection.remove(docID);
//  }
  render() {
    return (
      <Card centered>
        <Card.Content>
          <Card.Header>{this.props.product.title} ${this.props.product.cost}</Card.Header>
          <Card.Meta>Contact: {this.props.product.email} Condition: {this.props.product.condition} </Card.Meta>
          <Card.Description>
            {this.props.product.description}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
Products.propTypes = {
  product: PropTypes.object.isRequired,
  // Products: PropTypes.object.isRequired,
};
// Products.propTypes = {
//  product: PropTypes.shape({
//    title: PropTypes.string,
//    cost: PropTypes.number,
//    email: PropTypes.string,
//    // closingDate: PropTypes.string,
//    condition: PropTypes.string,
//    description: PropTypes.string,
//  }).isRequired,
//
// };
// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Products);
