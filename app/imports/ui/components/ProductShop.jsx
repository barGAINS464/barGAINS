import React from 'react';
import { Card, Image, Divider, Label, List, Icon, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import UserModal from '../pages/UserModal';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
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
          <Card.Description>
            <List>
              <List.Item>
                <UserModal/><Label pointing='left' size='tiny' basic>{this.props.product.email} </Label>
              </List.Item>
              <List.Item><b>Condition:</b> &nbsp; {this.props.product.condition}</List.Item>
              <List.Item><b>Description:</b> &nbsp; {this.props.product.description}</List.Item>
            </List>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button basic>
            <Icon name='heart' />Add to Wish List</Button>
        </Card.Content>
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
