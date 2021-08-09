import React from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Items } from '../../api/item/Items';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class ProductsAdmin extends React.Component {
  removeItem(docID) {
    Items.collection.remove(docID);
  }

  render() {
    return (
      <Card centered>
        <Card.Content>
          <Image className='cardImage' src={this.props.product.image} wrapped ui={true} rounded/>
          <Card.Header className='cardSpace'> {this.props.product.title} ${this.props.product.cost} </Card.Header>
          <Card.Meta>
              Contact: {this.props.product.owner}
          </Card.Meta>
          <Card.Meta>
              Category: {this.props.product.category}
          </Card.Meta>
          <Card.Description>
              Condition {this.props.product.condition}
          </Card.Description>
          <Card.Description>
            {this.props.product.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Button icon onClick={() => this.removeItem(this.props.product._id)} size='small'>
              <Icon name = "trash" />
            </Button>
            <Link to={`/edit/${this.props.product._id}`}>Edit</Link>
          </a>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
ProductsAdmin.propTypes = {
  products: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  Products: PropTypes.object.isRequired,
};

export default ProductsAdmin;
