import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class ProductsAdmin extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.products.title}</Table.Cell>
        <Table.Cell>{this.props.products.cost}</Table.Cell>
        <Table.Cell>{this.props.products.email}</Table.Cell>
        <Table.Cell>{this.props.products.condition}</Table.Cell>
        <Table.Cell>{this.props.products.description}</Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
ProductsAdmin.propTypes = {
  products: PropTypes.object.isRequired,
  Products: PropTypes.object.isRequired,
};

export default ProductsAdmin;
