import React from 'react';
import { Button, Card, Divider, Icon, Image, Label, List } from 'semantic-ui-react';
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
          <Divider/>
          <Label color='black' basic ribbon>{this.props.product.category}</Label>
          <Card.Header className='cardSpace'>{this.props.product.title} <Label size='mini' color='green' tag>${this.props.product.cost}</Label>
          </Card.Header>
          <Card.Description>
            <List>
              <List.Item><Label as='a' basic><Icon name='mail'/> {this.props.product.email}</Label></List.Item>
              <List.Item><b>Condition:</b> &nbsp; {this.props.product.condition}</List.Item>
              <List.Item><b>Description:</b> &nbsp; {this.props.product.description}</List.Item>
            </List>
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
