import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Image, Divider, Label, List, Icon, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';

/** Renders a single product item in the form of a card. See pages/ListItems.jsx. */

class ProductShop extends React.Component {
  render() {
    return (
      <Card centered>
        <Card.Content>
          <Image className='cardImage' src={this.props.product.image} wrapped ui={true} rounded/>
          <Divider/>
          <Label color='black' basic ribbon>{this.props.product.category}</Label>
          <Card.Header className='cardSpace'>{this.props.product.title} <Label size='mini' color='green' tag>${this.props.product.cost}</Label>
          </Card.Header>
          <Card.Description textAlign='center'>
            <Divider/>
            <Button compact as={Link} to={`/productpage/${this.props.product._id}`} color='teal' basic>
              <Button.Content><Icon name='mail'/>Contact {this.props.product.email}</Button.Content>
            </Button>
            <Divider/>
          </Card.Description>
          <Card.Description>
            <List>
              <List.Item><b>Condition:</b> &nbsp; {this.props.product.condition}</List.Item>
              <List.Item><b>Description:</b> &nbsp; {this.props.product.description}</List.Item>
            </List>
          </Card.Description>
        </Card.Content>
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          <Card.Content extra>
            <a>
              <Button inverted color='red' icon onClick={() => this.removeItem(this.props.product._id)} size='small' circular>
                <Icon name = "trash"/>
              </Button>
              <Button inverted compact color='blue' as={Link} to={`/edit/${this.props.product._id}`}><Icon name='pencil'/>Edit</Button>
            </a>
          </Card.Content>) : ''}
      </Card>
    );
  }
}

// Require a document to be passed to this component.
ProductShop.propTypes = {
  product: PropTypes.object.isRequired,
  Products: PropTypes.object.isRequired,
};
// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ProductShop);
